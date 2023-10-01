import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setAPDSUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import AdminJRFSRF from '../../admin/tables/AdminJRFSRF'

const apdsAuthParams = { shouldNavigate: true, tokenName: "apds-token", setUser: setAPDSUser, navigationHomeLink: siteLinks.apdsHome.link, navigationLoginLink: siteLinks.apdsLogin.link, model: "APDSUser" }

const APDSHome = () => {
    useOtherServiceAuth(apdsAuthParams)
    const user = useSelector((state) => state.user.apdsUser)
    const bredLinks = [siteLinks.welcome, siteLinks.apdsHome]
    title(siteLinks.apdsHome.title)

    const tables = [
        {
            title : "JRF, SRF, Post Doctoral Fellows, Research Associate",
            component : <AdminJRFSRF/>
        }
    ]
    return (
        <div>
            <GoBack bredLinks={bredLinks} pageTitle={siteLinks.apdsHome.title} />
            <div className="min-h-screen">

                {user ?
                    <div>
                        <TableAccordion AQARTables={tables} />
                    </div>
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default APDSHome

export { apdsAuthParams }
