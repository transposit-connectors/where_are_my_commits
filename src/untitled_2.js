(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment().tz("America/Los_Angeles");
  api.log(now.toString());
  api.log(now._d.toString());

  var deployTime = now.toString().indexOf("-0700") > -1 ? "5AM" : "4AM";
  return deployTime;
  
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */