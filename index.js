const core = require("@actions/core");
const ExpressAutodocs = require("./ExpressAutodocs");

process.env.NODE_ENV = "production";
// If in production environment
if (process.env.NODE_ENV == "production") {
  const filePath = core.getInput("server-filepath");
  const appName = core.getInput("appname");
  ExpressAutodocs.generateDocs(filePath, appName);
} else {
  ExpressAutodocs.generateDocs("test/server.js", "app");
}
