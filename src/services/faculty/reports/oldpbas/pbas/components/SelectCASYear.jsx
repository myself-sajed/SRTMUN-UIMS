import React, { useEffect } from 'react'
import { DatePicker, Space } from 'antd';
import Year from '../../../../../inputs/Year';
import { useState } from 'react';
import dayjs from 'dayjs';

const SelectCASYear = ({ casYearState, setCasYearState }) => {

    return (
        <div className='w-full'>



            {/* // Choose years */}
            <div className='mx-auto flex items-center justify-center'>
                <Year state={casYearState} setState={setCasYearState} space='col-md-3'
                    title="Choose Academic Year" numberOfYearsToDisplay={6} />
            </div>


        </div>
    )
}

export default SelectCASYear