const SubtitleItem = ({ ids, text }) => {
    return (
        <>
            <div className="row align-items-center pb-2">
                <div className="col">
                    <small className="text-muted">{ids.join(", ")}</small>
                    <p>{text}</p>
                </div>
                <div className="col">
                    <textarea
                        className="form-control" rows="2"
                        placeholder={"Translate '" + text + "'"}></textarea>
                </div>
            </div>
        </>
    )
}

export default SubtitleItem
