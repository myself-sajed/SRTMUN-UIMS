import React from 'react'

function Select({ className = "col-md-6", id, label, setState, value, required = true, options, select, desable=false }) {
    return (
        <div className={`col-12 p-1 ${className} text-sm md:text-base`}>
            <label htmlFor="choose" className="form-label" >{label}</label>
            <select className="form-select" id={id} required={required}
                onChange={(e) => {
                    setState((pri) => {
                        return {
                            ...pri,
                            [id]: e.target.value
                        }
                    })
                }
                } value={value} disabled={desable}>

                <option selected disabled value="">Choose</option>

                {
                    options?.map((e) => {
                        // const select = selected === e ? true : false;
                        return <option value={e} >{e}</option>
                    })
                }
            </select>
        </div>
    )
}
export default Select
