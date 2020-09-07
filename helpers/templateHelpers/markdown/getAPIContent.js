function getAPIContent(api) {
  console.log(api);
  let title = `
<h2 id="${api.callName.substring(1).replace("/", "-")}"> <b>${
    api.callName
  }</b> - <code>${api.method.toUpperCase()}</code>`;
  let apiMarkdown = `${title}`;
  if (api.params) {
    if (api.params.label) {
      apiMarkdown += ` - <code>{${api.params.label}}</code></h2>`;
    } else {
      apiMarkdown += `</h2>`;
    }
    if (api.params.description) apiMarkdown += `\n${api.params.description}`;
    if (api.params.inputs) {
      let inputTable = getInputTable(api.params.inputs);
      apiMarkdown += `
<br><br>\n
${inputTable}`;
    }
    if (api.params.outputs) {
      let outputTable = getOutputTable(api.params.outputs);
      apiMarkdown += `
  <br>
      ${outputTable}`;
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
function getOutputTable(outputs) {
  let outputTable = `
  **Outputs**
  | Output      | Description |
  | ----------- | ----------- |`;
  for (output in outputs) {
    outputTable += `\n| ${output} | ${outputs[output]} |`;
  }
  return outputTable;
}
module.exports = getAPIContent;
