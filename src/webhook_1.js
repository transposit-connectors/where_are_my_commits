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

  var stageToNumberMap = api.run("this.stageNumberMap")[0];
  return getMessage();

  function getMessage () {
    var message = "";
    if (commit.env == "NONE") {
      return "This is not a commit.";
    } else if (commit.env === "DEV") {
      return "Is this commit a development commit? Please use a commit that was merged into master.";
    } else if (commit.env === "PROD") {
      return `This commit (${commit.message}) is on prod!`;
    }

    var stageNumber = stageToNumberMap[commit.env];

    var containsDynamicConfig = false;
    commit.commit.files.forEach((file) => {
      if (file.filename.includes("dynamic_configuration.yml")) {
        containsDynamicConfig = true;
      }
    });

    if (containsDynamicConfig && commit.commit.files.length == 1) {
      var ending1 = stageNumber < 1 ? "and it will be in prod shortly." :  "and that already been deployed.";
      return `This commit (${commit.message}) only contained a dynamic configuration change ${ending1}`;
    }

    if (stageNumber < 1) { // master
      message += "This commit just got merged into master.\nIt will be on Demo soon\n";
    } else {
      message += `This commit (${commit.message}) is on ${commit.env}.\n`;
    }

    if (stageNumber < 2) { // on demo
      var toStaging = now.clone().startOf('day').add(deployHour, 'hours').add(1, 'days').calendar();
      message += `It will be on *Staging* ${toStaging}\n`;
    }

    if (!prodDeployEnabled) {
      message += `Prod deploy is *disabled*, so it's unclear when it will make it to prod.`;
    } else {
      message += "It will be on *Prod* ";
      if (["Thursday", "Friday", "Saturday", "Sunday"].includes(now.clone().format("dddd"))) {
        var tuesday = now.clone().startOf('day').add(deployHour, 'hours').day(2).calendar();
        message += tuesday;

      } else {
        var daysToAdd = commit.env !== "STAGING" ? 2 : 1;
        var toProd = now.clone().startOf('day').add(deployHour, 'hours').add(daysToAdd, 'days').calendar();
        message += toProd;
      }
      message += " (prod deployment is enabled)\n";
    }

    if (containsDynamicConfig) {
      var ending2 = stageNumber < 1 ? "will be deployed shortly" : "have already been deployed";
      message += `The dynamic configuration changes in this commit ${ending2}`
    }

    api.log(message);
    return message;
  }
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */