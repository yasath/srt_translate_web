import { useState, useRef } from "react";
import SubtitleItem from "./components/SubtitleItem";
import { splitSubtitles, uniqueSubtitles, reintegrateSubtitles, createSRT } from "./helpers/processSRT";
import { exampleSRT } from "./helpers/exampleSRT";
import { FiDownload } from "react-icons/fi";
import "./App.css";

const App = () => {
    let fileReader;
    const [fileName, setFileName] = useState("");
    const [originalSubtitles, setOriginalSubtitles] = useState([]);
    const [shownSubtitles, setShownSubtitles] = useState([]);
    const [finalSubtitles, setFinalSubtitles] = useState([]);
    const [formattedSubtitles, setFormattedSubtitles] = useState("");
    const fileInput = useRef(null);

    const loadExampleSRT = (event) => {
        setInitialStates(exampleSRT);
        fileInput.current.value = null;
    }

    const handleFileRead = (event) => {
        setInitialStates(fileReader.result);
    };

    const setInitialStates = (file) => {
        let loadedSubtitles = file
            // remove any blank lines
            .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
            // split every third line
            .match(/(?=[\s\S])(?:.*\n?){1,3}/g);
        setFormattedSubtitles(file);
        let parsedSubtitles = splitSubtitles(loadedSubtitles);
        setOriginalSubtitles(parsedSubtitles);
        setShownSubtitles(uniqueSubtitles(parsedSubtitles));
        setFinalSubtitles(uniqueSubtitles(parsedSubtitles));
    }

    const handleFileChosen = (file) => {
        setFileName(file.name);
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const handleTextChanged = (ids, text) => {
        finalSubtitles.find(x => JSON.stringify(x.ids) === JSON.stringify(ids)).text = text;
        setFormattedSubtitles(createSRT(reintegrateSubtitles(originalSubtitles, finalSubtitles)))
    }

    const saveSRT = (event) => {
        const a = document.createElement("a");
        const file = new Blob([createSRT(reintegrateSubtitles(originalSubtitles, finalSubtitles))], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        // this regex removes the file extension
        a.download = fileName.replace(/\.[^/.]+$/, "") + "_translated.srt";
        a.click();
        URL.revokeObjectURL(a.href);
    }

    return (
        <div className="p-4">
            <div className="row align-items-start">
                <div className="col-lg-3">
                    <h2>srt_translate_web</h2>

                    <input
                        className="form-control mb-2"
                        ref={fileInput}
                        type="file"
                        accept=".srt"
                        onChange={e => handleFileChosen(e.target.files[0])}
                    />

                    <p className="text-muted">Or, <span className="link-primary" onClick={loadExampleSRT}>use an example file</span>.</p>
                </div>

                <div id="translate-column" className="col-sm-6">
                    {shownSubtitles.map((subtitle) => (
                        <SubtitleItem key={subtitle.text} ids={subtitle.ids} text={subtitle.text} callback={handleTextChanged} />
                    ))}
                </div>

                <div id="srt-column" className="col-sm-3">
                    {formattedSubtitles !== "" &&
                        <button id="download-button" type="button" className="btn btn-outline-dark" onClick={saveSRT}><FiDownload /></button>}
                    <code>{formattedSubtitles}</code>
                </div>
            </div>
        </div>
    )
}

export default App
