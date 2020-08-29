const vm = require("vm");
const fs = require("fs");
const path = require("path");
const getFullCall = require("./getFullCall");
function getCallsFromRoute(route, basefile, basefilePath) {
  // Gets The Route File
  let routeFile = getRouteFile(route, basefile, basefilePath);
  if (routeFile) console.log(routeFile);
}

function getRouteFile(route, basefile, filePath) {
  let mainContent = route.split(".")[1].split("(")[0];
  let trimmedRoute = route.match(/\(.[\s\S]*/g)[0];
  trimmedRoute = trimmedRoute.substring(1, trimmedRoute.length - 1);
  let routeParams = [...trimmedRoute.split(",")];
  let lastParam = routeParams[routeParams.length - 1];
  if (lastParam.includes("require")) {
    let file = getFileFromRequire(lastParam, filePath);
    return file;
  } else {
  }
}

function getFileFromRequire(lastParam, filePath) {
  let relativePath = lastParam.split("(")[1];
  relativePath = relativePath.substring(1, relativePath.length - 2) + ".js";
  try {
    let file = fs.readFileSync(
      path.join(path.dirname(filePath), relativePath),
      "utf-8"
    );
    return file;
  } catch (err) {
    console.log(
      "\x1b[1m",
      "\x1b[31m",
      `⏩ Skipping Route ${relativePath} (Failed To Read File)`,
      "\x1b[0m"
    );

    return null;
  }
}

module.exports = getCallsFromRoute;
