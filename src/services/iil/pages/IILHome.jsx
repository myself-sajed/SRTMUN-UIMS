import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setIILUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import HomeProfile from '../../dsd/components/HomeProfile'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'

const iilAuthParams = { shouldNavigate: true, tokenName: "iil-token", setUser: setIILUser, navigationHomeLink: siteLinks.iilHome.link, navigationLoginLink: siteLinks.iilLogin.link, model: "IILUser" }

const IILHome = () => {
    useOtherServiceAuth(iilAuthParams)
    const user = useSelector((state) => state.user.iilUser)
    const bredLinks = [siteLinks.welcome, siteLinks.iilHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.iilAQAR.link)} />
    title(siteLinks.iilHome.title)
    return (
        <div>
            <div className="min-h-screen">

                {user ?
                    <HomeProfile bredLinks={bredLinks} user={user} setUser={setIILUser} userType="iil" profileButton1={profileButton1} tokenName="iil-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default IILHome

export { iilAuthParams }
