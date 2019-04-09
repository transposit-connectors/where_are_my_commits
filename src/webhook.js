({ http_event }) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment().tz("America/Los_Angeles");
  var deployHour = now.toString().indexOf("-0700") > -1 ? 5 : 4;
  var dayOfWeek = now.format("dddd");
  
  console.log(http_event);
  var sha;
  var shaArray = http_event.body.split("&");
   shaArray.forEach((entry) => {
    if (entry.startsWith("text=")) {
      sha = entry.substring(5);
    }
  });
  api.log(sha);
  
  var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
  var deployedCommits = api.run("this.GetDeployedCommits");
  var commit = api.run("this.FindCommit", {demoCommit: deployedCommits[0], 
                                                stagingCommit: deployedCommits[1], 
                                                prodCommit: deployedCommits[2], 
                                                sha: sha});
  
  api.log("RESULTS");
  api.log(commit);
  api.log(commit["commit"]);
  
  var message = "";
  if (commit.env === "NONE") {
    message = "This is not a commit.";
  } else if (commit.env === "PROD") {
    message = `This commit (${commit.commit.commit.message}) is on prod!`;
  } else {
    api.log(commit.commit);
    message += `This commit (${commit.commit.commit.message}) is on ${commit.env}.\n"`;
    if (commit.env === "DEMO") {
      var toStaging = moment().startOf('day').add(deployHour, 'hours').add(1, 'days').calendar();
      message += `It is expected to make it onto *Staging* ${toStaging}\n`;      
    }
    
    // Prod regardless
    if (!prodDeployEnabled) {
      message += `Prod deploy is *disabled*, so it's unclear when it will make it to prod.`;  
    } else {
      if (["Friday", "Saturday", "Sunday"].includes(moment.dddd)) {
        message += `It will be on Prod on Tuesday`
      } else {
      	var daysToAdd = commit.env === "DEMO" ? 2 : 1;
        var toProd = moment().startOf('day').add(deployHour, 'hours').add(daysToAdd, 'days').calendar();
        message += `It will be on Prod ${toProd}`;
      }
      
    }
    
  }
  
  // get the head of prod
  // get the head of staging -> see if the commit is in between those and if it is then it's on prod
  // get the head of demo
  // if not 
                    
                
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: {text: message}
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */