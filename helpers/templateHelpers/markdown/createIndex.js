function createIndex(apis) {
  let baseAPICount = 0;
  let pagesCount = 0;
  let baseAPIs = `### APIs `;
  let hasRoutes = false;
  let pages = `### Categorized APIs`;
  for (let api of apis) {
    if (api.isRoute) {
      hasRoutes = true;
      pagesCount += 1;
      pages += `
  ${pagesCount}. [${api.routeName}](pages/${api.routeName
        .substring(1)
        .replace("/", "-")}.md)
  `;
    } else {
      baseAPICount += 1;
      baseAPIs += `
${baseAPICount}. [${api.callName}](#${api.callName
        .substring(1)
        .replace("/", "-")}) - ${api.method.toUpperCase()}`;
    }
  }

  return `
  ## Table of Content
  ${baseAPIs}
  ${hasRoutes ? pages : null}
    `;
}

module.exports = createIndex;
