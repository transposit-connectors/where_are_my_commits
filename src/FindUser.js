(params) => {
  var username = params.slackUsername;
  
  var foundUserEmail;
  api.listUsers().forEach(user => {
    var settings = api.run("this.get_user_settings_for_user", {}, {asUser: user.email})[0];
    api.log(settings);
  	if (settings.slack_username && settings.slack_username === username) {
      foundUserEmail = user.email;
    }
  });
  
  return foundUserEmail;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */