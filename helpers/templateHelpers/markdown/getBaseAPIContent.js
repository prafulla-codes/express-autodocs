const getAPIContent = require("./getAPIContent");

function getBaseAPIContent(apis) {
  let baseAPIContent = `\n## APIs\n---`;
  for (let api of apis) {
    if (!api.isRoute) {
      let apiContent = getAPIContent(api);
      baseAPIContent += `${apiContent}`;
    }
  }
  return baseAPIContent;
}
module.exports = getBaseAPIContent;
