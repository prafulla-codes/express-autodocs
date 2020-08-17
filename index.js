const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
try {
  // Get Backend Filename
  const fileToScan = core.getInput("server-filename");
  // Get App Name
  const appName = core.getInput("appname");
  // * Step 1 - Reads Backend Server File
  fs.readFile(fileToScan, (err, data) => {
    if (err) throw err; // Throws error if unable to read backend file
    backendFile = data.toString("utf-8");
    let methodsRegexText = `${appName}\.(get|post|delete|patch|put).*`;
    let methodsRegex = new RegExp(methodsRegexText, "g");
    const scanMatches = backendFile.match(methodsRegex);
    console.log(scanMatches);
  });
  const time = new Date().toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}
