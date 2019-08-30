(params) => {

  var sha = params.sha;

  var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
  var deployedCommits = api.run("this.GetDeployedCommits");
  
  var fun = user_setting.get("fun_messages");
  
  
  var commit = api.run("this.FindCommit", {
    demoCommit: deployedCommits[0],
    stagingCommit: deployedCommits[1],
    prodCommit: deployedCommits[2],
    commitMap: params.commitMap,
    sha: params.sha
  })[0];


  var stageToNumberMap = api.run("this.stageNumberMap")[0];
  return getMessage();

  function getMessage () {
	// Put your deployment logic here!
    return `Your commit is on environment: ... ${fun ? ":sunny:" : ""}`;
  }
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */