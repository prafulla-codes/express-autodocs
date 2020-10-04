const vm = require('vm');
function demestifyAPI(api, index, file, routeprefix = '') {
  let METHOD = api.split('.')[1].split('(')[0];
  let trimmedCall = api.match(/\(.[\s\S]*/g)[0];
  trimmedCall = trimmedCall.substring(1, trimmedCall.length - 1);
  let CALL = trimmedCall.split(',')[0];
  CALL = CALL.substring(1, CALL.length - 1);
  let params = getCustomParams(index, file);
  return {
    method: METHOD,
    callName: routeprefix + CALL,
    params,
  };
}

function getCustomParams(index, file) {
  // Backtraces for an immediate multi-line comment
  let descriptionFound = 'unknown';
  let currentIndex = index;
  while (descriptionFound == 'unknown') {
    if (currentIndex != 0) {
      if (
        file.charAt(currentIndex - 1) == ' ' ||
        file.charAt(currentIndex - 1) == '\n'
      ) {
        currentIndex -= 1;
      } else if (file.charAt(currentIndex - 1) == '/') {
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

// function getCommentedParams(index, file) {
//   let startIndex = index - 3; //  will be the character before '*' character
//   let currentIndex = startIndex;
//   let params = '';
//   while (file.charAt(currentIndex) != '*') {
//     params = params + file.charAt(currentIndex);
//     currentIndex -= 1;
//   }
//   try {
//     params = JSON.parse([...params].reverse().join('').trim());
//     console.log('Params:', params);
//     return params;
//   } catch (err) {
//     console.log(
//       '\x1b[1m',
//       '\x1b[31m',
//       `❌ Make sure the params passed in comments are in proper JSON Format.`,
//       '\x1b[0m'
//     );
//     return null;
//   }
// }

function getCommentedParams(index, file) {
  let startIndex = index - 3; //  will be the character before '*' character
  let currentIndex = startIndex;
  let params = '';
  let data = {};
  while (file.charAt(currentIndex) != '/') {
    params = params + file.charAt(currentIndex);
    currentIndex -= 1;
  }
  try {
    let item = [...params].reverse().join('').split('\r');
    item.forEach(function (param) {
      let temp = param.split('-');
      if (temp.length == 2) {
        temp[0] = temp[0].trim();
        temp[0] = temp[0].substring(temp[0].lastIndexOf(' '));
        data[temp[0].trim()] = String(temp[1].trim());
      }
    });
    return data;
  } catch (err) {
    console.log(
      '\x1b[1m',
      '\x1b[31m',
      `❌ Make sure the params passed in comments are in proper JSDoc Format.`,
      '\x1b[0m'
    );
    return null;
  }
}

module.exports = demestifyAPI;
