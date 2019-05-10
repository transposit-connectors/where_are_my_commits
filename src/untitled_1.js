(params) => {
  var moment = require('moment-timezone-with-data.js');
  var commits = params.commitMap;
  var demoIndex = commits[params.demoCommit].transposit_index;
  var stagingIndex = commits[params.stagingCommit].transposit_index;
  var prodIndex = commits[params.prodCommit].transposit_index;
  
  var commitEnv = "";
  var commit;
  
  var thisCommit= commits[params.sha];
  if (!thisCommit) {
    try {
      thisCommit = api.run("this.get_commit", {sha: params.sha})[0];
      var commitDate = moment(thisCommit.commit.committer.date).tz("America/Los_Angeles");
      // If we couldn't find the commit and its fairly new, guess that it's still in dev
      if (commitDate.isAfter(moment().subtract(5, 'days'))) {
      	commitEnv = "DEV";    
      } else {
      	commitEnv = "PROD";
      }
    
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
  
  if (thisCommit && !thisCommit.commit.files) {
    // Replace the commit with all the details so we can get its files
    thisCommit = api.run("this.get_commit", {sha: params.sha})[0];
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