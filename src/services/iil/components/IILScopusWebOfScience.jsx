import React from 'react'

const IILScopusWebOfScience = ({ type = "CitationIndex" }) => {
    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear, userType: 'iil', proofType: 'usageForm' }
    const { data, isLoading, refetch } = useQuery(`${type}-${academicYear}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        formData.append('info', usage)
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'krc')
        formData.append('proofType', 'usageForm')
        formData.append('academicYear', academicYear)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setUsage(data?.data?.data?.info)
            setProof(data?.data?.data?.proof)
            console.log(data?.data?.data)
        }
    }, [data])

    return <div className="grid grid-cols-2 gap-4">
        {
            isLoading ? <UserLoading title="Fetching details..." />
                :
                <div>
                    <div className="col-md-6">
                        <label htmlFor="usage" className="form-label">Number of usage</label>
                        <input type="number" value={usage} onChange={(e) => setUsage(() => e.target.value)} className="form-control" id="usage" placeholder="Usage by Students and Teachers" />
                    </div>
                    {
                        usage && <TableSupportingProof proof={proof} setFile={setFile} file={file} title='Upload relevant proof based on the above choice' />
                    }
                    {usage && <div className='mt-2'>
                        <ArrowButton title="Save Details" onClickFunction={submitProofFunction} />
                    </div>}
                </div>
        }

    </div>
}

export default IILScopusWebOfScience
