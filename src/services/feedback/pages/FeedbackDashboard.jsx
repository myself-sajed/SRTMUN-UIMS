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




const FeedbackDashboard = () => {
    title('Feedback Dashboard')
    useDirectorAuth()
    const directorUser = useSelector((state) => state.user.directorUser)


    let param = { filter: { schoolName: directorUser?.department } }

    const { data, isLoading, refetch } = useQuery([param.model, param], () => getFeedbackData(param))


    return (
        <div>
            <GoBack pageTitle="Feedback Response" />

            <div className="mt-4">
                <DashboardHeroSection countData={data?.data?.data} isLoading={isLoading} />
            </div>
            <div className="my-5">
                <StudentAnalysis studentData={data?.data?.data?.Student} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default FeedbackDashboard


