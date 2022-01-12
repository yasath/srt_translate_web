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
        <div className="container">
            <h1>srt_translate_web</h1>

            <input
                type="file"
                accept=".srt"
                onChange={e => handleFileChosen(e.target.files[0])}
            />

            <p>{loadedSubtitles}</p>
        </div>
    )
}

export default App
