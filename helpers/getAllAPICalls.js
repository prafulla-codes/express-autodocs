const fs = require("fs");
const express = require("express");
const getAPI = require("./getAPI");
const { match } = require("assert");
const { all } = require("../test/routes/api/items");
const { badge } = require("cli-badges");
const demestifyAPI = require("./demestifyAPI");
function getAllAPICalls(filepath, appname) {
  const apis = [];
  try {
    // Read The Base File
    fs.readFile(filepath, (err, data) => {
      if (err) throw err;
      console.log("\x1b[32m", "\x1b[33m", "🔎 Scanning for APIs...", "\x1b[0m");
      const file = data.toString(); // Converts the file to readable string
      // Step 1 :- Scan Base Level Requests
      let match,
        baseAPIMatchStartPositions = [];
      const baseLevelAPIRegexString = `${appname}.(get|post|delete|patch|put).*`;
      const baseLevelAPIRegex = new RegExp(baseLevelAPIRegexString, "g");

      while ((match = baseLevelAPIRegex.exec(file)))
        baseAPIMatchStartPositions.push(match.index);
      for (let index of baseAPIMatchStartPositions) {
        let api = getAPI(file.substr(index));
        let demestified_api = demestifyAPI(api);
        apis.push(demestified_api);
      }

      // Step 2 :- Scan API Routes
      const apiRoutes = file.match(/app\.(use)\(['"`][\/*].*/g);

      // Step 3 :- Scanned All APIs
      const successBadge = badge("APIs Scanned", ` ${apis.length} `, {
        messageBg: "green",
        messageColor: "white",
        messageStyle: "bold",
        labelColor: "black",
        labelStyle: "bold",
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
    });
  } catch (err) {
    throw err;
  }
}

module.exports = getAllAPICalls;
