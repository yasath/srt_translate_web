import { useState } from "react";
import SubtitleItem from "./components/SubtitleItem";
import { splitSubtitles, uniqueSubtitles, reintegrateSubtitles, createSRT } from "./helpers/processSRT";
import "./App.css";

const App = () => {
    let fileReader;
    const [originalSubtitles, setOriginalSubtitles] = useState([]);
    const [shownSubtitles, setShownSubtitles] = useState([]);
    const [finalSubtitles, setFinalSubtitles] = useState([]);
    const [formattedSubtitles, setFormattedSubtitles] = useState("");

    const handleFileRead = (e) => {
        let loadedSubtitles = fileReader.result
            // remove any blank lines
            .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
            // split every third line
            .match(/(?=[\s\S])(?:.*\n?){1,3}/g);

        let parsedSubtitles = splitSubtitles(loadedSubtitles);
        setOriginalSubtitles(parsedSubtitles);
        setShownSubtitles(uniqueSubtitles(parsedSubtitles));
        setFinalSubtitles(uniqueSubtitles(parsedSubtitles));
        setFormattedSubtitles("Start editing to see a live preview here!");
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const handleTextChanged = (ids, text) => {
        finalSubtitles.find(x => JSON.stringify(x.ids) === JSON.stringify(ids)).text = text;
        setFormattedSubtitles(createSRT(reintegrateSubtitles(originalSubtitles, finalSubtitles)))
    }

    return (
        <div className="p-4">
            <div className="row align-items-start">
                <div className="col-lg-3">
                    <h2>srt_translate_web</h2>

                    <input
                        className="form-control"
                        type="file"
                        accept=".srt"
                        onChange={e => handleFileChosen(e.target.files[0])}
                    />
                </div>

                <div id="translate-column" className="col-sm-6 overflow-scroll">
                    {shownSubtitles.map((subtitle) => (
                        <SubtitleItem key={subtitle.text} ids={subtitle.ids} text={subtitle.text} callback={handleTextChanged} />
                    ))}
                </div>

                <div id="srt-column" className="col-sm-3 overflow-scroll">
                    <code>{formattedSubtitles}</code>
                </div>
            </div>
        </div>
    )
}

export default App
