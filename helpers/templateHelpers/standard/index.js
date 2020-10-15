const createIndex = require('./createIndex');
const core = require('@actions/core');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const getBaseAPIContent = require('./getBaseAPIContent');
const generatePages = require('./generatePages');
const createStylesheet = require('./createStylesheet');
async function generateStandardDocs(apis, outputBranch, docsTitle) {
  if (process.env.NODE_ENV == 'production') {
    console.log(
      '\x1b[36m',
      '\x1b[1m',
      `ℹ️ Setting up output branch ${outputBranch} ...`,
      '\x1b[0m'
    );

    const setupFreshBranch = `
    git stash 
    git config --global user.name 'express-autodocs'
    git config --global user.email 'bot@expressautodocs.xyz'
    git checkout -B ${outputBranch}
    git rm -rf .
    `;
    try {
      const { stderr } = await exec(setupFreshBranch);
      if (stderr) console.log(stderr);
      console.log(
        '\x1b[36m',
        '\x1b[1m',
        `🆗 Branch Setup Successful`,
        '\x1b[0m'
      );
    } catch (err) {
      core.setFailed(err.message);
    }
  }
  let output_path;
  if (process.env.NODE_ENV == 'production') {
    output_path = process.cwd() + '/docs';
    if (!fs.existsSync(output_path)) fs.mkdirSync(output_path);
  } else {
    output_path = process.cwd() + '/test_output/output';
    if (!fs.existsSync(output_path)) fs.mkdirSync(output_path);
  }
  createStylesheet();
  let output_file = output_path + '/index.html';
  let index = createIndex(apis);
  let baseContent = getBaseAPIContent(apis);
  generatePages(apis);
  const fd = fs.openSync(output_file, 'w');
  let indexPage = `
  <html>
  <head>
  <link rel="stylesheet" href="style.css">
  <title> ${docsTitle} </title>
  </head>
  <body>
  <div class="nav">
  <h2> ${docsTitle} </h2>
  </div>`;
  if (index) indexPage += index;
  if (baseContent) indexPage += baseContent;
  indexPage += `
  </body>
  </html>
  `;
  fs.writeFileSync(output_file, indexPage);
  fs.closeSync(fd);
  if (process.env.NODE_ENV == 'production') {
    console.log(
      '\x1b[36m',
      '\x1b[1m',
      `🚀 Deploying to ${outputBranch} ...`,
      '\x1b[0m'
    );
    const deploy = `
    git add docs
    git commit -m "Created Docs" -a
    git config --global user.email 'bot@expressautodocs.xyz'
    git push origin ${outputBranch} --force
    `;
    try {
      const { stderr } = await exec(deploy);
      if (stderr) console.log(stderr);
      console.log(
        '\x1b[36m',
        '\x1b[1m',
        `🎉 Docs created. Checkout ${outputBranch} branch.`,
        '\x1b[0m'
      );
    } catch (err) {
      core.setFailed(err.message);
    }
  }
}

module.exports = generateStandardDocs;
