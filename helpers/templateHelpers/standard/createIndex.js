function createIndex(apis) {
  let baseAPICount = 0;
  let pagesCount = 0;
  let baseAPIs = `<h2> APIs </h2><br/>`;
  let hasRoutes = false;
  let pages = `<h2> Categorized APIs </h2><br/>`;
  for (let api of apis) {
    if (api.isRoute) {
      hasRoutes = true;
      pagesCount += 1;
      pages += `
      <a href="pages/${api.routeName.substring(1).replace('/', '-')}.html ">
         ${api.routeName}</a>
        <br/>
      `;
    } else {
      baseAPICount += 1;
      baseAPIs += `
      <a href="#${api.callName.substring(1).replace('/', '-')}"> ${
        api.callName
      }</a>
        <br/>
      `;
    }
  }

  return `
  <div class="index">
  ${baseAPIs}
  <br/>
  ${hasRoutes ? pages : ''}
  </div>`;
}

module.exports = createIndex;
