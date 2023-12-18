import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setPGUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import AdminPhdAwarded from '../../admin/tables/AdminPhdAwarded'
import AdminHE from '../../admin/tables/AdminHE'
import AdminDemandRatio from '../../admin/tables/AdminDemandRatio'
import AdminResearchGuide from '../../admin/tables/AdminResearchGuide'

const pgAuthParams = { shouldNavigate: true, tokenName: "pg-token", setUser: setPGUser, navigationHomeLink: siteLinks.pgHome.link, navigationLoginLink: siteLinks.pgLogin.link, model: "PGUser" }

const PGHome = () => {
    useOtherServiceAuth(pgAuthParams)
    const user = useSelector((state) => state.user.pgUser)
    const bredLinks = [siteLinks.welcome, siteLinks.pgHome]
    title(siteLinks.pgHome.title)

    const tables = [
        {
            title: "Ph.D. Scholars",
            component: <AdminPhdAwarded />
        },
        {
            title: "Research Guidance",
            component: <AdminResearchGuide />
        },
        {
            title: "Progression to Higher Education",
            component: <AdminHE />
        },
        {
            title: "Demand Ratio",
            component: <AdminDemandRatio />
        },
    ]
    return (
        <div>
            <GoBack bredLinks={bredLinks} pageTitle={siteLinks.pgHome.title} />
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

export default PGHome

export { pgAuthParams }
