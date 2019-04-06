# PNG to PGM

A simple library that convert PNG files to [PGM](https://en.wikipedia.org/wiki/Netpbm_format#PGM_example) files.

## Installation

```sh
npm install pngtopgm
```

## Basic Usage

The module exposes a single function that takes a [buffer](https://nodejs.org/api/buffer.html) as the argument. It returns a buffer containing the PGM file data in ASCII format.

```js
pngToPgm(buffer)
```

```js
const pngToPgm = require('pngtopgm');
const fs = require('fs');

let myPng = fs.readFileSync('./myPng.png');
let myPgm = pgnToPgm(myPng);
fs.writeFileSync('./myPgm.pgm', myPgm);
```

## Development

Run unit tests and linting with:
```
npm run test
npm run lint
```