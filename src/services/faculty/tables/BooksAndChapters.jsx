import React, { useEffect, useState } from 'react'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header'
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

const BooksAndChapters = ({ filterByAcademicYear = false, academicYear, showTable = true, title, propType = "Book", showConferenceOnly = false }) => {
    const [bookModal, setBookModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [bookTitle, setBookTitle] = useState('')
    const [paperTitle, setPaperTitle] = useState('-')
    const [conTitle, setConTitle] = useState('-')
    const [conName, setConName] = useState('-')
    const [nat, setNat] = useState('')
    const [transType, setTransType] = useState('')
    const [issn, setIssn] = useState('')
    const [aff, setAff] = useState('')
    const [pubName, setPubName] = useState('')
    const [pubDate, setPubDate] = useState('')
    const [chapterTitle, setChapterTitle] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [type, setType] = useState(null)
    const [editId, setEditId] = useState(null)

    const [res, setRes] = useState('')

    const user = useSelector(state => state.user.user);
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        let formData = new FormData()
        formData.append('type', type)
        formData.append('titleOfBook', bookTitle)
        formData.append('paperTitle', paperTitle)
        formData.append('transType', transType)
        formData.append('titleOfProceeding', conTitle)
        formData.append('conName', conName)
        formData.append('isNat', nat)
        formData.append('chapterTitle', chapterTitle)
        formData.append('publicationYear', pubDate)
        formData.append('issnNumber', issn)
        formData.append('aff', aff)
        formData.append('publisherName', pubName)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'BookAndChapter', refetch, setLoading, setBookModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('type', type)
        formData.append('transType', transType)
        formData.append('titleOfBook', bookTitle)
        formData.append('chapterTitle', chapterTitle)
        formData.append('paperTitle', paperTitle)
        formData.append('titleOfProceeding', conTitle)
        formData.append('conName', conName)
        formData.append('isNat', nat)
        formData.append('publicationYear', pubDate)
        formData.append('issnNumber', issn)
        formData.append('aff', aff)
        formData.append('publisherName', pubName)
        formData.append('year', year)
        formData.append('file', proof)
        handleEditWithFile(formData, 'BookAndChapter', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        setEditId(itemId)
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setType(item.type)
                setBookTitle(item.titleOfBook)
                setPaperTitle(item.paperTitle)
                setConTitle(item.titleOfProceeding)
                setTransType(item.transType)
                setChapterTitle(item.chapterTitle)
                setConName(item.conName)
                setNat(item.isNat)
                setIssn(item.issnNumber)
                setAff(item.aff)
                setPubName(item.publisherName)
                setPubDate(item.publicationYear)
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setType(propType)
        setBookTitle('')
        setChapterTitle('')
        setPaperTitle('-')
        setConTitle('-')
        setConName('-')
        setNat('')
        setIssn('')
        setAff('')
        setTransType('')
        setPubName('')
        setPubDate('')
        setYear('')
        setProof('')
    }


    let param = { model: 'BookAndChapter', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    useEffect(() => {

        if (editModal === true) {

            data?.data?.data?.forEach(function (item) {
                if (item._id === editId) {
                    setNat(item.isNat)
                    setIssn(item.issnNumber)
                    setAff(item.aff)
                    setPubName(item.publisherName)
                    setPubDate(item.publicationYear)
                    setYear(item.year)
                    if (type === 'Conference') {
                        setBookTitle('-')
                        setChapterTitle('-')
                        setPaperTitle(item.paperTitle)
                        setConTitle(item.titleOfProceeding)
                        setConName(item.conName)
                    } else if (type === 'Chapter' || type === 'Translator') {
                        setPaperTitle('-')
                        setConTitle('-')
                        setConName('-')
                        setBookTitle(item.titleOfBook)
                        setChapterTitle(item.chapterTitle)

                        if (type === 'Translator' && transType === 'Book') {
                            setChapterTitle("-")
                        }
                    } else {
                        setPaperTitle('-')
                        setConTitle('-')
                        setConName('-')
                        setChapterTitle("-")
                        setBookTitle(item.titleOfBook)
                    }
                }
            })






        } else {
            if (type === 'Conference') {
                setBookTitle('-')
                setChapterTitle('-')
                setPaperTitle('')
                setConTitle('')
                setConName('')
            } else if (type === 'Chapter' || type === 'Translator') {
                setPaperTitle('-')
                setConTitle('-')
                setConName('-')
                setChapterTitle('')
                if (type === 'Translator' && transType === 'Book') {
                    setChapterTitle("-")
                }
            } else {
                setPaperTitle('-')
                setConTitle('-')
                setConName('-')
                setBookTitle('')
                setChapterTitle('-')

            }
        }

    }, [type, editModal, transType])



    return (
        <div>
            {/* // HEADER */}

            <Header showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} font="text-[17px]" add="Books/Papers" editState={setEditModal} clearStates={clearStates} state={setBookModal} setIsFormOpen={setIsFormOpen} icon={<MenuBookRoundedIcon className='text-lg' />}
                title={title ? title : "Books and Chapters published and papers in national/international conference proceedings"} />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='BookAndChapterFaculty' title='Book And Chapter' SendReq='BookAndChapter' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}



            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setBookModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Book/Chapter' : 'Add a new Book/Chapter'}</p>


                        <div className="col-md-4">

                            <label htmlFor="type" className="form-label">Choose Type</label>
                            <select className="form-select" id="type" required
                                value={type} onChange={(e) => { setType(e.target.value) }}>
                                <option disabled selected value="">Choose</option>

                                {
                                    showConferenceOnly ? <option value="Conference">Conference</option>
                                        :
                                        <>
                                            <option value="Book">Book</option>
                                            <option value="Chapter">Chapter</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Translator">Translator</option>
                                            <option value="Conference">Conference</option>
                                        </>
                                }

                            </select>
                        </div>

                        <Text title='Title of Book / Edited Book / Translation' state={bookTitle} setState={setBookTitle} disabled={type === 'Conference' ? true : false} />

                        {
                            type === 'Translator' && <div className="col-md-4">

                                <label htmlFor="validationCustom05" className="form-label">Translation work</label>
                                <select className="form-select" id="validationCustom05" required
                                    value={transType} onChange={(e) => { setTransType(e.target.value) }}>
                                    <option selected disabled value="">Choose</option>

                                    <option value="Research Paper / Chapter">Research Paper / Chapter</option>
                                    <option value="Book">Book</option>

                                </select>
                            </div>
                        }


                        <Text title='Title of Chapter / Translation' state={chapterTitle} setState={setChapterTitle} disabled={type === 'Book' || type === 'Editor' || type === 'Conference' || transType === 'Book' ? true : false} />


                        <Text title='Paper Title' state={paperTitle} setState={setPaperTitle} disabled={type !== 'Conference' ? true : false} />
                        <Text title='Title of proceedings of the conference' state={conTitle} setState={setConTitle} disabled={type !== 'Conference' ? true : false} />

                        <Text title='Conference Name' disabled={type !== 'Conference' ? true : false} state={conName} setState={setConName} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={nat} onChange={(e) => { setNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                {
                                    type === 'Conference' ? <>
                                        <option value="State/University">State/University</option>
                                        <option value="National">National</option>
                                        <option value="International (Abroad)">International (Abroad)</option>
                                        <option value="International (within country)">International (within country)</option>
                                    </> : <>
                                        <option value="National">National</option>
                                        <option value="International">International</option>
                                    </>
                                }
                            </select>
                        </div>
                        <Text space='col-md-4' title='Year of Publication' type="number" state={pubDate} setState={setPubDate} />
                        <Text title='ISBN/ISSN number of proceeding' state={issn} setState={setIssn} />
                        <Text title='Affiliation Institute at the time of publication' state={aff} setState={setAff} />
                        <Year state={year} setState={setYear} />
                        <Text space='col-md-6' title='Publisher Name' state={pubName} setState={setPubName} />

                        <File title='Upload Proof' setState={setProof} />



                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* TABLE */}

            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>

                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col"><div className="w-32">Title of Book / Edited Book / Translation  </div></th>
                                <th scope="col">Chapter Title</th>
                                <th scope="col">Paper Title</th>
                                <th scope="col">Translation work</th>
                                <th scope="col"><div className="w-40">Title of proceedings of the conference</div></th>
                                <th scope="col">Conference Name</th>
                                <th scope="col">National / International</th>
                                <th scope="col">Year of Publication</th>
                                <th scope="col"><div className="w-40">ISBN/ISSN number of proceeding</div></th>
                                <th scope="col"><div className="w-48">Affiliation Institute at the time of publication</div></th>
                                <th scope="col">Publisher Name</th>
                                <th scope="col"><div className="w-24">Year</div></th>
                                <th scope="col">Uploaded Proof</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>

                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.type}</td>
                                        <td>{item.titleOfBook}</td>
                                        <td>{item.chapterTitle}</td>
                                        <td>{item.paperTitle}</td>
                                        <td>{item.transType}</td>
                                        <td>{item.titleOfProceeding}</td>
                                        <td>{item.conName}</td>
                                        <td>{item.isNat}</td>
                                        <td>{item.publicationYear}</td>
                                        <td>{item.issnNumber}</td>
                                        <td>{item.aff}</td>
                                        <td>{item.publisherName}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td><Actions item={item} model="BookAndChapter" refreshFunction={() => { refetch() }} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setBookModal} /></td>



                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>

                    {
                        isLoading && <Loader />
                    }
                    {
                        (data && data?.data?.data === undefined || filteredItems.length === 0) && <EmptyBox />
                    }
                </div>
            }
        </div >
    )
}






export default BooksAndChapters

const RadioForType = ({ title, id }) => {
    return <div className="form-check flex-auto">
        <input className="form-check-input" type="radio" name="chooseType" id={id} />
        <label className="form-check-label" htmlFor={id}>
            {title}
        </label>
    </div>
}