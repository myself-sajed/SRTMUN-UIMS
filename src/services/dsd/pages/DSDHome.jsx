import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setDSDUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import HomeProfile from '../components/HomeProfile'
import HomeProfileButtons from '../components/HomeProfileButtons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserLoading from '../../../pages/UserLoading'
import title from '../../../js/title'
import Footer from '../../../components/Footer'

const dsdAuthParams = { shouldNavigate: true, tokenName: "dsd-token", setUser: setDSDUser, navigationHomeLink: siteLinks.dsdHome.link, navigationLoginLink: siteLinks.dsdLogin.link, model: "DSDUser" }


const DSDHome = () => {
    useOtherServiceAuth(dsdAuthParams)
    const user = useSelector((state) => state.user.dsdUser)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.dsdAQAR.link)} />
    title(siteLinks.dsdHome.title)
    return (
        <div>
            <div className="min-h-screen">
                {user ?
                    <HomeProfile bredLinks={bredLinks} user={user} setUser={setDSDUser} userType="dsd" profileButton1={profileButton1} tokenName="dsd-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default DSDHome

export { dsdAuthParams }

