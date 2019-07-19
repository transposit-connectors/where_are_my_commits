(params) => {
  api.log(api.user());

  var github = user_setting.get("github_username");
  if (!github) {
    if (api.isAuthed("github")) {
      github = api.run("github.get_user_authenticated")[0].login;
      user_setting.put("github_username", github);
    }
  }

  if (!github) {
    var message = "Please authenticate with Github! https://where-are-my-commits-59556.staging-transposit.com/login";
    var body = {text: message};
    return api.run("slack_webhook.post_to_response_url", {response_url: params.response_url, post_body: body});
    
  }
  
  // Get commits and find commit map
  var allMessages = "";
  var commitMap = api.run("this.GetRecentCommitMap")[0];
  Object.keys(commitMap).forEach(sha => {
    var commit = commitMap[sha];
  
    if (commit.author && commit.author.login == github) {
      api.log(commit);
      var newMessage = api.run("this.MakeSlackMessage", {sha: sha, commitMap: commitMap})[0];
      allMessages += newMessage;
      allMessages += "\n";
      allMessages += "--------------------------------------------"
    }
  })
  
  var body = {text: allMessages};
  
  return api.run("slack_webhook.post_to_response_url", {response_url: params.response_url, post_body: body});
}