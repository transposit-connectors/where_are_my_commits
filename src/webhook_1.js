(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment().tz("America/Los_Angeles");
  var deployHour = now.toString().indexOf("-0700") > -1 ? 5 : 4;
  var dayOfWeek = now.format("dddd");

  var sha = params.sha.trim();

  var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
  var deployedCommits = api.run("this.GetDeployedCommits");
  var commit = api.run("this.FindCommit", {
    demoCommit: deployedCommits[0],
    stagingCommit: deployedCommits[1],
    prodCommit: deployedCommits[2],
    sha: sha
  })[0];

  api.log(commit);

  var message = "";
  if (commit.env == "NONE") {
    message = "This is not a commit.";
  } else if (commit.env === "PROD") {
    message = `This commit (${commit.message}) is on prod!`;
  } else {

    message += `This commit (${commit.message}) is on ${commit.env}.\n`;
    if (commit.env === "DEMO") {
      var toStaging = now.clone().startOf('day').add(deployHour, 'hours').add(1, 'days').calendar();
      message += `It will be on *Staging* ${toStaging}\n`;
    }

    // Prod regardless
    if (!prodDeployEnabled) {
      message += `Prod deploy is *disabled*, so it's unclear when it will make it to prod.`;
    } else {
      message += "It will be on *Prod* ";
      if (["Friday", "Saturday", "Sunday"].includes(now.clone().format("dddd"))) {
        var tuesday = now.clone().startOf('day').add(deployHour, 'hours').day(2).calendar();  
        message += tuesday;
        
      } else {
        var daysToAdd = commit.env === "DEMO" ? 2 : 1;
        var toProd = now.clone().startOf('day').add(deployHour, 'hours').add(daysToAdd, 'days').calendar();
        message += toProd;
      }
      message += " (prod deployment is enabled)";
    }
  }

  api.log(message);
  return message;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */