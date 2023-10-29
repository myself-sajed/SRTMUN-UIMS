import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setESTTUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'

const esttAuthParams = { shouldNavigate: true, tokenName: "estt-token", setUser: setESTTUser, navigationHomeLink: siteLinks.esttHome.link, navigationLoginLink: siteLinks.esttLogin.link, model: "ESTTUser" }

const ESTTHome = () => {
    useOtherServiceAuth(esttAuthParams)
    const user = useSelector((state) => state.user?.esttUser)
    const bredLinks = [siteLinks.welcome, siteLinks.esttHome]
    title(siteLinks.esttHome.title)

    // const tables = [
    //     {
    //         title: "Ph.D. Scholars",
    //         component: <AdminPhdAwarded />
    //     },
    //     {
    //         title: "Research Guidance",
    //         component: <AdminResearchGuide />

    //     },
    //     {
    //         title: "Progression to Higher Education",
    //         component: <AdminHE />
    //     },
    //     {
    //         title: "Demand Ratio",
    //         component: <AdminDemandRatio />
    //     },
    // ]
    return (
        <div>
            <GoBack bredLinks={bredLinks} pageTitle={siteLinks.esttHome.title} />
            <div className="min-h-screen">

                {user ?
                    <div>
                        {/* <TableAccordion AQARTables={tables} /> */}
                        <p>Tables are here...</p>
                    </div>
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default ESTTHome

export { esttAuthParams }
