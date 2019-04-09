({http_event}) => {
  api.runForAllUsers("this.MakeSlackMessage", {http_event: http_event});
  console.log(http_event);
  var sha;
  var shaArray = http_event.body.split("&");
  shaArray.forEach((entry) => {
    if (entry.startsWith("text=")) {
      sha = entry.substring(5);
    }
  });
  api.log(sha);
  return {
    status_code: 200,
    headers: {"Content-Type": "application/json"},
    body: {text: "Getting deployment info..."}
  };

}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */