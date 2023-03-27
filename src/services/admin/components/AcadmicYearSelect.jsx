import React from 'react'
import { Select } from 'antd'

const AcadmicYearSelect = ({ className = "col-md-6", id, label, setState, value, required = true }) => {

    let year = new Date().getFullYear();
    const ly = year - 29;
    let i = 1
    let options = []
    for (year; year >= ly; year--) {
        let privyear = year.toString().slice(-2);
        let last = year - 1 + "-" + privyear;
        last = last.toString();

        options.push({value:last})
        i++
    }
    // console.log(options)
    const selectProps = {
      mode: "multiple",
      id,
      style: {
        width: "100%",
      },
      value,
      options,
      onChange: (newValue) => {
        setState((pri) => {
                            return {
                                ...pri,
                                [id]: newValue
                            }
                        });
      },
      placeholder: "Select Years...",
      maxTagCount: "responsive"
    };

    return (
        <div className={`col-12 p-1 ${className}`}>
            <label htmlFor="choose" className="form-label" >{label}</label>
            <Select {...selectProps} />
        </div> 
    )
}
export default AcadmicYearSelect

 // <div className={`col-12 p-1 ${className}`}>
        //     <label htmlFor="choose" className="form-label" >{label}</label>
        //     <select className="form-select" id={id} required={required}
        //         onChange={(e) => {
        //             setState((pri) => {
        //                 return {
        //                     ...pri,
        //                     [id]: e.target.value
        //                 }
        //             })
        //         }
        //         } value={value}>
        //         <option value="">All Years</option>
        //         {
        //             arr?.map(e => <option value={e}>{e}</option>)
        //         }
        //     </select>
        // </div>