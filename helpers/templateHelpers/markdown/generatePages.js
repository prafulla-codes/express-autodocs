const getBaseAPIContent = require("./getBaseAPIContent");
const createIndex = require("./createIndex");
const fs = require("fs");
function generatePages(apis) {
  let output_path =
    process.env.NODE_ENV == "production"
      ? `${process.cwd()}/docs/pages`
      : `${process.cwd()}/test/output/pages`;
  if (!fs.existsSync(output_path)) fs.mkdirSync(output_path); // Create Pages Folder If Does Not Exists
  for (let api of apis) {
    if (api.isRoute) {
      let output_file = `${output_path}/${api.routeName
        .substring(1)
        .replace("/", "-")}.md`;
      let index = createIndex(api.apis);
      let pageBody = getBaseAPIContent(api.apis);
      let fd = fs.openSync(output_file, "w");
      fs.writeFileSync(
        output_file,
        `
      ${index}
      ${pageBody}
      `
      );
      fs.closeSync(fd);
    }
  }
}
module.exports = generatePages;
