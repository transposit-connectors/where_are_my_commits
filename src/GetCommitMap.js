(params) => {
  var commits = api.run("raw_github.repos_owner_repo_commits_get", {repo: "transposit", owner: "transposit", "per_page": 100});
  
  var results = {};
  commits.forEach(commit => {
    results[commit.sha] = commit;
  });
  
  return results;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */