(params) => {
  var github = user_setting.get("github_username");
  if (!github) {
    github = api.run("github.get_user_authenticated")[0].login;
    user_setting.put("github_username", github);
  }
  
  var slack = user_setting.get("slack_username");
  if (!slack) {
    slack = api.run("slack.get_users_profile")[0].profile.display_name;
    user_setting.put("slack_username", slack);
  }
  
  return {github_username: github,
         slack_username: slack};
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */