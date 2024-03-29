({http_event}) => {
  setImmediate(() => {
    var parsedBody = http_event.parsed_body;
    var response_url = parsedBody.response_url;
    var email = parsedBody.text;
    var slackUser = parsedBody.user_name;
    var runningAsSomeoneElse = false;

    var userId = parsedBody.user_id;
    if (parsedBody.text && parsedBody.text.startsWith("<@")) {
      runningAsSomeoneElse = true;
      userId = parsedBody.text.split("|")[0].substring(2);
    }

    var foundUser = api.user({type: "slack", userId: userId, workspaceId: parsedBody.team_id});

    if (!foundUser) {
      var text = runningAsSomeoneElse ? `Sorry, <@${userId}> hasn't set up this app. You can ping them to add their credentials here: ${env.getBuiltin().appUrl}`
      : "Please set up this app! " + env.getBuiltin().appUrl;
      
      api.run("slack_webhook.post_to_response_url", {response_url: response_url, post_body: {text: text}});
    }
  	api.run("this.HandleSlackResponse", {response_url : response_url}, {asUser: foundUser.id});  
  });
  
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info for you. One moment please..."}
  };

}