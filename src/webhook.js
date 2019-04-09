({ http_event }) => {
  console.log(http_event);
//   var sha;
//   var shaArray = http_event.body.split("&");
//    shaArray.forEach((entry) => {
//     if (entry.startsWith("text=")) {
//       sha = entry.substring(5);
//     }
//   });
//   api.log(sha);
  
//   var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
//   var deployedCommits = api.run("this.GetDeployedCommits");
//   var commitAndEnv = api.run("this.FindCommit", {demoCommit: deployedCommits[0], 
//                                                 stagingCommit: deployedCommits[1], 
//                                                 prodCommit: deployedCommits[2], 
//                                                 sha: sha});
  
//   var message = `This commit is on ${commitAndEnv.commitEnv}. Prod deploy is ${prodDeployEnabled}`;
  
  // get the head of prod
  // get the head of staging -> see if the commit is in between those and if it is then it's on prod
  // get the head of demo
  // if not 
                    
                
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: {text: "*hello*"}
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */