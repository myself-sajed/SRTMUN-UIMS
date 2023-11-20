import React from 'react'
import { TableSupportingProof } from '../../../../exam/pages/ExamAQAR'
import ArrowButton from '../../../../../components/ArrowButton'
import { useState } from 'react'
import { useQuery } from 'react-query'
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../../../krc/js/uploadSupportingDocument'
import { useEffect } from 'react'

const AQARWithProof = ({ supportingProofMetaData, children }) => {


    const { academicYear, proofType, userType } = supportingProofMetaData

    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear: academicYear, userType, proofType }
    const { data, isLoading, refetch } = useQuery(`Proof-${proofType}-${academicYear}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', userType)
        formData.append('proofType', proofType)
        formData.append('academicYear', academicYear)

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
        <div>
            {
                children
            }
        </div>
    </div>
}

export default AQARWithProof