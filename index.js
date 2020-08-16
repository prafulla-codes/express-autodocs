const core = require("@actions/core");
const github = require("@actions/github");
try {
  // `who-to-greet` input defined in action metadata file
  console.log(core.get);
  const fileToScan = core.getInput("server-filename");
  fetch(
    `${github.context.payload.repository.html_url}/blob/master/${fileToScan}`
  ).then((data) => {
    console.log(data);
  });
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
