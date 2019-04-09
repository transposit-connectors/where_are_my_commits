(params) => {
  var commits = api.run("this.GetCommitMap")[0];
  var demoIndex = commits[params.demoCommit].transposit_index;
  var stagingIndex = commits[params.stagingCommit].transposit_index;
  var prodIndex = commits[params.prodCommit].transposit_index;
  
  var commitEnv = "";
  var commit;
  
  var thisCommit= commits[params.sha];
  if (!thisCommit) {
    try {
      api.run("this.get_commit");
      commitEnv = "PROD";
    
    } catch (err) {
      commitEnv = "NONE";
    }
  } else {
    commit = thisCommit;
    var thisCommitIndex = thisCommit.transposit_index;

    if (thisCommitIndex < demoIndex) {
      commitEnv = "NOT_YET";
    } else if (thisCommitIndex < stagingIndex) {
      commitEnv = "DEMO";
    } else if (thisCommitIndex < prodIndex) {
      commitEnv = "STAGING";
    } else {
      commitEnv = "PROD";
    }
  }
  
  return {
    env: commitEnv,
    commit: commit;
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */