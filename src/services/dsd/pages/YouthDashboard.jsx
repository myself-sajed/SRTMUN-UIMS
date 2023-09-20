import React from 'react'
import GoBack from '../../../components/GoBack'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { dsdAuthParams } from './DSDHome'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import Footer from '../../../components/Footer'

const YouthDashboard = () => {
    useOtherServiceAuth({ ...dsdAuthParams, shouldNavigate: false })
    title(siteLinks.dsdDashboard.title)
    const user = useSelector((state) => state.user?.dsdUser)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome, siteLinks.dsdDashboard]
    return (
        <div>
            <GoBack pageTitle="Youth Festival Dashboard for DSD" bredLinks={bredLinks} showAvatar={{ photoURL: user?.photoURL, userType: 'dsd' }} />

            <div className='animate-fade-up animate-once min-h-screen bg-blue-50 rounded-md mt-4'>

            </div>

            <Footer />
        </div>
    )
}

export default YouthDashboard
