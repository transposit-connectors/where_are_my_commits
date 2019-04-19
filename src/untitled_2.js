(params) => {
  var message = api.run("this.MakeSlackMessage", {sha: params.sha});
  var body = {text: message};
  
  // Not url-decoding out of laziness
  var urlArr = params.responseUrl.split("%2F");
  var parts = urlArr.slice(urlArr.length - 3);
  return parts;
  
  api.run("slack_webhook.send_slash_command_response", {first: parts[0], second: parts[1], third: parts[2], $body: body})

  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */