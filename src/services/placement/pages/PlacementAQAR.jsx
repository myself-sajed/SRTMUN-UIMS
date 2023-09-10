import React from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { placementAuthParams } from './PlacementHome';

const PlacementAQAR = () => {
    title(siteLinks.placementAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.placementHome, siteLinks.placementAQAR]
    const user = useSelector((state) => state.user.placementUser)
    useOtherServiceAuth({ ...placementAuthParams, shouldNavigate: false })

    const AQARTables = [

    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div className="h-screen">
            <AQARStepper bredLinks={bredLinks} submitModel="PlacementAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.placementHome.link} >
                <TableAccordion AQARTables={AQARTables} />
            </AQARStepper>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default PlacementAQAR
