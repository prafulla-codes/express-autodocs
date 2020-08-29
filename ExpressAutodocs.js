const fs = require("fs");
const express = require("express");
const getAllAPICalls = require("./helpers/getAllAPICalls");
class ExpressAutodocs {
  static generateDocs(filepath, appname) {
    try {
      console.log(
        "\x1b[36m",
        "\x1b[1m",
        "✨ Initialized Express AutoDocs",
        "\x1b[0m"
      );
      const scanMatches = getAllAPICalls(filepath, appname);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ExpressAutodocs;
