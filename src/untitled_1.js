(params) => {
  var commits = api.run("this.GetCommitMap")[0];
  var demoIndex = commits[params.demoCommit].transposit_index;
  var stagingIndex = commits[params.stagingCommit].transposit_index;
  var prodIndex = commits[params.prodCommit].transposit_index;
  
  var thisCommitIndex = commits[params.sha].transposit_index;
  
  if (thisCommitIndex < demoIndex) {
    api.log("not on. demo yet");
  } else if (thisCommitIndex < stagingIndex) {
    api.log("demo");
  } else if (thisCommitIndex < prod) {
    api.log("staging");
  }
  
  
  
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */