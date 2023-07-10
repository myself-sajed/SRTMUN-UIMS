import React from 'react'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { academicYearGenerator, listOfYears } from '../../../inputs/Year';
import fetchData from '../../dashboard/js/fetchData';
import TabBox from '../components/TabBox';
import SchoolList from '../components/SchoolList';
import FacultyRelatedService from '../components/FacultyRelatedService';
import DirectorRelatedService from '../components/DirectorRelatedService';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import GoBack from '../../../components/GoBack';
import { Avatar } from '@mui/material';
import serverLinks from '../../../js/serverLinks';
import UnderConstruction from '../../../pages/UnderConstruction';


const StatusPage = ({ auth, user }) => {

    auth?.[user || 'director']()

    // users
    const directorUser = useSelector((state) => state.user.directorUser)

    const [year, setYear] = useState(academicYearGenerator(1)[0])
    const [school, setSchool] = useState(!user ? directorUser?.department : null)


    useEffect(() => {
        if (directorUser) {
            setSchool(directorUser?.department)
        }
    }, [directorUser])




    return (
        <div>

            {!user && <GoBack pageTitle={!user ? `Report Status of ${directorUser?.department}` : `All School Report Status`} shouldScroll={true}>
                <Avatar src={!user ? serverLinks.showFile(directorUser?.photoURL, 'director') : null} />
            </GoBack>}



            <div className={`flex items-start justify-start mb-5 ${!user && "mt-4"}`}>
                <div className='w-full rounded-[4px]'>
                    <div className='w-full'>

                        <div className="col-md-4 flex items-center justify-end w-full">
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
                        <div className={`w-full mt-3`}>
                            <FacultyRelatedService year={year} user={user ? user : false} school={user ? false : school} />
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default StatusPage





