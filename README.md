# bd-04-gp-webcrawler

Guided project:

> Build a web crawler in Node.js that reports on the internal linking profile of any website. This web crawler is a tool any SEO expert would be lucky to have. If you're interested in getting a job writing JavaScript, this project will teach you how a Node.js command-line application is built.

# webcrawler

This console application crawls the given website and presents a report with the links found and their counts. The links are sorted with largest counts on top.

## Installation and use

Clone this repository with:

```bash
git clone https://github.com/danilogalisteu/bd-04-gp-webcrawler
```

The application uses [`node.js`](https://nodejs.org/en/) as the Javascript runtime, [`nvm`](https://github.com/nvm-sh/nvm) for runtime version management and `npm`for package dependency management.

To initialize the application environment, change to the `bd-04-gp-webcrawler` folder, run:
```bash
nvm use
```
to activate the correct version of `node`, and run:
```bash
npm install
```
to install all dependencies. The application depends on the `jsdom` package, and its tests depend on the `jest`package.

Run the application with:
```bash
npm start [URL]
```

Tests can be run with:
```bash
npm test
```
