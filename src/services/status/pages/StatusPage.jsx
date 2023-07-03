import React from 'react'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { academicYearGenerator, listOfYears } from '../../../inputs/Year';
import fetchData from '../../dashboard/js/fetchData';
import TabBox from '../components/TabBox';
import SchoolList from '../components/SchoolList';
import FacultyRelatedService from '../components/FacultyRelatedService';
import DirectorRelatedService from '../components/DirectorRelatedService';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import GoBack from '../../../components/GoBack';
import { Avatar } from '@mui/material';
import serverLinks from '../../../js/serverLinks';


const StatusPage = ({ auth }) => {

    const { userType } = useParams()
    auth?.[userType]()

    // users
    const directorUser = useSelector((state) => state.user.directorUser)
    const adminUser = useSelector((state) => state.user.adminUser)

    const [value, setValue] = useState(0);
    const [year, setYear] = useState(academicYearGenerator(1)[0])
    const [school, setSchool] = useState(userType === 'director' ? directorUser?.department : `School of Computational Sciences`)

    const serviceName = {
        0: 'CAS',
        1: 'PBAS',
        2: 'Faculty AQAR',
        3: 'AAA',
        4: 'Director AQAR'
    }

    const param = { model: 'User', filter: { department: school && school } }
    const { data: teachers, isLoading: teacherLoading, refetch } = useQuery([param.model, param], () => fetchData(param))


    useEffect(() => {
        if (directorUser) {
            setSchool(directorUser?.department)
        }
    }, [directorUser])

    useEffect(() => {
        if (directorUser) {
            refetch()
        }
    }, [school])




    return (
        <div>

            <GoBack pageTitle={userType === 'director' ? `Report Status of ${directorUser?.department}` : `All School Report Status`} shouldScroll={true}>
                <Avatar src={userType ? serverLinks.showFile(directorUser?.photoURL, 'director') : null} />
            </GoBack>

            <div className='flex items-start justify-start mb-5'>

                {
                    userType === 'admin' && <div className='w-1/2'>
                        <SchoolList school={school} setSchool={setSchool} />
                    </div>

                }


                <div className='w-full border p-3 mt-3 rounded-[4px]'>
                    <TabBox value={value} setValue={setValue} />
                    <br />
                    <hr />

                    <div >

                        <div className={`ml-3 ${userType === 'director' && "pr-3"} w-full mt-3`}>
                            <div className='flex items-center justify-between pb-2'>
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
                </div>
            </div>



        </div >
    )
}

export default StatusPage





