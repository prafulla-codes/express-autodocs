const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const path = require('path');

function getFileFromVariableRoute(lastParam, basefile, filePath) {
  let ast = babelParser.parse(basefile, {
    sourceType: 'module'
  });
  // Find the file path
  traverse(ast, {
    enter(abc) {
      if (
        abc.node.type == 'Identifier' &&
        abc.node.name == lastParam &&
        abc.parent.type == 'VariableDeclarator'
      ) {
        /* * Variable Declaration Found */
        let relativePath = abc.parent.init.arguments[0].value + '.js';
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
    }
  });

  return null;
}

module.exports = getFileFromVariableRoute;
