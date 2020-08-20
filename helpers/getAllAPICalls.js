const fs = require("fs");
const express = require("express");
const getAPI = require("./getAPI");
const { match } = require("assert");
const { all } = require("../test/routes/api/items");
function getAllAPICalls(filepath, appname) {
  const apis = [];
  try {
    // Read The Base File
    fs.readFile(filepath, (err, data) => {
      if (err) throw err;
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
        console.log(api);
      }
      // Step 2 :- Scan API Routes
      const apiRoutes = file.match(/app\.(use)\(['"`][\/*].*/g);
    });
  } catch (err) {
    throw err;
  }
}

module.exports = getAllAPICalls;
