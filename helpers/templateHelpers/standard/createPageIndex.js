function createPageIndex(apis) {
  let baseAPICount = 0;
  let pagesCount = 0;
  let baseAPIs = ``;
  let hasRoutes = false;
  let pages = `<h2> Categorized APIs </h2><br/>`;
  for (let api of apis) {
    if (api.isRoute) {
      hasRoutes = true;
      pagesCount += 1;
      pages += `
      <a href="pages/${api.routeName.substring(1).replace('/', '-')}.html"> ${
        api.routeName
      } </a>
        <br/>
    `;
    } else {
      baseAPICount += 1;
      baseAPIs += `
      <a href="#${api.callName.substring(1).replace('/', '-')}.html"> ${
        api.callName
      } </a>
        <br/>
`;
    }
  }

  return `
    <div class="index">
    <h2> APIs </h2><br/>
    ${baseAPIs}
    ${hasRoutes ? `<br/>${pages}` : ''}
    </div> `;
}

module.exports = createPageIndex;
