import React from 'react'
import { Years } from '../services/faculty/js/TableInfo'

const Year = ({ space = 'col-md-2', state, setState, title = "Choose Year", numberOfYearsToDisplay = 30, showCurrentYear = true }) => {

    // generate years
    let now;
    if (showCurrentYear) {
        now = new Date().getUTCFullYear();
    } else {
        now = new Date().getUTCFullYear() - 1
    }


    const arrayOfYears = Array(now - (now - numberOfYearsToDisplay)).fill('').map((v, idx) => `${now - (idx + 1)}-${(now - idx).toString().slice(2, 4)}`);

    return (
        <div className={space}>
            <label htmlFor="validationCustom04" className="form-label" >{title}</label>
            <select className="form-select" id="validationCustom04" required onChange={(e) => { setState(e.target.value) }} value={state}>
                <option selected disabled value="">Choose</option>

                {arrayOfYears.map((year, index) => {
                    return <option key={index} value={year}>{year}</option>
                })}


            </select>


        </div>

    )
}

export default Year

const currentDate = new Date().getUTCFullYear();
const listOfYears = Array(currentDate - (currentDate - 30)).fill('').map((v, idx) => `${currentDate - (idx + 1)}-${(currentDate - idx).toString().slice(2, 4)}`);

export { listOfYears }

const academicYearGenerator = (numberOfYearsToDisplay, showCurrentYear = true) => {
    // generate years
    let now;
    if (showCurrentYear) {
        now = new Date().getUTCFullYear();
    } else {
        now = new Date().getUTCFullYear() - 1
    }


    const arrayOfYears = Array(now - (now - numberOfYearsToDisplay)).fill('').map((v, idx) => `${now - (idx + 1)}-${(now - idx).toString().slice(2, 4)}`);

    return arrayOfYears
}

export { academicYearGenerator }