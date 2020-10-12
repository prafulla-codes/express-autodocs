const fs = require('fs');
const { badge } = require('cli-badges');
const { demestifyAPI } = require('./demestifyAPI');
const getFullCall = require('./getFullCall');
const getCallsFromRoute = require('./getCallsFromRoute');

function logSuccess(key, value) {
  console.log('\x1b[32m', '\x1b[1m', `🆗 ${key}`, '\x1b[0m', ' - ', value);
}

function logWarning(key) {
  console.warn('\x1b[1m', '\x1b[33m', `🔎 ${key}`, '\x1b[0m');
}

function getAllAPICalls(filepath, appname, routername) {
  const apis = [];

  // Read The Base File
  const file = fs.readFileSync(filepath, 'utf-8');

  logWarning('Scanning for Base Level APIs...');

  // Step 1 :- Scan Base Level Requests
  let match;
  const baseAPIMatchStartPositions = [];
  const baseLevelAPIRegexString = `${appname}.(get|post|delete|patch|put).*`;
  const baseLevelAPIRegex = new RegExp(baseLevelAPIRegexString, 'g');

  while ((match = baseLevelAPIRegex.exec(file))) {
    baseAPIMatchStartPositions.push(match.index);
  }

  baseAPIMatchStartPositions.forEach((index) => {
    const api = getFullCall(file.substr(index));
    const demestified_api = demestifyAPI(api, index, file);
    apis.push(demestified_api);
  });

  // * Base Level Scan Badge Message
  const successBadge = badge('Base Level APIs Scanned', ` ${apis.length} `, {
    messageBg: 'green',
    messageColor: 'black',
    labelColor: 'black',
    labelBg: 'white',
  });

  logSuccess('Scan Complete', successBadge);
  // ! End Of Base Level Scan Bade Message
  // Step 2 :- Scan API Routes
  logWarning('Detecting Routes...');
  let routeMatchs;
  const routesMatchStartPositions = [];
  const routeRegex = new RegExp(/app\.(use)\(['"`][\/*].*/, 'g');
  while ((routeMatchs = routeRegex.exec(file))) {
    routesMatchStartPositions.push(routeMatchs.index);
  }

  const routesScannedBadge = badge(
    'Routes Detected',
    ` ${routesMatchStartPositions.length} `,
    {
      messageBg: 'green',
      messageColor: 'black',
      labelColor: 'black',
      labelBg: 'white',
    }
  );

  logSuccess('Scan Complete', routesScannedBadge);
  logWarning('Scanning Routes For API Calls...');
  routesMatchStartPositions.forEach((index) => {
    const route = getFullCall(file.substr(index));
    const calls = getCallsFromRoute(route, file, filepath, routername);
    if (calls) apis.push(calls);
  });

  return apis;
}

module.exports = getAllAPICalls;
