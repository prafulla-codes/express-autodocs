const core = require("@actions/core");
const ExpressAutodocs = require("./ExpressAutodocs");
const environment = process.env.NODE_ENV || "production";
if (environment == "production") {
  const filePath = core.getInput("server-filepath");
  const appName = core.getInput("appName");
  const routerName = core.getInput("routerName");
  const outputFormat = core.getInput("outputFormat");
  const outputBranch = core.getInput("outputBranch");

  ExpressAutodocs.generateDocs(
    filePath,
    appName,
    routerName,
    outputFormat,
    outputBranch
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
