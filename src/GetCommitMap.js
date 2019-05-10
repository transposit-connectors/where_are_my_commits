(params) => {
  var commits = api.run("this.list_commits"});
  var results = {};
  commits.forEach((commit, index) => {
    commit.transposit_index = index;
    results[commit.sha] = commit;
  });
  
  return results;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */