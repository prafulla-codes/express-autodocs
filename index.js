const core = require("@actions/core");
const ExpressAutodocs = require("./ExpressAutodocs");
process.env.NODE_ENV = process.env.NODE_ENV || "production";
if (process.env.NODE_ENV == "production") {
  const filePath = core.getInput("server-filepath");
  const appName = core.getInput("appName");
  const routerName = core.getInput("routerName");
  const outputFormat = core.getInput("outputFormat");
  const outputBranch = core.getInput("outputBranch");
  const token = process.env.GITHUB_TOKEN;
  console.log("GIthub Token is " + token);
  ExpressAutodocs.generateDocs(
    filePath,
    appName,
    routerName,
    outputFormat,
    outputBranch,
    token
  );
} else {
  ExpressAutodocs.generateDocs(
    "test/server.js",
    "app",
    "router",
    "markdown",
    "express-autodocs"
  );
}
