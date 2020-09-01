const fs = require("fs");
const express = require("express");
const getAPI = require("./getFullCall");
const { match } = require("assert");
const { all } = require("../test/routes/api/items");
const { badge } = require("cli-badges");
const demestifyAPI = require("./demestifyAPI");
const getFullCall = require("./getFullCall");
const getCallsFromRoute = require("./getCallsFromRoute");
function getAllAPICalls(filepath, appname, routername) {
  const apis = [];
  try {
    // Read The Base File
    let file = fs.readFileSync(filepath, "utf-8");
    console.log(
      "\x1b[1m",
      "\x1b[33m",
      "🔎 Scanning for Base Level APIs...",
      "\x1b[0m"
    );

    // Step 1 :- Scan Base Level Requests
    let match,
      baseAPIMatchStartPositions = [];
    const baseLevelAPIRegexString = `${appname}.(get|post|delete|patch|put).*`;
    const baseLevelAPIRegex = new RegExp(baseLevelAPIRegexString, "g");

    while ((match = baseLevelAPIRegex.exec(file)))
      baseAPIMatchStartPositions.push(match.index);
    for (let index of baseAPIMatchStartPositions) {
      let api = getFullCall(file.substr(index));
      let demestified_api = demestifyAPI(api, index, file);
      apis.push(demestified_api);
    }
    // * Base Level Scan Badge Message
    const successBadge = badge("Base Level APIs Scanned", ` ${apis.length} `, {
      messageBg: "green",
      messageColor: "black",
      labelColor: "black",
      labelBg: "white",
    });
    console.log(
      "\x1b[32m",
      "\x1b[1m",
      "🆗 Scan Complete",
      "\x1b[0m",
      " - ",
      successBadge
    );
    // ! End Of Base Level Scan Bade Message
    // Step 2 :- Scan API Routes
    console.log("\x1b[1m", "\x1b[33m", "🔎 Detecting Routes...", "\x1b[0m");
    let routeMatchs,
      routesMatchStartPositions = [];
    const routeRegex = new RegExp(/app\.(use)\(['"`][\/*].*/, "g");
    while ((routeMatchs = routeRegex.exec(file)))
      routesMatchStartPositions.push(routeMatchs.index);

    const routesScannedBadge = badge(
      "Routes Detected",
      ` ${routesMatchStartPositions.length} `,
      {
        messageBg: "green",
        messageColor: "black",
        labelColor: "black",
        labelBg: "white",
      }
    );
    console.log(
      "\x1b[32m",
      "\x1b[1m",
      "🆗 Scan Complete",
      "\x1b[0m",
      " - ",
      routesScannedBadge
    );

    console.log(
      "\x1b[1m",
      "\x1b[33m",
      "🔎 Scanning Routes For API Calls...",
      "\x1b[0m"
    );
    for (let index of routesMatchStartPositions) {
      let route = getFullCall(file.substr(index));
      let calls = getCallsFromRoute(route, file, filepath, routername);
      if (calls) apis.push(calls);
    }
    return apis;
  } catch (err) {
    throw err;
  }
}

module.exports = getAllAPICalls;
