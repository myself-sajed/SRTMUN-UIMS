import React, { useEffect, useState } from 'react'
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Actions from './Actions';
import submit from '../js/submit';
import refresh from '../js/refresh';
import handleEdit from '../js/handleEdit';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import { tableHead } from '../../admin/tables_faculty/Qualification'

const Qualification = ({ filterByAcademicYear = false, academicYear }) => {

    const typeObject = {
        exam: 'text', institute: 'text', year: 'number', percentage: 'text', subjects: 'text'
    }

    const user = useSelector(state => state.user.user)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);


    const typeObject = {
        exam: 'text', institute: 'text', year: 'number', percentage: 'text', subjects: 'text'
    }

    // states
    const [exam, setExam] = useState('')
    const [institute, setinstitute] = useState('')
    const [year, setYear] = useState('')
    const [percentage, setPercentage] = useState('')
    const [subjects, setSubjects] = useState('')
    const [qualificationModal, setQualificationModal] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [filteredItems, setFilteredItems] = useState([])


    // handle addQualification
    function handleAddQualification(e) {
        e.preventDefault();
        setLoading(true)
        const data = { exam, subjects, institute, year, percentage, userId: user?._id }
        submit(data, 'Qualification', refetch, setLoading, setQualificationModal, setIsFormOpen)

    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        const theItem = { itemId: itemToDelete._id, exam, subjects, institute, year, percentage }
        setLoading(true)
        handleEdit(theItem, 'Qualification', setEditModal, refetch, setLoading, setIsFormOpen)
    }

    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setExam(item.exam)
                setinstitute(item.institute)
                setYear(item.year)
                setPercentage(item.percentage)
                setSubjects(item.subjects)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setExam('')
        setinstitute('')
        setYear('')
        setPercentage('')
        setSubjects('')
    }

    let param = { model: 'Qualification', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))

    // useeffect for scroll to top
    useEffect(() => {
        window.scrollTo(0, 150)
    }, [])

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div className="">

            {/* // HEADER */}

            <Header exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Qualification" editState={setEditModal} clearStates={clearStates} state={setQualificationModal} icon={<SchoolIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Your Qualifications" />

            <BulkExcel data={data?.data?.data} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile='QualificationFaculty' title='Qualification' SendReq='Qualification' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />
            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? "Editing" : "Adding"} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setQualificationModal(false) }} onSubmit={editModal ? handleChange : handleAddQualification} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? "Edit Qualification" : "Add a new Qualification"}</p>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">Exam</label>
                            <input type="text" className="form-control" id="validationCustom01" required value={exam} onChange={(e) => { setExam(e.target.value) }} />

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Institute/Board</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={institute} onChange={(e) => { setinstitute(e.target.value) }} />

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Year</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={year} onChange={(e) => { setYear(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">Percentage</label>
                            <input type="text" className="form-control" id="validationCustom03" required value={percentage} onChange={(e) => { setPercentage(e.target.value) }} />

                        </div>


                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">Subjects</label>
                            <input type="text" className="form-control" id="validationCustom03" required value={subjects} onChange={(e) => { setSubjects(e.target.value) }} />

                        </div>

                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* // TABLE OF QUALIFICATIONS */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2 text-sm sm:text-base'>
                <table className="table table-hover table-bordered">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Exams</th>
                            <th scope="col">Institute/Boards</th>
                            <th scope="col">Year</th>
                            <th scope="col">Percentage</th>
                            <th scope="col">Subjects</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {data && filteredItems.map((qualification, index) => {
                            return (
                                <tr key={qualification._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{qualification.exam}</td>
                                    <td>{qualification.institute}</td>
                                    <td>{qualification.year}</td>
                                    <td>{qualification.percentage}</td>
                                    <td>{qualification.subjects}</td>
                                    <td>
                                        <Actions item={qualification} model="Qualification" editState={setEditModal} addState={setQualificationModal} refreshFunction={refetch} pencilClick={() => pencilClick(qualification._id)} />
                                    </td>
                                </tr>

                            )
                        })
                        }




                    </tbody>
                </table>
                {
                    isLoading && <Loader />
                }
                {
                    ((data && data?.data?.data === undefined) || (filteredItems.length === 0)) && <EmptyBox />
                }
            </div>


        </div>
    )
}

export default Qualification