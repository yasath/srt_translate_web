// split array of subtitle strings into array of subtitle objects
export function splitSubtitles(subtitles) {
    let parsedSubtitles = [];
    for (let subtitle of subtitles) {
        let splitSubtitle = subtitle
            .split(/\r?\n/)
            .filter(x => x);
        parsedSubtitles.push({
            id: parseInt(splitSubtitle[0]),
            times: splitSubtitle[1],
            text: splitSubtitle[2]
        });
    }
    return parsedSubtitles;
}

// return array of unique subtitles and their corresponding IDs
export function uniqueSubtitles(subtitles) {
    let parsedSubtitles = [];
    for (let subtitle of subtitles) {
        if (parsedSubtitles.some(x => x.text === subtitle.text)) {
            parsedSubtitles.find(x => x.text === subtitle.text).ids.push(subtitle.id);
        } else {
            parsedSubtitles.push({
                ids: [subtitle.id],
                text: subtitle.text
            });
        }
    }
    return parsedSubtitles;
}

// reintegrate subtitles from array of unique subtitles, and the original subtitles
export function reintegrateSubtitles(originals, subtitles) {
    if (subtitles.length > 0) {
        let reintegratedSubtitles = [];
        for (let original of originals) {
            reintegratedSubtitles.push({
                id: original.id,
                times: original.times,
                text: subtitles.find(x => x.ids.includes(original.id)).text
            })
        }
        return reintegratedSubtitles;
    } else {
        return originals;
    }
}

// create formatted SRT from array of subtitle objects
export function createSRT(subtitles) {
    let output = "";
    for (let subtitle of subtitles) {
        output += subtitle.id.toString() + "\n";
        output += subtitle.times + "\n";
        output += subtitle.text + "\n\n";
    }
    return output;
}