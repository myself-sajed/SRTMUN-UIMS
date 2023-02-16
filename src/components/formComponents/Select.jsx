import React from 'react'

function Select({ className = "col-md-6", id, label, setState, value, required = true, options }) {
    return (
        <div className={`col-12 p-1 ${className}`}>
            <label htmlFor="choose" className="form-label" >{label}</label>
            <select className="form-select" id={id} required={required}
                onChange={(e) => {
                    console.log(e.target.value);
                    setState((pri) => {
                        return {
                            ...pri,
                            [id]: e.target.value
                        }
                    })
                }
                } value={value}>
                <option selected disabled value="">Choose</option>
                {
                    options?.map((e) => {
                        return <option value={e}>{e}</option>
                    })
                }
            </select>
        </div>
    )
}
export default Select
