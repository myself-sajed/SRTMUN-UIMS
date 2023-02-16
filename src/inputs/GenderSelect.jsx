import React from 'react'

const GenderSelect = ({ id, state, setState }) => {
    return (
        <select className="form-select" id={id} required onChange={(e) => { setState(e.target.value) }} value={state}>
            <option selected disabled value="">Choose</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>

        </select>
    )
}

export default GenderSelect