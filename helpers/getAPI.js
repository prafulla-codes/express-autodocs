function getAPI(match) {
  let api = "";
  let parenthesisCount = 0;
  let initializedParenthesisCounting = false;

  for (let i of match) {
    if (i == "(") {
      parenthesisCount += 1;
      initializedParenthesisCounting = true;
    }
    if (i == ")") {
      parenthesisCount -= 1;
    }
    api = api.concat(i);
    if (parenthesisCount == 0 && initializedParenthesisCounting == true) {
      // Parsing complete
      return api;
    }
  }
  return null;
}
module.exports = getAPI;
