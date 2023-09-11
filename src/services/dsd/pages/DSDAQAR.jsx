import React, { useState } from 'react'
import AQARStepper from '../components/AQARStepper'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import DsdAndSports from './DsdAndSports';
import SportsAndCulturalEvents from './SportsAndCulturalEvents';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { dsdAuthParams } from './DSDHome'



const DSDAQAR = () => {
    title(siteLinks.dsdAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome, siteLinks.dsdAQAR]
    const user = useSelector((state) => state.user.dsdUser)
    useOtherServiceAuth({ ...dsdAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "5.3.1 - Awards/medals won by students for outstanding performance in sports / cultural activities at Inter-university / State / National / International events (award for a team event should be counted as one) during the year",
            component: <DsdAndSports filterByAcademicYear={aqarYearState} />
        },
        {
            title: "5.3.3 - Information about Sports and cultural events / competitions organised by the institution during the year ",
            component: <SportsAndCulturalEvents filterByAcademicYear={aqarYearState} />
        }

    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="DSDAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.dsdHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default DSDAQAR
