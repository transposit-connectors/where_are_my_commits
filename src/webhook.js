({ http_event }) => {
  console.log(http_event);
  var sha;
  var shaArray = http_event.body.split("&");
   shaArray.forEach((entry) => {
    if (entry.startsWith("text=")) {
      sha = entry.substring(5);
    }
  });
  api.log(sha);
  
  var deployedCommits = api.run("this.getDeployedCommits");
  var foundCommit = api.run("this.findCommit", {demoCommit: deployedCommits[0], 
                                                stagingCommit: deployedCommits[1], 
                                                prodCommit: deployedCommits[2], 
                                                sha: sha});
  
  // get the head of prod
  // get the head of staging -> see if the commit is in between those and if it is then it's on prod
  // get the head of demo
  // if not 
                    
                
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: {"message": "foobarbaz"}
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */