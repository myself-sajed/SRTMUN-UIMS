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

const BooksAndChapters = () => {
    const [bookModal, setBookModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [teacherName, setTeacherName] = useState('')
    const [bookTitle, setBookTitle] = useState('')
    const [paperTitle, setPaperTitle] = useState('')
    const [conTitle, setConTitle] = useState('')
    const [conName, setConName] = useState('')
    const [nat, setNat] = useState('')
    const [issn, setIssn] = useState('')
    const [aff, setAff] = useState('')
    const [pubName, setPubName] = useState('')
    const [authorEditor, setAuthorEditor] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [pubDate, setPubDate] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')

    const [res, setRes] = useState('')

    const user = useSelector(state => state.user.user);
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        let formData = new FormData()
        formData.append('teacherName', teacherName)
        formData.append('titleOfBook', bookTitle)
        formData.append('paperTitle', paperTitle)
        formData.append('titleOfProceeding', conTitle)
        formData.append('authorEditor', authorEditor)
        formData.append('conName', conName)
        formData.append('isNat', nat)
        formData.append('publicationYear', pubDate)
        formData.append('issnNumber', issn)
        formData.append('aff', aff)
        formData.append('publisherName', pubName)
        formData.append('schoolName', schoolName)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user._id)

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
        formData.append('teacherName', teacherName)
        formData.append('titleOfBook', bookTitle)
        formData.append('paperTitle', paperTitle)
        formData.append('titleOfProceeding', conTitle)
        formData.append('authorEditor', authorEditor)
        formData.append('conName', conName)
        formData.append('isNat', nat)
        formData.append('publicationYear', pubDate)
        formData.append('issnNumber', issn)
        formData.append('aff', aff)
        formData.append('publisherName', pubName)
        formData.append('schoolName', schoolName)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'BookAndChapter', setEditModal, refetch, setLoading, setIsFormOpen)




    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setTeacherName(item.teacherName)
                setBookTitle(item.titleOfBook)
                setPaperTitle(item.paperTitle)
                setConTitle(item.titleOfProceeding)
                setConName(item.conName)
                setNat(item.isNat)
                setIssn(item.issnNumber)
                setAuthorEditor(item.authorEditor)
                setAff(item.aff)
                setPubName(item.publisherName)
                setSchoolName(item.schoolName)
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
        setTeacherName('')
        setBookTitle('')
        setPaperTitle('')
        setConTitle('')
        setConName('')
        setNat('')
        setIssn('')
        setAuthorEditor('')
        setAff('')
        setPubName('')
        setSchoolName('')
        setPubDate('')
        setYear('')
        setProof('')



    }


    let param = { model: 'BookAndChapter', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))



    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} font="text-[17px]" add="Books/Papers" editState={setEditModal} clearStates={clearStates} state={setBookModal} setIsFormOpen={setIsFormOpen} icon={<MenuBookRoundedIcon className='text-lg' />} title="Books and Chapters published and papers in national/international conference proceedings" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='BookAndChapterFaculty' title='Book And Chapter' SendReq='BookAndChapter' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}



            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setBookModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Book/Chapter' : 'Add a new Book/Chapter'}</p>

                        <Text title='Teacher Name' state={teacherName} setState={setTeacherName} />
                        <Text title='Title of Published Book' state={bookTitle} setState={setBookTitle} />
                        <Text title='Paper Title' state={paperTitle} setState={setPaperTitle} />
                        <Text title='Title of proceedings of the conference' state={conTitle} setState={setConTitle} />
                        <Text title='Conference Name' state={conName} setState={setConName} />
                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={nat} onChange={(e) => { setNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>
                        <div className="col-md-4">

                            <label htmlFor="authorEditor" className="form-label">Author / Editor / Translator</label>
                            <select className="form-select" id="authorEditor" required
                                value={authorEditor} onChange={(e) => { setAuthorEditor(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Author">Author</option>
                                <option value="Editor">Editor</option>
                                <option value="Translator">Translator</option>
                            </select>
                        </div>
                        <Text title='Year of Publication' type="number" state={pubDate} setState={setPubDate} />
                        <Text title='ISBN/ISSN number of proceeding' state={issn} setState={setIssn} />
                        <Text title='School Name' state={schoolName} setState={setSchoolName} />
                        <Text title='Affiliation Institute at the time of publication' space='col-md-6' state={aff} setState={setAff} />
                        <Year state={year} setState={setYear} />
                        <Text title='Publisher Name' space='col-md-6' state={pubName} setState={setPubName} />

                        <File space='col-md-6' title='Upload Proof' setState={setProof} />



                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>

                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Teacher Name</th>
                            <th scope="col"><div className="w-32">Title of Published Book</div></th>
                            <th scope="col">Paper Title</th>
                            <th scope="col">Author / Editor / Translator</th>
                            <th scope="col"><div className="w-40">Title of proceedings of the conference</div></th>
                            <th scope="col">Conference Name</th>
                            <th scope="col">National / International</th>
                            <th scope="col">Year of Publication</th>
                            <th scope="col"><div className="w-40">ISBN/ISSN number of proceeding</div></th>
                            <th scope="col"><div className="w-48">Affiliation Institute at the time of publication</div></th>
                            <th scope="col">Publisher Name</th>
                            <th scope="col">School Name</th>
                            <th scope="col"><div className="w-24">Year</div></th>
                            <th scope="col">Uploaded Proof</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>

                    <tbody>
                    {data && sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.teacherName}</td>
                                    <td>{item.titleOfBook}</td>
                                    <td>{item.paperTitle}</td>
                                    <td>{item.authorEditor}</td>
                                    <td>{item.titleOfProceeding}</td>
                                    <td>{item.conName}</td>
                                    <td>{item.isNat}</td>
                                    <td>{item.publicationYear}</td>
                                    <td>{item.issnNumber}</td>
                                    <td>{item.aff}</td>
                                    <td>{item.publisherName}</td>
                                    <td>{item.schoolName}</td>
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
                    (data && data?.data?.data === undefined) && <EmptyBox />
                }
            </div>
        </div>
    )
}






export default BooksAndChapters