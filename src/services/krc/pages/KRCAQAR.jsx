import React from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { krcAuthParams } from './KRCHome';
import SubscriptionForKRC from './SubscriptionForKRC';



const KRCAQAR = () => {
    title(siteLinks.krcAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.krcHome, siteLinks.krcAQAR]
    const user = useSelector((state) => state.user.krcUser)
    useOtherServiceAuth({ ...krcAuthParams, shouldNavigate: false })

    const AQARTables = [
        {
            title: "[4.2.3] Annual expenditure for purchase of books/ e-books and subscription to journals/e-journals during the year(INR in Lakhs)",
            component: <SubscriptionForKRC />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div className="h-screen">
            <AQARStepper bredLinks={bredLinks} submitModel="KRCAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.krcHome.link} >
                <TableAccordion AQARTables={AQARTables} />
            </AQARStepper>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default KRCAQAR
