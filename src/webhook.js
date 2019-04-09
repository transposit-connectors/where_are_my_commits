({http_event}) => {
  api.runForAllUsers("this.MakeSlackMessage", {http_event: http_event});
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