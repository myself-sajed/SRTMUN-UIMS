import React from 'react'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { listOfYears } from '../../../inputs/Year';
import fetchData from '../../dashboard/js/fetchData';
import TabBox from '../components/TabBox';
import SchoolList from '../components/SchoolList';
import FacultyRelatedService from '../components/FacultyRelatedService';
import DirectorRelatedService from '../components/DirectorRelatedService';


const StatusPage = () => {
    const [value, setValue] = useState(0);
    const [year, setYear] = useState('2020-21')
    const [school, setSchool] = useState('School of Computational Sciences')

    const serviceName = {
        0: 'CAS',
        1: 'PBAS',
        2: 'Faculty AQAR',
        3: 'AAA',
        4: 'Director AQAR'
    }

    const param = { model: 'User', filter: { department: school } }
    const { data: teachers, isLoading: teacherLoading } = useQuery([param.model, param], () => fetchData(param))


    return (
        <div className='mt-2'>

            <TabBox value={value} setValue={setValue} />

            <div className='flex items-start justify-start my-5'>
                <SchoolList school={school} setSchool={setSchool} />

                <div className='rounded-[4px] ml-3 p-3 w-full mt-3 border'>
                    <div className='flex items-center justify-between pb-2 border-b'>
                        <p className='text-lg'>{school} </p>
                        <div className={`${value === 3 || value === 4 ? 'hidden p-2' : 'block'}`}>
                            <div>
                                <select className="form-select" id="validationCustom04" required onChange={
                                    (e) => { setYear(e.target.value); }} value={year}>
                                    <option selected disabled value="">Choose</option>

                                    {listOfYears.map((year, index) => {
                                        return <option key={index} value={year}>{year}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    {
                        (value === 0 || value === 1 || value === 2)
                            ?
                            <FacultyRelatedService teachers={teachers} teacherLoading={teacherLoading} serviceName={serviceName[value]} year={year} school={school} />
                            :
                            <DirectorRelatedService serviceName={serviceName[value]} year={year} school={school} />
                    }
                </div>
            </div>



        </div >
    )
}

export default StatusPage





