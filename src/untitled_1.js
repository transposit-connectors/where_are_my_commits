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
      api.run("this.get_commit", {sha: params.sha});
      commitEnv = "PROD";
    
    } catch (err) {
      commitEnv = "NONE";
    }
  } else {
    var thisCommitIndex = thisCommit.transposit_index;

    if (thisCommitIndex < demoIndex) {
      commitEnv = "MASTER";
    } else if (thisCommitIndex < stagingIndex) {
      commitEnv = "DEMO";
    } else if (thisCommitIndex < prodIndex) {
      commitEnv = "STAGING";
    } else {
      commitEnv = "PROD";
    }
  }
  
  if (thisCommit) {
    // Replace the commit with all the details so we can get its files
    thisCommit = api.run("this.get_commit", {sha: params.sha});
  }
  
  return {
    env: commitEnv,
    commit: thisCommit,
    message: thisCommit ? thisCommit.commit.message : ""
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */