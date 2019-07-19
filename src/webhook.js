({http_event}) => {
  
  api.log(http_event);
  
    
  var parsedBody = http_event.parsed_body;
  var response_url = parsedBody.response_url;
  var email = parsedBody.text;
  var slackUser = parsedBody.user_name;


  var foundUser = api.user({type: "slack", userId: parsedBody.user_id, workspaceId: parsedBody.team_id});

  api.log(foundUser);
  
  if (!foundUser) {
      return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Please set up this app! " + "https://where-are-my-commits-59556.staging-transposit.com/login"}
  };
  }
  
  // api.log(sha);
  setImmediate(() => {
  	api.run("this.HandleSlackResponse", {response_url : response_url}, {asUser: foundUser.id});  
  });
  
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info for you. One moment please..."}
  };

}