import { useState } from "react";

const App = () => {
    let fileReader;
    const [loadedSubtitles, setLoadedSubtitles] = useState("")

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setLoadedSubtitles(content);
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
                    <p>{loadedSubtitles}</p>
                </div>
            </div>
        </div>
    )
}

export default App
