'use strict';

const assert = require('assert');
const fs = require('fs');
const util = require('util');

const pngToPgm = require('../lib/pngToPgm');

const readFileAsync = util.promisify(fs.readFile);

describe('pngToPgm', () => {
    let testPGM, testPNG;

    beforeEach(async () => {
        testPGM = await readFileAsync('./test/test_image.pgm');
        testPNG = await readFileAsync('./test/test_image.png');
    });

    it('valid image', async () => {
        let result = await pngToPgm(testPNG);
        assert(result.equals(testPGM));
    });
});
