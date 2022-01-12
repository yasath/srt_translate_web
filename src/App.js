import { useState } from "react";
import SubtitleItem from "./components/SubtitleItem";
import { splitSubtitles, uniqueSubtitles } from "./helpers/processSRT";

const App = () => {
    let fileReader;
    const [originalSubtitles, setOriginalSubtitles] = useState([])
    const [shownSubtitles, setShownSubtitles] = useState([])

    const handleFileRead = (e) => {
        let loadedSubtitles = fileReader.result
            // remove any blank lines
            .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
            // split every third line
            .match(/(?=[\s\S])(?:.*\n?){1,3}/g);

        let parsedSubtitles = splitSubtitles(loadedSubtitles);
        setOriginalSubtitles(parsedSubtitles);
        setShownSubtitles(uniqueSubtitles(parsedSubtitles));
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return (
        <div className="container p-4">
            <div className="row align-items-start">
                <div className="col-lg-4">
                    <h2>srt_translate_web</h2>

                    <input
                        className="form-control"
                        type="file"
                        accept=".srt"
                        onChange={e => handleFileChosen(e.target.files[0])}
                    />
                </div>
                <div className="col-lg-8">
                    {shownSubtitles.map((subtitle) => (
                        <SubtitleItem key={subtitle.text} text={subtitle.text} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
