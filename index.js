const core = require("@actions/core");
const ExpressAutodocs = require("./ExpressAutodocs");

// If in production environment
if (process.env.NODE_ENV == "production") {
  const filePath = core.getInput();
  ExpressAutodocs.generateDocs();
} else {
  ExpressAutodocs.generateDocs("test/server.js", "app");
}
