import React, { useEffect, useState } from 'react'
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
import FileViewer from '../../../components/FileViewer';
import { useQuery } from 'react-query';
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../krc/js/uploadSupportingDocument';
import ArrowButton from '../../../components/ArrowButton';



const ExamAQAR = () => {
    title(siteLinks.examAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.examHome, siteLinks.examAQAR]
    const user = useSelector((state) => state.user.examUser)
    useOtherServiceAuth({ ...examAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "2.5.1 - Days from the date of last semester-end/ year- end examination till the declaration of  results during the year",
            component: <ResultDeclarationWithProof aqarYearState={aqarYearState} />
        },
        {
            title: "2.5.2 - Student complaints/grievances about evaluation against total number appeared in the examinations during the year ",
            component: <StudentComplaintWithProof aqarYearState={aqarYearState} />
        },
        {
            title: "2.6.3 - Students passed during the year",
            component: <ExamPassedDuringYearWithProof aqarYearState={aqarYearState} />
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
    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear: aqarYearState, userType: 'exam', proofType: 'ResultDeclarationWithProof' }
    const { data, isLoading, refetch } = useQuery(`ResultDeclarationWithProof-${aqarYearState}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'exam')
        formData.append('proofType', 'ResultDeclarationWithProof')
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
        <DateOfResultDiclaration filterByAcademicYear={aqarYearState} />
    </div>
}

const StudentComplaintWithProof = ({ aqarYearState }) => {
    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear: aqarYearState, userType: 'exam', proofType: 'StudentComplaint' }
    const { data, isLoading, refetch } = useQuery(`StudentComplaint-${aqarYearState}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'exam')
        formData.append('proofType', 'StudentComplaint')
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
        <StudentComplaintsGrievances filterByAcademicYear={aqarYearState} />
    </div>

}

const ExamPassedDuringYearWithProof = ({ aqarYearState }) => {
    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear: aqarYearState, userType: 'exam', proofType: 'ExamPassedDuringYear' }
    const { data, isLoading, refetch } = useQuery(`ExamPassedDuringYear-${aqarYearState}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'exam')
        formData.append('proofType', 'ExamPassedDuringYear')
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
        <StudentComplaintsGrievances filterByAcademicYear={aqarYearState} />
    </div>

}


const TableSupportingProof = ({ file, setFile, title = "Upload a supporting / relevant document here for the table below  ", proof = false, }) => {
    return <div className="my-3">
        <label htmlFor="resultFile">{title}</label>
        <input onChange={(e) => setFile(() => e.target.files[0])} type="file" name="file" id="resultFile" className='form-control mt-1' />
        {
            proof && <div className="mt-3">
                <p className="my-1 text-xs text-muted">Uploaded Document</p>
                <FileViewer fileName={proof} showFullFileName={true} serviceName="aqar" />
            </div>
        }

    </div>
}


export { TableSupportingProof }


