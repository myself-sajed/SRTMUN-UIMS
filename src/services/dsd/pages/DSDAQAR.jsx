import React from 'react'
import AQARStepper from '../components/AQARStepper'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import DsdAndSports from './DsdAndSports';
import SportsAndCulturalEvents from './SportsAndCulturalEvents';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';


const DSDAQAR = () => {
    title(siteLinks.dsdAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome, siteLinks.dsdAQAR]

    const AQARTables = [
        {
            title: "DSD",
            component: <DsdAndSports />
        },
        {
            title: "Sports culture",
            component: <SportsAndCulturalEvents />
        }

    ]

    return (
        <div className="h-screen">
            <AQARStepper bredLinks={bredLinks}>
                <TableAccordion AQARTables={AQARTables} />
            </AQARStepper>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default DSDAQAR
