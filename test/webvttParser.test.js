'use strict';

const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const webVTTParse = require('../src/webvttParser');

test('Converts empty VTT to empty array', function (t) {
    t.plan(1);
    const emptyVTT = fs.readFileSync(path.join(__dirname, 'fixtures', 'empty.vtt'), 'utf8');
    const entries = webVTTParse(emptyVTT);
    t.same(entries, []);
});

test('Converts VTT to array of entries', function (t) {
    t.plan(1);
    const sampleVTT = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample.vtt'), 'utf8');
    const entries = webVTTParse(sampleVTT);
    const expected = [
        {
            start: 1.05,
            end: 4,
            text: 'Never drink liquid nitrogen.',
        },
        {
            start: 5,
            end: 9,
            text: 'It will perforate your stomach.\nYou could die.',
        },
    ];
    t.same(entries, expected);
});
