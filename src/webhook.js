({http_event}) => {
  
  api.log(http_event);
  
    
  var parsedBody = http_event.parsed_body;
  var responseUrl = parsedBody.response_url;
  var email = parsedBody.text;
  var slackUser = parsedBody.user_name;


  var foundUserEmail = api.user({type: "slack", userId: parsedBody.user_id, workspaceId: parsedBody.team_id}).email;

  api.log("found user email");
  api.log(foundUserEmail);
  
  if (!foundUserEmail) {
      return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Please set up this app! " + "https://where-are-my-commits-59556.staging-transposit.com/login"}
  };
  }
  
  // api.log(sha);
  setImmediate(() => {
  	api.run("this.HandleSlackResponse", {responseUrl : responseUrl}, {asUser: foundUserEmail});  
  });
  
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info for you. One moment please..."}
  };

}