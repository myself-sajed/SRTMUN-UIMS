import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { iilAuthParams } from './IILHome';
import IncubationDetails from '../components/IncubationDetails';



const IILAQAR = () => {
    title(siteLinks.iilAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.iilHome, siteLinks.iilAQAR]
    const user = useSelector((state) => state.user.iilUser)
    useOtherServiceAuth({ ...iilAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: '3.3.1 - Institution has as created an eco-system for innovations including Incubation centre and other initiatives for creation and transfer of knowledge',
            component: <IncubationDetails academicYear={aqarYearState} />
        },
        {
            title: '3.3.2 - Number of workshops/seminars conducted on Research Methodology, Intellectual Property Rights (IPR), Entrepreneurship and Skill Development during the year'
        },
        {
            title: '3.3.3 - Number of awards / recognitions received for research/innovations by the institution/teachers/research scholars/students during the year'
        },
        {
            title: '3.4.8 - Bibliometrics of the publications during the year based on average Citation Index in Scopus Web of Science / PubMed'
        },
        {
            title: '3.4.9 - Bibliometrics of the publications during the year based on Scopus / Web of Science - h-Index of the University'
        },
        {
            title: '3.5.2 - Revenue generated from consultancy and corporate training during the year (INR in Lakhs)'
        },
        {
            title: '3.7.1 - Number of collaborative activities with other institutions/ research establishment/industry for research and academic development of faculty and students during the year'
        },
        {
            title: '3.7.2 - Number of functional MoUs with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the year'
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="IILAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.iilHome.link} >

                    <TableAccordion AQARTables={AQARTables} showIndex={false} />

                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default IILAQAR




