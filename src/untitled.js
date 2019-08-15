(params) => {
  var deployOperations = [];
  var operations = [];
  
  var clusters = ["stage-cluster", "staging-cluster", "prod-cluster"];
  var envs = ["stage", "staging", "prod"];
  envs.forEach((env) => {
    var operationName = `aws_ecs_${env}.describe_services`;
    var parameters = {$body: {services: ["web"], cluster: `${env}-cluster`}};
    deployOperations.push({operation: operationName, parameters: parameters});
  });
  
  var deployResults = api.runBulk(deployOperations);
  var shas = [];
  
  var searchString = "ci_deploy-";
  
  deployResults.forEach((res) => {
    var taskDef = res[0].services[0].taskDefinition;
    var sha = taskDef.substring(taskDef.indexOf(searchString) + searchString.length, taskDef.length -2);
    shas.push(sha);
  });
  
  return shas;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */