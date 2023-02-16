import React from "react";

const YearSelect = ({ className = "col-md-6", id, label, setState, value, required = true }) => {

    let year = new Date().getFullYear();
    const ly = year - 29;
    let i = 1
    let arr = []
    for (year; year >= ly; year--) {
        let privyear = year.toString().slice(-2);
        let last = year - 1 + "-" + privyear;
        last = last.toString();

        arr.push(last)
        i++
    }

    return (
        <div className={`col-12 p-1 ${className}`}>
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
                } value={value}>
                <option selected disabled value="">Choose</option>
                {
                    arr?.map((e) => {
                        return <option value={e}>{e}</option>
                    })
                }
            </select>
        </div>
    )
}

export default YearSelect
