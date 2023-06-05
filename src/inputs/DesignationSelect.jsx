import React from 'react'

const designations = ['Assistant Professor', 'Associate Professor', "Professor", "Professor & Director", "Senior Professor"]

const DesignationSelect = ({ id, state, setState }) => {
    return (
        <select className="form-select" id={id} required
            value={state} onChange={(e) => { setState(e.target.value) }}>
            <option selected disabled value="">Choose</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
            <option value="Professor & Director">Professor & Director</option>
            <option value="Senior Professor">Senior Professor</option>
        </select>
    )
}

export default DesignationSelect

export { designations }