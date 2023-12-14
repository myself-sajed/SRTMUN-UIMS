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
import IILScopusWebOfScience from '../components/IILScopusWebOfScience';
import MoUs from '../../director/pages/MoUs';
import Awards from '../../director/pages/Awards';
import ResearchMethodologyWorkshops from '../../director/pages/ResearchMethodologyWorkshops';
import IILRevenueConsultancy from '../components/IILRevenueConsultancy';
import IILRevenueCorporateTraining from '../components/IILRevenueCorporateTraining';
import IILCollaborativeActivities from '../components/IILCollaborativeActivities';
import AQARTextMatter from '../../aqar-naac/components/AQARTextMatter';
import AQARTextInfo from '../../aqar-naac/components/AQARTextInfo';



const IILAQAR = () => {
    title(siteLinks.iilAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.iilHome, siteLinks.iilAQAR]
    const user = useSelector((state) => state.user.iilUser)
    useOtherServiceAuth({ ...iilAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {

            title: "3.3.1 - Institution has created an eco-system for innovations including Incubation centre and other initiatives for creation and transfer of knowledge",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '3.3.1', userType: 'iil', school: "IIL"
            },
            component: <AQARTextMatter academicYear={aqarYearState} school="IIL" matterType='3.3.1' userType='iil' />
        },
        {
            title: '3.3.2 - Number of workshops/seminars conducted on Research Methodology, Intellectual Property Rights (IPR), Entrepreneurship and Skill Development during the year',
            component: <ResearchMethodologyWorkshops school={true} academicYear={aqarYearState} filterByAcademicYear={true} />
        },
        {
            title: '3.3.3 - Number of awards / recognitions received for research/innovations by the institution/teachers/research scholars/students during the year',
            component: <Awards school={true} academicYear={aqarYearState} filterByAcademicYear={true} />
        },
        {
            id: "3.4.8",
            title: "3.4.8 - Bibliometrics of the publications during the year based on average Citation Index in Scopus/ Web of Science/PubMed",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '3.4.8', userType: 'iil', school: "IIL"
            },
            component: <AQARTextInfo
                tableInfo={[
                    { head: 'Scopus', cell: 'scopus' },
                    { head: 'Web of Science', cell: 'wos' },
                ]}
                academicYear={aqarYearState} tableId="3.4.8" school="IIL"
            />
        },
        {
            id: "3.4.9",
            title: "3.4.9 - Bibliometrics of the publications during the year based on Scopus/ Web of Science – h-Index of the University",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '3.4.9', userType: 'iil', school: "IIL"
            },
            component: <AQARTextInfo
                tableInfo={[
                    { head: 'Scopus', cell: 'scopus' },
                    { head: 'Web of Science', cell: 'wos' },
                ]}
                academicYear={aqarYearState} tableId="3.4.9" school="IIL"
            />

        },
        {
            title: '3.5.2 (A) - Revenue generated from consultancy training during the year (INR in Lakhs)',
            component: <IILRevenueConsultancy filterByAcademicYear={aqarYearState} />
        },
        {
            title: '3.5.2 (B) - Revenue generated corporate training during the year (INR in Lakhs)',
            component: <IILRevenueCorporateTraining filterByAcademicYear={aqarYearState} />
        },
        {
            title: '3.7.1 - Number of collaborative activities with other institutions/ research establishment/industry for research and academic development of faculty and students during the year',
            component: <IILCollaborativeActivities filterByAcademicYear={aqarYearState} />
        },
        {
            title: '3.7.2 - Number of functional MoUs with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the year',
            component: <MoUs school={true} academicYear={aqarYearState} filterByAcademicYear={true} />
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




