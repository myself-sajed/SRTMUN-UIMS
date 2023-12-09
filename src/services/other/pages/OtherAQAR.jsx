import React, { useEffect, useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import AQARStepper from '../../dsd/components/AQARStepper';
import TotalExpenditure from './TotalExpenditure';
import OtherDemandRatio from './OtherDemandRatio';
import { TableSupportingProof } from '../../exam/pages/ExamAQAR';
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../krc/js/uploadSupportingDocument';
import { useQuery } from 'react-query';
import ArrowButton from '../../../components/ArrowButton';
import Scholarship from './Scholarship';
import MaintenanceAndInfrastructure from './MaintenanceAndInfrastructure';
import IQACInstitutionQualityAssurance from './IQACInstitutionQualityAssurance';



const OtherAQAR = () => {
    title(siteLinks.otherAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.otherAQAR]
    const user = { department: "Expenditure and Demand Ratio" }
    const [aqarYearState, setAqarYearState] = useState(null)



    const AQARTables = [
        {
            title: "2.1.1 - Demand Ratio",
            component: <OtherDemandRatio filterByAcademicYear={aqarYearState} />
        },
        {
            title: "4.1.4 - Total Expenditure (FAO)",
            component: <Expenditure aqarYearState={aqarYearState} />
        },
        {
            title: "5.1.1 - students receiving scholarships",
            component: <Scholarship />
        },
        {
            title: "6.4.2 - Infrastructure and Maintenance Fundings",
            component: <MaintenanceAndInfrastructure />
        },
        {
            title: "6.5.2 - Institution adopted Quality assurance",
            component: <IQACInstitutionQualityAssurance/>
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="OtherAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={'/'} >

                    <TableAccordion AQARTables={AQARTables} showIndex={false} />

                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default OtherAQAR


const Expenditure = ({ aqarYearState }) => {
    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear: aqarYearState, userType: 'expenditure', proofType: 'TotalExpenditure' }
    const { data, isLoading, refetch } = useQuery(`TotalExpenditure-${aqarYearState}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'expenditure')
        formData.append('proofType', 'TotalExpenditure')
        formData.append('academicYear', aqarYearState)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setProof(data?.data?.data?.proof)
        }
    }, [data])
    return <div>
        <div className="bg-gray-50 rounded-md p-3 mt-3 border">
            <TableSupportingProof setFile={setFile} proof={proof} />
            {file && <ArrowButton title="Upload Proof" onClickFunction={submitProofFunction} />}
        </div>
        <TotalExpenditure filterByAcademicYear={aqarYearState} />
    </div>
}

