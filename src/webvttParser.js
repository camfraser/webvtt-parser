/* eslint-disable no-continue */
const CUE = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> (\d{2}):(\d{2}):(\d{2})\.(\d{3})/;
const IGNORE = /^STYLE|NOTE|WEBVTT/;

const timeToSeconds = (hour, minute, second, millisecond) =>
    (parseInt(hour, 10) * 60 * 60) +
        (parseInt(minute, 10) * 60) +
        (parseInt(second, 10)) +
        (parseInt(millisecond, 10) / 1000);

/**
 * Parses webvtt-formatted content into an array of cue entries
 *
 * @param {string} content - WebVTT content, typically loaded from a file
 * @returns {Object[]} - array of cue entries with keys start {number}, end {number}, text {string}
 */
const webVTTParse = (content) => {
    const paragraphs = content.split(/[\r\n]{2,}/);
    const entries = [];
    for (let i = 0; i < paragraphs.length; i += 1) {
        const lines = paragraphs[i].split(/[\r\n]/);
        if (IGNORE.test(lines[0])) continue;
        let timecodes;
        let timeCodeLine = 0;
        for (let j = 0; j < lines.length; j += 1) {
            timecodes = CUE.exec(lines[j]);
            if (!timecodes) continue;
            timeCodeLine = j;
            break;
        }
        if (!timecodes) {
            console.warn(`INVALID CUE ENTRY:\n${paragraphs[i]}`); // eslint-disable-line no-console
            continue;
        }
        entries.push({
            start: timeToSeconds(timecodes[1], timecodes[2], timecodes[3], timecodes[4]),
            end: timeToSeconds(timecodes[5], timecodes[6], timecodes[7], timecodes[8]),
            text: lines.slice(timeCodeLine + 1).filter(l => l).join('\n'),
        });
    }
    return entries;
};

module.exports = webVTTParse;
