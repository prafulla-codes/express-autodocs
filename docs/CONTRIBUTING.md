If you are contributing to the Open Source for the first time, You can check out [First Time Contributors Guide](#first-time-contributors-guide)

# Local Setup

- [Fork](https://github.com/Pika1998/express-autodocs/fork) the respository.
- Clone your forked copy of the repository using `git clone https://github.com/${yourUsername}/express-autodocs`
- `cd express-autodocs`
- add the upstream repository as this repository using `git remote add upstream https://github.com/Pika1998/express-autodocs`
- `npm install` to install the dev dependencies.

> Make sure to always pull from upstream before working using `git pull upstream master` to get latest changes and to reduce merge conflicts

# Sending Pull Request

- Create a branch in your forked repository with a relevant name (`e.g Added XYZ feature`)
- Push your changes to the branch
- Create a pull request from your branch to `master` of my branch.

# Running the action in dev environment.

To run this action in a DEV environment use

<pre> npm run dev </pre>

While running the `dev` script, the input files are located in `test_output` folder where you will find a demo `server.js` file and `routes`, you can modify these files to test your custom input

Output is generated in `test_output/output` folder

# First-time Contributors Guide

- You can checkout the [Issues](https://github.com/Pika1998/express-autodocs/issues) and select the one that you like (You can comment on issue to let me know that you're working on it.)
- Just go through the [Local Setup Guide](#local-setup) to locally setup the project
- Once you are done making changes you can create a Pull Request to the master of this (https://github.com/Pika1998/express-autodocs) repository.
