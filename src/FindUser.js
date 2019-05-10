(params) => {
  var username = params.slackUsername;
  
  var foundUserSettings;
  api.listUsers().forEach(user => {
    var settings = api.run("this.get_user_settings_for_user", {}, {asUser: user.email})[0];
    api.log(settings);
  	if (settings.slack_username === username) {
      foundUserSettings = settings;
    }
  });
  
  return foundUserSettings;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */