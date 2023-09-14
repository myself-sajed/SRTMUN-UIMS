import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { placementAuthParams } from './PlacementHome';
import CounselingAndGuidance from '../../director/pages/CounselingAndGuidance';
import Placements from '../../director/pages/Placements';
import ProgressionToHE from '../../director/pages/ProgressionToHE';

const PlacementAQAR = () => {
    title(siteLinks.placementAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.placementHome, siteLinks.placementAQAR]
    const user = useSelector((state) => state.user.placementUser)
    useOtherServiceAuth({ ...placementAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: '5.1.2 - Career Councelling & Guidance',
            component: <CounselingAndGuidance school={true} filterByAcademicYear={true} academicYear={aqarYearState} />
        },
        {
            title: '5.2.2 - Placements',
            component: <Placements school={true} filterByAcademicYear={true} academicYear={aqarYearState} />
        },
        {
            title: '5.1.3 - Progression to Higher Education',
            component: <ProgressionToHE school={true} filterByAcademicYear={true} academicYear={aqarYearState} />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="PlacementAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.placementHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default PlacementAQAR
