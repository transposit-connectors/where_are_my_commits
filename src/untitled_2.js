(params) => {
  api.log(api.user());
  
  var urlArr = params.responseUrl.split("/");
  var parts = urlArr.slice(urlArr.length - 3);
  
  api.log(parts);
  
  var username = user_setting.get("github_username");
  api.log(username);
  if (!username) {
    var message = "Please provide your github username in the user settings!";
    var body = {text: message};
    return api.run("slack_webhook.send_slash_command_response", {first: parts[0], second: parts[1], third: parts[2], $body: body})
    
  }
  
  // Get commits and find commit map
  var allMessages = "";
  var commitMap = api.run("this.GetRecentCommitMap")[0];
  api.log(commitMap);
  Object.keys(commitMap).forEach(sha => {
    var commit = commitMap[sha];
    api.log(commit);
  
    if (commit.author && commit.author.login == username) {
      var newMessage = api.run("this.MakeSlackMessage", {sha: sha, commitMap: commitMap})[0];
      allMessages += newMessage;
      allMessages += "\n";
    }
  })
  
  var body = {text: allMessages};
  
  
  return api.run("slack_webhook.send_slash_command_response", {first: parts[0], second: parts[1], third: parts[2], $body: body})
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */