const fs = require("fs");
const express = require("express");
const scanBaseFile = require("./helpers/getAllAPICalls");
const getAllAPICalls = require("./helpers/getAllAPICalls");

class ExpressAutodocs {
  static generateDocs(filepath, appname) {
    try {
      const scanMatches = getAllAPICalls(filepath, appname);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ExpressAutodocs;
