(params) => {
  var rules = api.run("aws_basic.post", {"X-Amz-Target": 'AWSEvents.ListRules', 
                            "Content-Type":'application/x-amz-json-1.1',
                            "$body": '{}'})[0].Rules;
  
  var prodDeployEnabled;
  rules.forEach((rule) => {
    if (rule.Name === "deploy-daily") {
    	prodDeployEnabled = rule.State === "ENABLED";
    }
  })
  return prodDeployEnabled;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */