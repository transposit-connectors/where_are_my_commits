(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment().tz("America/Los_Angeles");
  var deployHour = now.toString().indexOf("-0700") > -1 ? 5 : 4;
  var dayOfWeek = now.format("dddd");

  var sha = params.sha;

  var prodDeployEnabled = api.run("this.prodDeployEnabled")[0];
  var deployedCommits = api.run("this.GetDeployedCommits");
  
  var fun = user_setting.get("fun_messages");
  
  
  var commit = api.run("this.FindCommit", {
    demoCommit: deployedCommits[0],
    stagingCommit: deployedCommits[1],
    prodCommit: deployedCommits[2],
    commitMap: params.commitMap,
    sha: params.sha
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
      return `${commit.message} is on Prod!` + (fun ? ":iggy-party:" : "");
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
      return `${commit.message} only contained a dynamic configuration change ${ending1}`;
    }

    if (stageNumber < 1) { // master
      message += `${commit.message} just got merged into master.\nIt will be on Demo soon\n`;
    } else {
      var emoji = "";
      if (fun) {
      	if (commit.env =="DEMO") {
          emoji = ":iggy-cactus:";
        } else {
          emoji = ":iggy-run:"
        }
      }
      message += `${commit.message} is on ${commit.env.charAt(0).toUpperCase() + commit.env.substr(1).toLowerCase()}${emoji}.\n`;
    }

    if (stageNumber < 2) { // on demo
      var toStaging = now.clone().startOf('day').add(deployHour, 'hours').add(1, 'days').calendar();
      message += `It will be on *Staging* ${toStaging}\n`;
    }

    if (!prodDeployEnabled) {
      var emoji = fun ? ":iggy-ghastly:" : "";
      message += `Prod deploy is *disabled* ${emoji}, so it's unclear when this will be on prod.`;
    } else {
      message += "It will be on *Prod* ";
      var dayOfWeek = now.clone().format("dddd");
      if (["Thursday", "Friday", "Saturday", "Sunday"].includes(dayOfWeek)) {
        var days = dayOfWeek == "Sunday" ? 2 : 9;
        var tuesday = now.clone().startOf('day').add(deployHour, 'hours').day(days).calendar();
        message += tuesday;

      } else {
        var daysToAdd = commit.env !== "STAGING" ? 2 : 1;
        var toProd = now.clone().startOf('day').add(deployHour, 'hours').add(daysToAdd, 'days').calendar();
        message += toProd;
      }
    }

    if (containsDynamicConfig) {
      var ending2 = stageNumber < 1 ? "will be deployed shortly" : "have already been deployed";
      message += `\nThe dynamic configuration changes in this commit ${ending2}`
    }

    api.log(message);
    return message;
  }
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */