import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import { sportsAuthParams } from './SportsHome'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import DsdAndSports from '../../dsd/pages/DsdAndSports';
import SportsAndCulturalEvents from '../../dsd/pages/SportsAndCulturalEvents';
import AQARStepper from '../../dsd/components/AQARStepper';



const SportsAQAR = () => {
    title(siteLinks.sportsAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.sportsHome, siteLinks.sportsAQAR]
    const user = useSelector((state) => state.user.sportsUser)
    useOtherServiceAuth({ ...sportsAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "5.3.1 - Awards/medals won by students for outstanding performance in sports / cultural activities at Inter-university / State / National / International events (award for a team event should be counted as one) during the year",
            component: <DsdAndSports userType='sports' filterByAcademicYear={aqarYearState} />
        },
        {
            title: "5.3.3 - Information about Sports and cultural events / competitions organised by the institution during the year ",
            component: <SportsAndCulturalEvents userType='sports' filterByAcademicYear={aqarYearState} />
        }

    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="SportsAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.sportsHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

                <Footer />
            </div>
        </div>
    )
}

export default SportsAQAR
