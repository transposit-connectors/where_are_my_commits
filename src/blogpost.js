(params) => {
  var body = params.untitled1;
  body.channel = "CK4K2AK4N";
  // body.text = "Getting commits for <@jplace>. One moment please..."
  api.run("slack.post_chat_message", {$body: body})
  return {
    mission: "complete"
  };
}

/*fo/
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */