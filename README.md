<img src="https://res.cloudinary.com/prafulla98/image/upload/v1598888740/Express%20AutoDocs/ezgif.com-gif-maker_3_ec8j0s.gif" width="100%"/>
<p align="center">
<br>
<br>
<a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/Contributions-Welcome-informational?style=for-the-badge&logo=github&logoColor=white&labelColor=black" alt="Contributions"/></a> <img src="https://img.shields.io/github/license/pika1998/express-autodocs?style=for-the-badge&labelColor=black"> <img src="https://img.shields.io/github/v/release/pika1998/express-autodocs?style=for-the-badge&labelColor=black">
<img src="https://img.shields.io/github/all-contributors/pika1998/express-autodocs?style=for-the-badge"/>
</p>
<br>

# 💡 Introduction

This action automatically scans for express APIs in your codebase and generates a documentation website

<br>

# How to add to your workflow ❔

To add this action to your workflow simply modify your workflows **main.yml** file.

```yml
# This is a basic workflow to help you get started with Express AutoDocs Action

name: Express AutoDocs.

# This specifies when the action should occur
on:
  push:
    branches: [master]

jobs:
  generate_docs_job:
    runs-on: ubuntu-latest
    name: Generating Docs
    steps:
      # this step checks out the master branch of your repo using checkout action.
      - name: Checks out the repository
        id: checksout-repository
        uses: actions/checkout@v2
        with:
          repository: ""
      # this step generates the docs
      - name: Generating Docs.
        id: reading-file
        uses: Pika1998/express-autodocs@v0.0.1
      # Use the output from the `hello` step
      - name: Get the output time
        run: echo "The time was ${{ steps.reading-file.outputs.time }}"
```

<br>

# ⚙️ Configurations

Following are the parameters which you can modify to make this action suitable for your codebase.

| Parameters      | Description                                                                                                                         | Default Value    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| appName         | The name of the app variable                                                                                                        | app              |
| routerName      | The name of the router variable                                                                                                     | router           |
| docsTitle       | The title of the documentation page                                                                                                 | Documentation    |
| server-filepath | The path of the base index file where APIs are defined                                                                              | server.js        |
| outputFormat    | The format in which assets are deployed <br/> **markdown** - To generate MD files <br/> **standard** - To generate HTML & CSS Files | standard         |
| outputBranch    | The branch in which the generated docs are deployed                                                                                 | express-autodocs |

<br>

# Describing your APIs

You can easily add description to your APIs using JSON in comments in the following way

**Adding API descriptions**

```js
/*  
{
    "description":"Checks for token and gets the logged in user",
    "inputs":{
        "x-auth-token":"The JWT Token in header"
    },
    "label":"Public",
    "outputs":{
        "user":"The user object stored in database",
    }
}
*/
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.json(user);
    });
});
```

# 🗃️ Example Output

<img src="https://res.cloudinary.com/prafulla98/image/upload/v1599465979/Express%20AutoDocs/express-autodocs-standard1_dtvoj8.png" width='100%'><img src="https://res.cloudinary.com/prafulla98/image/upload/v1599465979/Express%20AutoDocs/express-autodocs-standard2_owbp3q.png" width='100%'>

# ⏱️ Changelog

Check the [CHANGELOG.md](CHANGELOG.md) to view the changes done to this action over time

# ⭐ Contribute

Contributions to this action are most welcomed. please check the [Contributions Guide](CONTRIBUTING.md) for more details.

# 🤗 Sponser This Project

<a href="https://www.buymeacoffee.com/prafulla98" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" width="45%" ></a>

<a href="https://www.patreon.com/prafulla">
<img src="https://feministlibrary.co.uk/wp-content/uploads/2016/05/become_a_patron_button@2x.png" width="45%">
</a>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://prafulla.tech"><img src="https://avatars3.githubusercontent.com/u/36433104?v=4" width="100px;" alt=""/><br /><sub><b>Prafulla Raichurkar</b></sub></a><br /><a href="https://github.com/Pika1998/express-autodocs/commits?author=Pika1998" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/syedmuhammadabid/"><img src="https://avatars2.githubusercontent.com/u/19214455?v=4" width="100px;" alt=""/><br /><sub><b>Syed Muhammad Abid</b></sub></a><br /><a href="https://github.com/Pika1998/express-autodocs/commits?author=syedmuhammadabid" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KulkarniSuraj"><img src="https://avatars2.githubusercontent.com/u/30728951?v=4" width="100px;" alt=""/><br /><sub><b>Suraj Kulkarni</b></sub></a><br /><a href="https://github.com/Pika1998/express-autodocs/commits?author=KulkarniSuraj" title="Code">💻</a> <a href="https://github.com/Pika1998/express-autodocs/commits?author=KulkarniSuraj" title="Tests">⚠️</a> <a href="https://github.com/Pika1998/express-autodocs/issues?q=author%3AKulkarniSuraj" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/rahil1304"><img src="https://avatars0.githubusercontent.com/u/32304956?v=4" width="100px;" alt=""/><br /><sub><b>Rahil Sarvaiya</b></sub></a><br /><a href="https://github.com/Pika1998/express-autodocs/commits?author=rahil1304" title="Code">💻</a> <a href="https://github.com/Pika1998/express-autodocs/issues?q=author%3Arahil1304" title="Bug reports">🐛</a> <a href="#ideas-rahil1304" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-rahil1304" title="Maintenance">🚧</a> <a href="https://github.com/Pika1998/express-autodocs/commits?author=rahil1304" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
