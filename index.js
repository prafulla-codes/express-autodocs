const core = require("@actions/core");
const ExpressAutodocs = require("./ExpressAutodocs");
const environment = process.env.NODE_ENV || "production";
if (environment == "production") {
  const filePath = core.getInput("server-filepath");
  const appName = core.getInput("appname");
  ExpressAutodocs.generateDocs(filePath, appName);
} else {
  ExpressAutodocs.generateDocs("test/server.js", "app");
}
