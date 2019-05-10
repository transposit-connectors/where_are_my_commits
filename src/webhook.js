({http_event}) => {
  var qs = require('qs.js');
  
  api.log(http_event);
  api.log(api.listUsers());
  
    
  var parsedBody = qs.parse(http_event.body);
  api.log(parsedBody);
  var responseUrl = parsedBody.response_url;
  var email = parsedBody.text;
  var slackUser = parsedBody.user_name;
  
  var foundUserEmail;
  var users = api.listUsers();

  users.forEach((user) => {
    if (user.email == parsedBody.text) {
      foundUserEmail = user.email;
    }
  });
  
  if (!foundUserEmail) {
      return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Please set up this app! " + "https://where-are-my-commits-ns2jm.demo-transposit.com"}
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