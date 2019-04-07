'use strict';

const assert = require('assert');
const fs = require('fs');
const util = require('util');

const pngToPgm = require('../lib/pngToPgm');

const readFileAsync = util.promisify(fs.readFile);

describe('pngToPgm', function () {
    let testPGM, testPNG, testPGM2, testPNG2;

    this.timeout(5000); // Large files can take a long time to convert

    beforeEach(async () => {
        testPGM = await readFileAsync('./test/test_image.pgm');
        testPNG = await readFileAsync('./test/test_image.png');
        testPGM2 = await readFileAsync('./test/test_image_2.pgm');
        testPNG2 = await readFileAsync('./test/test_image_2.png');
    });

    it('test image 1', async () => {
        let result = await pngToPgm(testPNG);
        assert(result.equals(testPGM));
    });

    it('test image 2', async () => {
        let result = await pngToPgm(testPNG2);
        assert(result.equals(testPGM2));
    });
});
