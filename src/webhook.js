({ http_event }) => {
  console.log(http_event);
  var sha;
  var shaArray = http_event.body.split("&");
   shaArray.forEach((entry) => {
    if (entry.startsWith("text=")) {
      sha = entry.substring(5);
    }
  });
  api.log(sha);
                    
                
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: {"message": "foobarbaz"}
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */