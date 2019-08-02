(params) => {
  var rule = api.run("aws_cloudwatch_events.list_rules", {$body: {NamePrefix: "deploy-daily"}})[0].Rules[0];
  return rule.State === "ENABLED";
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */