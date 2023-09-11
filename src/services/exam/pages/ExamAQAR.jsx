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

    // other states
    const [resultFile, setResultFile] = useState(null)


    const AQARTables = [
        {
            title: "2.5.1 - Days from the date of last semester-end/ year- end examination till the declaration of  results during the year",
            component: <ResultDeclarationWithProof setResultFile={setResultFile} resultFile={resultFile} aqarYearState={aqarYearState} />
        },
        {
            title: "2.5.2 - Student complaints/grievances about evaluation against total number appeared in the examinations during the year ",
            component: <StudentComplaintWithProof filterByAcademicYear={aqarYearState} />
        },
        {
            title: "2.6.3 - Students passed during the year",
            component: <ExamPassedDuringYear filterByAcademicYear={aqarYearState} />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="ExamAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.examHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

                <Footer />
            </div>
        </div>
    )
}

export default ExamAQAR

const ResultDeclarationWithProof = ({ aqarYearState }) => {
    return <div>
        <TableSupportingProof />
        <DateOfResultDiclaration filterByAcademicYear={aqarYearState} />
    </div>
}

const StudentComplaintWithProof = ({ aqarYearState }) => {
    return <div>
        <TableSupportingProof />
        <DateOfResultDiclaration filterByAcademicYear={aqarYearState} />
    </div>
}


const TableSupportingProof = ({ file, setFile, title = "Upload a supporting / relevant document here for the table below  " }) => {
    return <div className="my-3">
        <label htmlFor="resultFile">{title}</label>
        <input onChange={(e) => setFile(() => e.target.files[0])} type="file" name="file" id="resultFile" className='form-control mt-1' />
    </div>
}


export { TableSupportingProof }


