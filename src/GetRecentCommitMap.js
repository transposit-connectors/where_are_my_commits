(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();
  var fiveDaysAgo = now.subtract(7, "days");
  api.log(fiveDaysAgo);
  
  var commits = api.run("github.list_commits", {owner: "transposit", repo: "transposit", since: fiveDaysAgo});
    var results = {};
  commits.forEach((commit, index) => {
    commit.transposit_index = index; // to tell where it is
    results[commit.sha] = commit;
  });
  
  return results;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */