const exec = require("@actions/exec");
const generateMarkdowndocs = require("./markdown/generateMarkdownDocs");

function createDocs(apis, outputFormat, outputBranch) {
  exec.exec(`git stash`);
  exec.exec(`git checkout -B ${outputBranch}`);
  switch (outputFormat) {
    case "markdown":
      generateMarkdowndocs(apis);
      break;
    default:
      console.log("\x1b[1m", "\x1b[31m", `❌ Invalid Output Format`, "\x1b[0m");
      return;
  }
}

module.exports = createDocs;
