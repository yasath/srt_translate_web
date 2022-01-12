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