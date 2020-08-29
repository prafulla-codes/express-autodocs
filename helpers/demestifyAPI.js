const vm = require("vm");
function demestifyAPI(api, index, file) {
  let METHOD = api.split(".")[1].split("(")[0];
  let trimmedCall = api.match(/\(.[\s\S]*/g)[0];
  trimmedCall = trimmedCall.substring(1, trimmedCall.length - 1);
  let CALL = trimmedCall.split(",")[0];
  CALL = CALL.substring(1, CALL.length - 1);
  let params = getCustomParams(index, file);
  return {
    method: METHOD,
    callName: CALL,
    params,
  };
}

function getCustomParams(index, file) {
  // Backtraces for an immedeate multi-line comment
  let descriptionFound = "unknown";
  let baseIndex = index;
  let currentIndex = baseIndex;
  while (descriptionFound == "unknown") {
    if (currentIndex != 0) {
      if (
        file.charAt(currentIndex - 1) == " " ||
        file.charAt(currentIndex - 1) == "\n"
      ) {
        currentIndex -= 1;
      } else if (file.charAt(currentIndex - 1) == "/") {
        descriptionFound = true;
      } else {
        descriptionFound = false;
      }
    }
  }
  if (descriptionFound) {
    return getCommentedParams(currentIndex, file);
  } else {
    // If no description is present then return null;
    return null;
  }
}

function getCommentedParams(index, file) {
  let startIndex = index - 3; //  will be the character before '*' character
  let currentIndex = startIndex;
  let params = "";
  while (file.charAt(currentIndex) != "*") {
    params = params + file.charAt(currentIndex);
    currentIndex -= 1;
  }
  try {
    params = JSON.parse([...params].reverse().join("").trim());
    return params;
  } catch (err) {
    return null;
  }
}

module.exports = demestifyAPI;
