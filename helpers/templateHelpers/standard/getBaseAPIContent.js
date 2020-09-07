const getAPIContent = require("./getAPIContent");

function getBaseAPIContent(apis) {
  let baseAPIContent = `
  <div class="apis">
  <h1>APIs</h1>`;
  for (let api of apis) {
    if (!api.isRoute) {
      let apiContent = getAPIContent(api);
      baseAPIContent += `${apiContent}`;
    }
  }
  baseAPIContent += "</div>";
  return baseAPIContent;
}
module.exports = getBaseAPIContent;
