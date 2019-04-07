'use strict';

const util = require('util');
const pngjs = require('pngjs');
const stream = require('stream');

module.exports = util.promisify(pngToPgm);

function pngToPgm(buffer, cb) {
    let imageStream = new stream.PassThrough();
    imageStream.end(buffer);

    imageStream.pipe(new pngjs.PNG()).on('parsed', function () {
        let pgmArray = createPGMArray(this.data, this.width, this.height);
        let pgmString = arrayToPGMString(pgmArray);
        cb(null, Buffer.from(pgmString));
    });
}

function createPGMArray(data, width, height) {
    let pgmData = [];

    for (var y = 0; y < height; y++) {
        pgmData.push(Array(width));

        for (var x = 0; x < width; x++) {
            var idx = (width * y + x) << 2;

            let red = data[idx];
            let blue = data[idx + 1];
            let green = data[idx + 2];
            let alpha = data[idx + 3];

            if (alpha === 0) {
                pgmData[y][x] = 205;
            } else {
                pgmData[y][x]  = Math.floor((red + blue + green)/3);
            }
        }
    }

    return pgmData;
}

function arrayToPGMString(pgmArray) {
    let pgmString = `P2\n${pgmArray[0].length} ${pgmArray.length}\n256\n`;
    for (let row of pgmArray) {
        for (let pixel of row) {
            pgmString += pixel + ' ';
        }
        pgmString += '\n';
    }
    return pgmString;
}
