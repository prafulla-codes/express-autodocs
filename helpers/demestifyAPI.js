function demestifyAPI(api) {
  let METHOD = api.split(".")[1].split("(")[0];
  let trimmedCall = api.match(/\(.[\s\S]*/g)[0];
  trimmedCall = trimmedCall.substring(1, trimmedCall.length - 1);
  let CALL = trimmedCall.split(",")[0];
  CALL = CALL.substring(1, CALL.length - 1);

  return {
    method: METHOD,
    callName: CALL,
  };
}

module.exports = demestifyAPI;
