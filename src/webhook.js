({http_event}) => {
  api.log(http_event);
  
  var sha;
  var responseUrl;
  var shaArray = http_event.body.split("&");
  shaArray.forEach((entry) => {
    if (entry.startsWith("text=")) {
      sha = entry.substring(5);
    } else if (entry.startsWith("response_url=")) {
      responseUrl = entry.substring("response_url=".length);
    }
  });
  api.log(sha);
  api.runAsync("this.HandleSlackResponse", {sha: sha, responseUrl : responseUrl});
  
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info for " + sha + "..."}
  };

}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */