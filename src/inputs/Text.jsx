import React from 'react'

const Text = ({ state, setState, title, type = 'text', space = 'col-md-4' }) => {
    return (
        <div className={space}>
            <label htmlFor="validationCustom02" className="form-label">{title}</label>
            <input type={type} className="form-control" id="validationCustom02" dataDateFormat="mm-dd-yy" required value={state} onChange={(e) => { setState(e.target.value) }} />
        </div>
    )
}

export default Text