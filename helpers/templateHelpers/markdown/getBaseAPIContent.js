const getAPIContent = require("./getAPIContent");

function getBaseAPIContent(apis) {
  let baseAPIContent = `\n# APIs`;
  for (let api of apis) {
    if (!api.isRoute) {
      let apiContent = getAPIContent(api);
      baseAPIContent += `${apiContent}`;
    }
  }
  return baseAPIContent;
}
module.exports = getBaseAPIContent;
