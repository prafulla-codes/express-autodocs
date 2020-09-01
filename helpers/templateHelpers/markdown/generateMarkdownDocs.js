const createIndex = require("./createIndex");
const exec = require("@actions/exec");
const fs = require("fs");
const github = require("@actions/github");
const getBaseAPIContent = require("./getBaseAPIContent");
const generatePages = require("./generatePages");
async function generateMarkdowndocs(apis, outputBranch, token) {
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  let context = github.context;
  if (process.env.NODE_ENV == "production") {
    await exec.exec(`git stash`);
    await exec.exec(`git checkout -B ${outputBranch}`);
  }
  let output_path;
  if (process.env.NODE_ENV == "production") {
    output_path = process.cwd() + "/docs";
    if (!fs.existsSync(output_path)) fs.mkdirSync(output_path);
  } else {
    output_path = process.cwd() + "/test/output";
    if (!fs.existsSync(output_path)) fs.mkdirSync(output_path);
  }
  let output_file = output_path + "/readme.md";
  let index = createIndex(apis);
  let baseContent = getBaseAPIContent(apis);
  generatePages(apis);
  const fd = fs.openSync(output_file, "w");
  let indexPage = ``;
  if (index) indexPage += index;
  if (baseContent) indexPage += baseContent;
  fs.writeFileSync(output_file, indexPage);
  fs.closeSync(fd);
  if (process.env.NODE_ENV == "production") {
    await exec.exec(`git add docs`);

    // let tree = octokit.git.createTree({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    // });
    await exec.exec(`git config --global user.name 'Express AutoDocs'`);
    await exec.exec(`git config --global user.email 'bot@expressautodocs.xyz'`);
    await exec.exec(`git commit -a 'Created Docs'`);
    await exec.exec(`git push origin ${outputBranch}`);
  }
}

module.exports = generateMarkdowndocs;
