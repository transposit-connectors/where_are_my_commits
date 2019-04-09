(params) => {
  var commitEnv;
   try {
      api.run("this.get_commit", {sha: params.sha});
      commitEnv = "PROD";
    
    } catch (err) {
      commitEnv = "NONE";
    }
  
  return commitEnv;
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */