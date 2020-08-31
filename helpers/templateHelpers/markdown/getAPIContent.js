function getAPIContent(api) {
  let title = `
### **\\${api.callName}** - \`\`\`${api.method.toUpperCase()}\`\`\``;
  let apiMarkdown = `${title}`;
  if (api.params) {
    if (api.params.label) apiMarkdown += ` -  \`{${api.params.label}}\``;
    if (api.params.description) apiMarkdown += `\n${api.params.description}`;
    if (api.params.inputs) {
      let inputTable = getInputTable(api.params.inputs);
      apiMarkdown += inputTable;
    }
  }
  return apiMarkdown;
}

function getInputTable(inputs) {
  let inputTable = ` Inputs
| Input      | Description |
| ----------- | ----------- |`;
  for (input in inputs) {
    inputTable += `\n| ${input} | ${inputs[input]} |`;
  }
  return inputTable;
}
module.exports = getAPIContent;
