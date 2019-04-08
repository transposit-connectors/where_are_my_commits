(params) => {
    var shaArray = params.body.split("&");
  api.log(shaArray);
  shaArray.forEach((entry) => {
    if (entry.startsWith("text=")) {
      sha = entry.substring(5);
    }
  }
  
  return [
    {
      language: "english",
      message: "Hello, world"
    },
    {
      language: "spanish",
      message: "Hola, mundo"
    }
  ];
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */