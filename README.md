# webvtt-parser
Simple WebVTT parser for nodejs

## Usage

This module parses through a complete WebVTT document, skipping `NOTE`
and `STYLE` blocks and ignoring any inline style definitions.

```
const sampleVTT = fs.readFileSync('sample.vtt'), 'utf8');
const entries = webVTTParse(sampleVTT);
console.log(entries);
// Yields:
[
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
]
```

## Documentation
See the [API docs](API.md) for full documentation of the methods.
