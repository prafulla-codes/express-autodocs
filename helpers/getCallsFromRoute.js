const vm = require('vm');
const fs = require('fs');
const path = require('path');
const getFileFromRequire = require('./getFileHelpers/getFileFromRequire');
const getFileFromVariableRoute = require('./getFileHelpers/getFileFromVariableRoute');
const getFullCall = require('./getFullCall');
const demestifyAPI = require('./demestifyAPI');

function getCallsFromRoute(route, basefile, basefilePath, routername) {
  // Gets The Route File
  let routeFile = getRouteFile(route, basefile, basefilePath);
  let apis = [];
  if (!routeFile) return null;
  let match,
    routeAPIMatchStartPositions = [];
  const routeLevelAPIRegexString = `${routername}.(get|post|delete|patch|put).*`;
  const routeLevelAPIRegex = new RegExp(routeLevelAPIRegexString, 'g');
  let routeName = getRouteName(route);
  while ((match = routeLevelAPIRegex.exec(routeFile)))
    routeAPIMatchStartPositions.push(match.index);
  for (let index of routeAPIMatchStartPositions) {
    let api = getFullCall(routeFile.substr(index));
    let demestified_api = demestifyAPI(api, index, routeFile, routeName);
    apis.push(demestified_api);
  }
  return { isRoute: true, apis: apis, routeName: routeName };
}

function getRouteName(route) {
  let routeName = route.split(',')[0].split('(')[1];
  routeName = routeName.substring(1, routeName.length - 1);
  return routeName;
}

function getRouteFile(route, basefile, filePath) {
  let mainContent = route.split('.')[1].split('(')[0];
  let trimmedRoute = route.match(/\(.[\s\S]*/g)[0];
  trimmedRoute = trimmedRoute.substring(1, trimmedRoute.length - 1);
  let routeParams = [...trimmedRoute.split(',')];
  let lastParam = routeParams[routeParams.length - 1];
  if (lastParam.includes('require')) {
    let file = getFileFromRequire(lastParam.trim(), filePath);
    return file;
  } else {
    let file = getFileFromVariableRoute(lastParam.trim(), basefile, filePath);
    return file;
  }
}

module.exports = getCallsFromRoute;
