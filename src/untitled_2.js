(params) => {
  api.log(api.user());

  var username = user_setting.get("github_username");
  api.log(username);
  if (!username) {
    var message = "Please provide your github username in the user settings!";
    var body = {text: message};
    return api.run("slack.post_to_response_url", {response_url: params.response_url, body: body});
    
  }
  
  // Get commits and find commit map
  var allMessages = "";
  var commitMap = api.run("this.GetRecentCommitMap")[0];
  Object.keys(commitMap).forEach(sha => {
    var commit = commitMap[sha];
  
    if (commit.author && commit.author.login == username) {
      api.log(commit);
      var newMessage = api.run("this.MakeSlackMessage", {sha: sha, commitMap: commitMap})[0];
      allMessages += newMessage;
      allMessages += "\n";
      allMessages += "--------------------------------------------"
    }
  })
  
  var body = {text: allMessages};
  
  return api.run("slack.post_to_response_url", {response_url: params.response_url, body: body});
}