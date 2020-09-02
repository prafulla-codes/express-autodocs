<center>
<img src="https://res.cloudinary.com/prafulla98/image/upload/v1598888740/Express%20AutoDocs/ezgif.com-gif-maker_3_ec8j0s.gif" width="100%"/>
</center>
<br>

# Introduction

This action scans backend express APIs and automatically generates the documentation on every push.

# How to add to your workflow?

To add this action to your workflow simply modify your workflows **main.yml** file.

<pre>
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
        uses: Pika1998/express-autodocs@v0.0.0-beta.1
      # Use the output from the `hello` step
      - name: Get the output time
        run: echo "The time was ${{ steps.reading-file.outputs.time }}"
</pre>

# Configurations

Following are the parameters which you can modify to make this action suitable for your codebase.

| Parameters      | Description                                            | Default Value    |
| --------------- | ------------------------------------------------------ | ---------------- |
| appName         | The name of the app variable                           | app              |
| routerName      | The name of the router variable                        | router           |
| docsTitle       | The title of the documentation page                    | Documentation    |
| server-filepath | The path of the base index file where APIs are defined | server.js        |
| outputFormat    | The format in which assets are deployed                | markdown         |
| outputBranch    | The branch in which the generated docs are deployed    | express-autodocs |

# Contribute

Contributions to this action are most welcomed. please check the [Contributions Guide](CONTRIBUTING.md) for more details.

# Sponser This Project
