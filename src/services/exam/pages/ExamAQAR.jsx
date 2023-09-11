import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { examAuthParams } from './ExamHome';
import DateOfResultDiclaration from './DateOfResultDiclaration';
import StudentComplaintsGrievances from './StudentComplaintsGrievances';
import ExamPassedDuringYear from './ExamPassedDuringYear';



const ExamAQAR = () => {
    title(siteLinks.examAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.examHome, siteLinks.examAQAR]
    const user = useSelector((state) => state.user.examUser)
    useOtherServiceAuth({ ...examAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "[2.5.1] Days from the date of last semester-end/ year- end examination till the declaration of  results during the year",
            component: <DateOfResultDiclaration filterByAcademicYear={aqarYearState} />
        },
        {
            title: "[2.5.2] Student complaints/grievances about evaluation against total number appeared in the examinations during the year ",
            component: <StudentComplaintsGrievances filterByAcademicYear={aqarYearState} />
        },
        {
            title: "[2.6.3] Students passed during the year",
            component: <ExamPassedDuringYear filterByAcademicYear={aqarYearState} />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div className="h-screen">
            <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="ExamAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.examHome.link} >
                <TableAccordion AQARTables={AQARTables} />
            </AQARStepper>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default ExamAQAR
