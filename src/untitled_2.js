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
  
    // For some commits the author is null (and we only have their email)
    // I am choosing to not handle that case right now.
    if (commit.author && commit.author.login == username) {
      numCommits += 1;
      api.log(commit);
      var newMessage = api.run("this.MakeSlackMessage", {sha: sha, commitMap: commitMap})[0];
      allMessages += newMessage;
      allMessages += lineBreak;
    }
  });
  
  if (numCommits == 0) {
    var commits = api.run("github.list_commits", {owner: "transposit", repo: "transposit", author: username}, {limit: 5});
    var emoji = fun ? ":iggy-party:" : ""
	allMessages += "Your last 5 commits are:" + lineBreak;
    commits.forEach(commit => {
      allMessages += `${commit.commit.message}${lineBreak}`;
    });
    allMessages += `And they're all on Prod!${emoji}`
  }
  
  var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
  if (prodDeployEnabled) {
  var emoji = fun ? ":sunny:" : ""
      allMessages += `\n ${emoji}prod deployment is enabled${emoji} \n`;
  }
  
  var body = {text: allMessages};
  
  return api.run("slack_webhook.post_to_response_url", {response_url: params.response_url, post_body: body});
}