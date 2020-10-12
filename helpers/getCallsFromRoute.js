const vm = require('vm');
const fs = require('fs');
const path = require('path');
const getFileFromRequire = require('./getFileHelpers/getFileFromRequire');
const getFileFromVariableRoute = require('./getFileHelpers/getFileFromVariableRoute');
const getFullCall = require('./getFullCall');
const demestifyAPI = require('./demestifyAPI');

function getCallsFromRoute(route, basefile, basefilePath, routername) {
  // Gets The Route File
  const routeFile = getRouteFile(route, basefile, basefilePath);
  const apis = [];
  if (!routeFile) return null;
  let match;
  const routeAPIMatchStartPositions = [];
  const routeLevelAPIRegexString = `${routername}.(get|post|delete|patch|put).*`;
  const routeLevelAPIRegex = new RegExp(routeLevelAPIRegexString, 'g');
  const routeName = getRouteName(route);
  while ((match = routeLevelAPIRegex.exec(routeFile))) {
    routeAPIMatchStartPositions.push(match.index);
  }
  for (const index of routeAPIMatchStartPositions) {
    const api = getFullCall(routeFile.substr(index));
    const demestified_api = demestifyAPI(api, index, routeFile, routeName);
    apis.push(demestified_api);
  }

  return { isRoute: true, apis, routeName };
}

function getRouteName(route) {
  let routeName = route.split(',')[0].split('(')[1];
  routeName = routeName.substring(1, routeName.length - 1);
  return routeName;
}

function getRouteFile(route, basefile, filePath) {
  let trimmedRoute = route.match(/\(.[\s\S]*/g)[0];
  trimmedRoute = trimmedRoute.substring(1, trimmedRoute.length - 1);
  const routeParams = [...trimmedRoute.split(',')];
  const lastParam = routeParams[routeParams.length - 1];
  if (lastParam.includes('require')) {
    const file = getFileFromRequire(lastParam.trim(), filePath);
    return file;
  }
  const file = getFileFromVariableRoute(lastParam.trim(), basefile, filePath);
  return file;
}

module.exports = getCallsFromRoute;
