function getAPIContent(api) {
  let title = `
<h2 id="${api.callName.substring(1).replace("/", "-")}"> <b>${
    api.callName
  }</b> - <code>${api.method.toUpperCase()}</code>`;
  let apiMarkdown = `${title}`;
  if (api.params) {
    if (api.params.label)
      apiMarkdown += ` - <code>{${api.params.label}}</code></h2>`;
    else {
      apiMarkdown += `</h2>`;
    }
    if (api.params.description) apiMarkdown += `\n${api.params.description}`;
    if (api.params.inputs) {
      let inputTable = getInputTable(api.params.inputs);
      apiMarkdown += `\n
  ${inputTable}`;
    }
  }
  return apiMarkdown;
}

function getInputTable(inputs) {
  let inputTable = `**Inputs**
| Input      | Description |
| ----------- | ----------- |`;
  for (input in inputs) {
    inputTable += `\n| ${input} | ${inputs[input]} |`;
  }
  return inputTable;
}
module.exports = getAPIContent;
