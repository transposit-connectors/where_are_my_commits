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
  
  var fun = user_setting.get("fun_messages");
  
  var lineBreak = "\n--------------------------------------------\n";
  
  // Get commits and find commit map
  var allMessages = lineBreak;
  var commitMap = api.run("this.GetRecentCommitMap")[0];
  var numCommits = 0;
  Object.keys(commitMap).forEach(sha => {
    var commit = commitMap[sha];
  
    if (commit.author && commit.author.login == github) {
      numCommits += 1;
      api.log(commit);
      var newMessage = api.run("this.MakeSlackMessage", {sha: sha, commitMap: commitMap})[0];
      allMessages += newMessage;
      allMessages += lineBreak;
    }
  });
  
  var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
  if (prodDeployEnabled) {
  var emoji = fun ? ":sunny:" : ""
      allMessages += `\n ${emoji}prod deployment is enabled${emoji} \n`;
  }
  
  var body = {text: allMessages};
  
  return api.run("slack_webhook.post_to_response_url", {response_url: params.response_url, post_body: body});
}