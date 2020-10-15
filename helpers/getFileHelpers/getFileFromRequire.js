const path = require('path');
const fs = require('fs');
function getFileFromRequire(lastParam, filePath) {
  let relativePath = lastParam.split('(')[1];
  relativePath = relativePath.substring(1, relativePath.length - 2) + '.js';
  try {
    let file = fs.readFileSync(
      path.join(path.dirname(filePath), relativePath),
      'utf-8'
    );
    return file.trim();
  } catch (err) {
    console.log(
      '\x1b[1m',
      '\x1b[31m',
      `⏩ Skipping Route ${relativePath} (Failed To Read File)`,
      '\x1b[0m'
    );
    return null;
  }
}

module.exports = getFileFromRequire;
