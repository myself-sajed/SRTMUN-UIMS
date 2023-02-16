import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAuth from '../../../hooks/useAuth'
import Header from '../cas-report/Header'
import Tables from './Tables'
import Axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'


const FacultyReport = () => {
    const [academicData, setAcademicData] = useState(null)
    const { userId, otherOptions } = useParams()


    // get all the academic data for tables
    useEffect(() => {

        if (userId) {
            console.log('Custom Options :', JSON.parse(otherOptions))
            const URL = `${process.env.REACT_APP_MAIN_URL}/api/getAllData`
            Axios.post(URL, { userId, fetchYears: 'all' })
                .then((res) => {
                    res.data.status = 'success' ? setAcademicData(res.data.data) : setAcademicData(null)
                }).catch((err) => {
                    return 'Something went wrong...'
                })
        }

    }, [userId])

    return (
        (academicData) && <div>
            <Header user={academicData.user} title="Faculty Report" subTitle={null} directorData={academicData} otherOptions={JSON.parse(otherOptions)} userType="faculty" />
            <Tables academicData={academicData} showProof={true} otherOptions={JSON.parse(otherOptions)} />
        </div>
    )
}

export default FacultyReport