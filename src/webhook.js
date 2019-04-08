({ http_event }) => {
  console.log(http_event);
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: { "greeting": "Hello World" }
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/building/webhooks
 */