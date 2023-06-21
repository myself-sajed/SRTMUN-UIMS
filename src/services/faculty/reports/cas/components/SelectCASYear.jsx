import React, { useEffect } from 'react'
import { DatePicker, Space } from 'antd';
import Year from '../../../../../inputs/Year';
import { useState } from 'react';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const SelectCASYear = ({ casYearState, setCasYearState, firstYear, setFirstYear, lastYear, setLastYear, casDate, setCasDate }) => {
    const [normalDuration, setNormalDuration] = useState(null)
    const [currentYear, setCurrentYear] = useState(null)
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const [dateInfo, setDateInfo] = useState({ wholeYear: null, startYearCount: null, lastYearCount: null })

    useEffect(() => {
        if (casYearState) {
            let wholeYear = casYearState.toString().slice(0, -3)
            let startYearCount = casYearState.toString().slice(0, -5)
            let lastYearCount = casYearState.toString().slice(5)
            let duration = `1st July ${wholeYear} to 30th June ${startYearCount}${lastYearCount}`
            setDateInfo({ wholeYear, startYearCount, lastYearCount })
            setCurrentYear(wholeYear)
            setNormalDuration(duration)
        }
    }, [casYearState])

    useEffect(() => {
        if (firstYear && lastYear) {

            // user cas duration
            let date = `${firstYear?.day} ${firstYear?.month} ${dateInfo?.wholeYear} to ${lastYear?.day} ${lastYear?.month} ${dateInfo?.startYearCount}${dateInfo?.lastYearCount}`



            setCasDate(() => {
                return { casDuration: date, firstYear, lastYear, academicYear: casYearState }
            })

        }
    }, [firstYear, lastYear, dateInfo])



    return (
        <div className='w-full'>


            {
                normalDuration && <div className="mx-auto col-md-4 text-center p-2 rounded-md bg-blue-100 text-blue-800 mb-4">
                    <div>
                        <strong>{normalDuration}</strong>
                    </div>
                </div>
            }

            {/* // Choose years */}
            <div className='mx-auto flex items-center justify-center'>
                <Year state={casYearState} setState={setCasYearState} space='col-md-3'
                    title="Choose Academic Year" numberOfYearsToDisplay={9} />
            </div>



            {
                normalDuration &&
                <div className="mt-5">
                    <label htmlFor="casDate" className="form-label" >Choose your CAS Duration</label>
                    <div id="casDate" className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-1'>
                            <div>
                                <select value={firstYear?.day} className="form-select" id="validationCustom04" onChange={(e) => {
                                    setFirstYear({ ...firstYear, day: e.target.value })
                                }} required>
                                    <option selected disabled value="">Day</option>

                                    {[...Array(31)].map((day, index) => {
                                        return <option key={index} value={index + 1}>{index + 1}</option>
                                    })}

                                </select>
                            </div>
                            <div>
                                <select value={firstYear?.month} className="form-select" id="validationCustom04" required onChange={(e) => {
                                    setFirstYear({ ...firstYear, month: e.target.value })
                                }}>
                                    <option selected disabled value="">Month</option>

                                    {months.map((month, index) => {
                                        return <option key={index} value={month}>{month}</option>
                                    })}

                                </select>
                            </div>
                            <div>
                                <input type="text" value={currentYear && currentYear} disabled className="form-control" size={1} />
                            </div>
                        </div>
                        <span className="font-bold mx-3">to</span>
                        <div className='flex items-center justify-center gap-1'>
                            <div>
                                <select value={lastYear?.day} className="form-select" id="validationCustom04" required onChange={(e) => {
                                    setLastYear({ ...lastYear, day: e.target.value })
                                }} >
                                    <option selected disabled value="">Day</option>

                                    {[...Array(31)].map((day, index) => {
                                        return <option key={index} value={index + 1}>{index + 1}</option>
                                    })}

                                </select>
                            </div>
                            <div>
                                <select value={lastYear?.month} className="form-select" id="validationCustom04" required onChange={(e) => {
                                    setLastYear({ ...lastYear, month: e.target.value })
                                }}>
                                    <option selected disabled value="">Month</option>

                                    {months.map((month, index) => {
                                        return <option key={index} value={month}>{month}</option>
                                    })}

                                </select>
                            </div>
                            <div>
                                <input type="text" value={currentYear && parseInt(currentYear) + 1} disabled className="form-control" size={1} />
                            </div>
                        </div>
                    </div>
                </div>

            }




        </div>
    )
}

export default SelectCASYear