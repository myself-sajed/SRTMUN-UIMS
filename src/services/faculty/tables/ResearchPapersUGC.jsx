import React, { useEffect, useState } from 'react'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Text from '../../../inputs/Text';
import File from '../../../inputs/File';
import Year from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import View from './View';
import handleEditWithFile from '../js/handleEditWithFile';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';

const ResearchPapersUGC = () => {
    const [researchPaperModal, setResearchPaperModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [paperTitle, setPaperTitle] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [teacherName, setTeacherName] = useState('')
    const [journalName, setJournalName] = useState('')
    const [indexLink, setIndexLink] = useState([])
    const [pubYear, setPubYear] = useState('')
    const [issn, setIssn] = useState('')
    const [ugc, setUgc] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')

    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const user = useSelector(state => state.user.user);

    // indexedIn management
    const [indexData, setIndexData] = useState([])
    const [indexLinkData, setIndexLinkData] = useState({})

    //functions

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('paperTitle', paperTitle)
        formData.append('journalName', journalName)
        formData.append('publicationYear', pubYear)
        formData.append('indexedIn', indexData?.join(", "))
        formData.append('indexData', indexData)
        formData.append('indexLink', Object.entries(indexLinkData).map(([key, value]) => `${key}: ${value}`).join(", "))
        formData.append('indexLinkData', indexLinkData)
        formData.append('issnNumber', issn)
        formData.append('recLink', ugc)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user._id)

        submitWithFile(formData, 'ResearchPaper', refetch, setLoading, setResearchPaperModal, setIsFormOpen)

        console.log('Indexed In :', indexData)
        console.log('Indexed In Links :', indexLinkData)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('paperTitle', paperTitle)
        formData.append('indexedIn', indexData?.join(", "))
        formData.append('indexData', indexData)
        formData.append('indexLink', Object.entries(indexLinkData).map(([key, value]) => `${key}: ${value}`).join(", "))
        formData.append('indexLinkData', indexLinkData)
        formData.append('journalName', journalName)
        formData.append('publicationYear', pubYear)
        formData.append('issnNumber', issn)
        formData.append('recLink', ugc)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'ResearchPaper', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setPaperTitle(item.paperTitle)
                setJournalName(item.journalName)
                setPubYear(item.publicationYear)
                setIssn(item.issnNumber)
                setUgc(item.recLink)
                setIndexData(item.indexedIn ? item.indexedIn?.split(', ')?.map(item => item.trim()) : [])
                setIndexLinkData(item.indexLink ? item.indexLink?.split(', ')?.reduce((acc, entry) => (parts => (acc[parts[0].trim()] = parts[1].trim(), acc))(entry.split(': ')), {})
                    : {})
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setPaperTitle('')
        setAuthorName('')
        setTeacherName('')
        setJournalName('')
        setPubYear('')
        setIndexData([])
        setIndexLinkData({})
        setIssn('')
        setUgc('')
        setYear('')
        setProof(null)



    }


    let param = { model: 'ResearchPaper', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))


    return (
        <div>
            {/* // HEADER */}


            <Header exceldialog={setOpen} add="Research Paper" editState={setEditModal} clearStates={clearStates} state={setResearchPaperModal} icon={<FindInPageRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Research Papers in the Journals notified by UGC" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='ResearchPaperFaculty' title='Research Paper' SendReq='ResearchPaper' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setResearchPaperModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Row' : 'Add a new Content'}</p>

                        <Text title='Paper Title' state={paperTitle} setState={setPaperTitle} />
                        <Text title='Journal Name' state={journalName} setState={setJournalName} />
                        <Text title='Publication Year' type="number" state={pubYear} setState={setPubYear} />
                        <Text title='ISSN Number' state={issn} setState={setIssn} />
                        <Year state={year} setState={setYear} />

                        <div className="col-md-4">
                            <label htmlFor="indexedIn">Indexed in</label>
                            <div id="indexedIn" className="border mt-2 p-1 rounded-sm border-gray-400">
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="Scopus" />
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="Web of Science" />
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="UGC Care List" />
                            </div>
                        </div>

                        <div class="row g-2">

                            <IndexLink placeholder="Enter Scopus Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="Scopus" indexData={indexData} />
                            <IndexLink placeholder="Enter Web of Science Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="Web of Science" indexData={indexData} />
                            <IndexLink placeholder="Enter UGC Care List Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="UGC Care List" indexData={indexData} />

                        </div>

                        <File space='col-md-10' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* Table */}
            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Paper Title</th>
                            <th scope="col">Journal Name</th>
                            <th scope="col">Publication Year</th>
                            <th scope="col">ISSN Number</th>
                            <th scope="col">Indexed in</th>
                            <th scope="col">Links</th>
                            <th scope="col"><div className="w-20">Year</div></th>
                            <th scope="col">Proof</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.paperTitle}</td>
                                    <td>{item.journalName}</td>
                                    <td>{item.publicationYear}</td>
                                    <td>{item.issnNumber}</td>
                                    <td>{item?.indexedIn}</td>
                                    <td>{item?.indexLink}</td>
                                    <td>{item.year}</td>
                                    <td> <View proof={item.proof} /></td>
                                    <td><Actions item={item} model="ResearchPaper" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setResearchPaperModal} /></td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                {
                    isLoading && <Loader />
                }
                {
                    (data && data?.data?.data === undefined) && <EmptyBox />
                }
            </div>
        </div>
    )
}

export default ResearchPapersUGC


const FormCheck = ({ id, setIndexData, indexData }) => {
    return <div class="form-check">
        <input class="form-check-input" type="checkbox"
            onChange={(e) => {
                e.target.checked ? setIndexData([...indexData, id]) : setIndexData(indexData.filter(item => item !== id))
            }} checked={indexData?.includes(id)} id={id} />
        <label class="form-check-label" htmlFor={id}>
            {id}
        </label>
    </div>
}

const IndexLink = ({ placeholder, id, indexLinkData, setIndexLinkData, indexData }) => {
    useEffect(() => {
        console.log('indexLinkData:', indexLinkData)
    }, [indexLinkData])
    return <div class="col">
        <input type="text" value={indexLinkData[id]} className='form-control col-md-4' onChange={(e) => {
            setIndexLinkData({ ...indexLinkData, [id]: e.target.value })
        }} placeholder={placeholder} disabled={!indexData.includes(id)} />
    </div>
}