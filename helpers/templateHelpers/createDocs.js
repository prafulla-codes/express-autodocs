const generateMarkdowndocs = require('./markdown/generateMarkdownDocs');
const generateStandardDocs = require('./standard/generateStandardDocs');

function createDocs(apis, outputFormat, outputBranch, docsTitle) {
  switch (outputFormat) {
    case 'markdown':
      generateMarkdowndocs(apis, outputBranch, docsTitle);
      break;
    case 'standard':
      generateStandardDocs(apis, outputBranch, docsTitle);
      break;
    default:
      console.log('\x1b[1m', '\x1b[31m', `❌ Invalid Output Format`, '\x1b[0m');
      return;
  }
}

module.exports = createDocs;
