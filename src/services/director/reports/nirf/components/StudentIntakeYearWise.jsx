import React, { useState } from 'react';
import { academicYearGeneratorBackwards } from '../../../../../inputs/Year';
import ArrowButton from '../../../../../components/ArrowButton';
import { saveStudentIntake } from '../js/studentIntakeHandler';

const StudentIntakeYearWise = ({ program, schoolName, serverData, academicYear }) => {

    const academicYears = academicYearGeneratorBackwards(program.year, false, academicYear)

    const [programData, setProgramData] = useState(serverData[program.id] || {});

    const handleInputChange = (year, value) => {
        setProgramData((prevData) => ({
            ...prevData,
            [year]: value,
        }));
    };



    return <div className="my-3 border-2 rounded-md p-2">
        <p className="my-3 font-medium">{program.name}</p>
        <div className={`flex items-center justify-start gap-3`}>
            {academicYears.map((year) => {
                return <div className='w-28'>
                    <label className='text-sm font-medium ml-1'>{year}</label>
                    <input type="text"
                        className="form-control"
                        value={programData[year] || ''}
                        onChange={(e) => handleInputChange(year, e.target.value)}
                    />
                </div>
            })}
        </div>
        <ArrowButton className="mt-3" onClickFunction={() => saveStudentIntake(program.id, programData, schoolName)} title="Save Program Data" />
    </div>
}


export default StudentIntakeYearWise