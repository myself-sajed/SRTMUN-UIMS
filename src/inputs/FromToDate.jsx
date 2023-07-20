import React, { useState } from 'react';
import { useEffect } from 'react';

const FromToDate = ({ fromDate, setFromDate, setEndDate, endDate, active, space = "col-md-3" }) => {


    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        if (active) {
            setEndDate("Till Date")
        }
    }, [active])

    return (
        <>
            <div className={`form-group ${space}`}>
                <label htmlFor="fromDate" className='mb-2'>From Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="fromDate"
                    value={fromDate}
                    onChange={handleFromDateChange}
                />
            </div>

            {
                active ?
                    <div className={`form-group ${space}`}>
                        <label htmlFor="endDate" className='mb-2'>To</label>
                        <input
                            type="text"
                            className="form-control"
                            id="endDate"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div> :
                    <div className={`form-group ${space}`}>
                        <label htmlFor="endDate" className='mb-2'>To</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
            }


        </>


    );
};

export default FromToDate;
