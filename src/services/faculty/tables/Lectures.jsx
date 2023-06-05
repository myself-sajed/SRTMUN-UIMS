import React, { useEffect, useState } from 'react'
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import File from '../../../inputs/File';
import Text from '../../../inputs/Text';
import Year from '../../../inputs/Year';
import submit, { submitWithFile } from '../js/submit';
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
import handleEdit from '../js/handleEdit';
import sortByAcademicYear from '../../../js/sortByAcademicYear';


const Lectures = ({ filterByAcademicYear = false, academicYear }) => {
    const [lectureModal, setLectureModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    // states
    const [course, setCourse] = useState('')
    const [level, setLevel] = useState('')
    const [mode, setMode] = useState('')
    const [noOfClasses, setNoOfClasses] = useState('')
    const [classesTaken, setClassesTaken] = useState('')
    // const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [res, setRes] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);

    // function handleAddQualification(e) {
    //     e.preventDefault();
    //     setLoading(true)
    //     const data = { exam, subjects, institute, year, percentage, userId: user?._id }
    //     submit(data, 'Qualification', refetch, setLoading, setQualificationModal, setIsFormOpen)

    // }

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)

        const data = { course, level, mode, noOfClasses, classesTaken, year, userId: user?._id }
        submit(data, 'lectures', refetch, setLoading, setLectureModal, setIsFormOpen)

        // let formData = new FormData()
        // formData.append('course', course)
        // formData.append('level', level)
        // formData.append('mode', mode)
        // formData.append('noOfClasses', noOfClasses)
        // formData.append('classesTaken', classesTaken)
        // // formData.append('file', proof)
        // formData.append('year', year)
        // formData.append('userId', user?._id)

        // submitWithFile(formData, 'lectures', refetch, setLoading, setLectureModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        const theItem = { itemId: itemToDelete._id, course, level, mode, noOfClasses, classesTaken, year, }
        handleEdit(theItem, 'Lectures', setEditModal, refetch, setLoading, setIsFormOpen)


        // // arrange form Data
        // let formData = new FormData()
        // formData.append('itemId', itemToDelete._id)
        // // formData.append('proof', itemToDelete.proof)
        // formData.append('course', course)
        // formData.append('level', level)
        // formData.append('mode', mode)
        // formData.append('noOfClasses', noOfClasses)
        // formData.append('classesTaken', classesTaken)
        // formData.append('year', year)
        // // formData.append('file', proof)


        // handleEditWithFile(formData, 'Lectures', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setCourse(item.course)
                setLevel(item.level)
                setMode(item.teachingMode)
                setNoOfClasses(item.noOfClasses)
                setClassesTaken(item.percentageOfClasses)
                setYear(item.year)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setCourse('')
        setLevel('')
        setMode('')
        setNoOfClasses('')
        setClassesTaken('')
        // setProof(null)
        setYear('')


    }


    let param = { model: 'Lectures', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))


    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div>
            {/* // 1. HEADER */}


            <Header exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Lectures/Seminars" editState={setEditModal} clearStates={clearStates} state={setLectureModal} icon={<TvRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Lectures, Seminars, Tutorials, Practicals, Contact Hours" />

            <BulkExcel data={data?.data?.data} sampleFile='LecturesFaculty' title='Lectures, Seminars' SendReq='Lectures' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setLectureModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Lecture/Seminar' : 'Add a new Lecture/Seminar'}</p>

                        <Text space='col-md-8' title='Course/Paper' state={course} setState={setCourse} />

                        <Text title='Level' state={level} setState={setLevel} />

                        <Text space='col-md-6' title='Teaching Mode' state={mode} setState={setMode} />



                        <Text space='col-md-4' title='No of classes alloted per week' state={noOfClasses} setState={setNoOfClasses} />

                        <Year state={year} setState={setYear} />


                        {/* <Text space='col-md-6' title='% of classes taken as per documented record' state={classesTaken} setState={setClassesTaken} /> */}

                        {/* <File space='col-md-6' title='Upload Attendance' setState={setProof} /> */}


                    </FormWrapper>
                </DialogContent>
            </Dialog>





            {/* // 2. TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Course/Paper</th>
                            <th scope="col">Level</th>
                            <th scope="col">Teaching Mode</th>
                            <th scope="col"><div className="max-w-56">No of classes alloted per week</div></th>
                            {/* <th scope="col">% of classes taken as per documented record</th> */}
                            <th scope="col"><div className="w-20">Year</div></th>
                            {/* <th scope="col">Upload Attendance</th> */}
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data && filteredItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.course}</td>
                                    <td>{item.level}</td>
                                    <td>{item.teachingMode}</td>
                                    <td>{item.noOfClasses}</td>
                                    {/* <td>{item.percentageOfClasses}</td> */}
                                    <td>{item.year}</td>
                                    {/* <td><View proof={item.proof} /></td> */}
                                    <td> <Actions item={item} model="Lectures" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setLectureModal} /></td>



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
        </div>
    )
}









export default Lectures