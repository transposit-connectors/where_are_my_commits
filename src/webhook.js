({http_event}) => {
  
  api.log(http_event);
  
    
  var parsedBody = http_event.parsed_body;
  var responseUrl = parsedBody.response_url;
  var email = parsedBody.text;
  var slackUser = parsedBody.user_name;


  var foundUser = api.user({type: "slack", userId: "foo", workspaceId: parsedBody.team_id});
  api.log(foundUser);
  return;
  var foundUserEmail = api.run("this.FindUser", {slackUsername: slackUser})[0];
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
  api.runAsync("this.HandleSlackResponse", {responseUrl : responseUrl}, {asUser: foundUserEmail});
  

  
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info for you. One moment please..."}
  };

}