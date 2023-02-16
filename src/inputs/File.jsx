import React from 'react'

const File = ({ setState, title, space }) => {
    return (
        <div className={space}>
            <label htmlFor="inputGroupFile01" className="form-label">{title}</label>
            <input type="file" name="file" onChange={(e) => { setState(e.target.files[0]); }} className="form-control" id="inputGroupFile01" />
        </div>
    )
}

export default File