import React from 'react'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { getFeedbackData } from '../js/getFeedbackData';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import DashboardHeroSection from '../components/DashboardHeroSection';
import StudentAnalysis from '../analysis/StudentAnalysis';
import { useState } from 'react';
import { academicYearGenerator, listOfYears } from '../../../inputs/Year';




const FeedbackDashboard = () => {
    title('Feedback Dashboard')
    useDirectorAuth()
    const directorUser = useSelector((state) => state.user.directorUser)

    const [academicYear, setAcademicYear] = useState(academicYearGenerator(1)[0])

    let param = { filter: { schoolName: directorUser?.department, academicYear } }

    const { data, isLoading, refetch } = useQuery([param.model, param], () => getFeedbackData(param))


    return (
        <div>
            <GoBack pageTitle="Feedback Response" />

            <div className="my-2">
                <div className="col-md-4 flex items-center justify-end w-full">
                    <div>
                        <select className="form-select" id="validationCustom04" required onChange={
                            (e) => { setAcademicYear(e.target.value); }} value={academicYear}>
                            <option selected disabled value="">Choose</option>

                            {listOfYears.map((academicYear, index) => {
                                return <option key={index} value={academicYear}>{academicYear}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <DashboardHeroSection countData={data?.data?.data} isLoading={isLoading} year={academicYear} />
            </div>
            <div className="my-5">
                <StudentAnalysis studentData={data?.data?.data?.Student} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default FeedbackDashboard


