const SubtitleItem = ({ ids, text, callback }) => {
    return (
        <>
            <div className="row align-items-center pb-2">
                <div className="col">
                    <small className="text-muted">{ids.join(", ")}</small>
                    <p>{text}</p>
                </div>
                <div className="col">
                    <textarea
                        onInput={e => callback(ids, e.target.value)}
                        className="form-control" rows="2"
                        placeholder={"Translate '" + text + "'"}></textarea>
                </div>
            </div>
        </>
    )
}

export default SubtitleItem
