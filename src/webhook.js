({http_event}) => {
  var qs = require('qs.js');
  
  api.log(http_event);
  api.log(api.listUsers());
  
    
  var parsedBody = qs.parse(http_event.body);
  api.log(parsedBody);
  var responseUrl = parsedBody.response_url;
  var email = parsedBody.email;
  var slackUser = parsedBody.user;
  
  
  // var sha;
  var responseUrl;
  var shaArray = http_event.body.split("&");
  shaArray.forEach((entry) => {
  	if (entry.startsWith("response_url=")) {
      responseUrl = entry.substring("response_url=".length);
    }
  });
  // api.log(sha);
  api.runAsync("this.HandleSlackResponse", {responseUrl : responseUrl});
  

  
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info for you. One moment please..."}
  };

}