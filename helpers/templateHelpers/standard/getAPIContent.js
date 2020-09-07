function getAPIContent(api) {
  console.log(api);
  let title = `
  <div class="api">
  <h2 id="${api.callName
    .substring(1)
    .replace("/", "-")}"> <span class="title">${
    api.callName
  }</span> - <span class="method">${api.method.toUpperCase()}</span>`;
  let apiStandard = `${title}`;
  if (api.params) {
    if (api.params.label) {
      apiStandard += ` - <span class="label">${api.params.label}</span></h2>`;
    } else {
      apiStandard += `</h2>`;
    }
    if (api.params.description)
      apiStandard += `<br/><p class="description">${api.params.description}</p>`;
    if (api.params.inputs) {
      let inputTable = getInputTable(api.params.inputs);
      apiStandard += `
<br><br>\n
${inputTable}`;
    }
    if (api.params.outputs) {
      let outputTable = getOutputTable(api.params.outputs);
      apiStandard += `
  <br>
      ${outputTable}`;
    }
  }
  apiStandard += "</div>";
  return apiStandard;
}

function getInputTable(inputs) {
  let inputTable = `<b>Inputs</b>
  <table>
  <tr>
  <th>Input</th>
  <th>Description</th>
  </tr>`;
  for (input in inputs) {
    inputTable += `
    <tr> 
    <td> ${input} </td>
    <td> ${inputs[input]} </td>
    </tr>
    `;
  }
  inputTable += "</table>";
  return inputTable;
}
function getOutputTable(outputs) {
  let outputTable = `
  <b>Outputs</b>
  <table>
  <tr>
  <th>Output</th>
  <th>Description</th>
  </tr>`;
  for (output in outputs) {
    outputTable += `
    <tr> 
    <td> ${output} </td>
    <td> ${outputs[output]} </td>
    </tr>
   `;
  }
  outputTable += "</table>";
  return outputTable;
}
module.exports = getAPIContent;
