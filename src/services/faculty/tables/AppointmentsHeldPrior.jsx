import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import Header from '../components/Header';
import submit from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import handleEdit from '../js/handleEdit';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';


const AppointmentsHeldPrior = () => {

    const dispatch = useDispatch()
    const [appointmentModal, setAppointmentModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    // states
    const [designation, setDesignation] = useState('')
    const [employerName, setEmployerName] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [leavingDate, setLeavingDate] = useState('')
    const [salaryWithGrade, setSalaryWithGrade] = useState('')
    const [leavingReason, setLeavingReason] = useState('')
    const [res, setRes] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const user = useSelector(state => state.user.user);
    const [isFormOpen, setIsFormOpen] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        const data = { userId: user._id, designation, employerName, joiningDate, salaryWithGrade, leavingReason, leavingDate }
        submit(data, 'AppointmentsHeldPrior', refetch, setLoading, setAppointmentModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        const theItem = { itemId: itemToDelete._id, designation, employerName, joiningDate, salaryWithGrade, leavingReason, leavingDate, }

        handleEdit(theItem, 'AppointmentsHeldPrior', setEditModal, refetch, setLoading, setIsFormOpen)

    }

    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setDesignation(item.designation)
                setEmployerName(item.employerName)
                setJoiningDate(item.joiningDate)
                setLeavingDate(item.leavingDate)
                setSalaryWithGrade(item.salaryWithGrade)
                setLeavingReason(item.leavingReason)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setDesignation('')
        setEmployerName('')
        setJoiningDate('')
        setLeavingDate('')
        setSalaryWithGrade('')
        setLeavingReason('')
    }

    let param = { model: 'AppointmentsHeldPrior', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    console.log(joiningDate)

    return (
        <div>
            {/* // 1. HEADER */}


            <Header exceldialog={setOpen} add="Appointments" editState={setEditModal} clearStates={clearStates} state={setAppointmentModal} icon={<CoPresentRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Appointments held prior to joining this institute" />

            <BulkExcel data={data?.data?.data} sampleFile='AppointmentsFaculty' title='Appointments' SendReq="AppointmentsHeldPrior" refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />


            {/* // 2. FIELDS */}

            <Dialog fullWidth maxWidth='lg' open={isFormOpen} >
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setAppointmentModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Appointment' : 'Add a new Appointment'}</p>


                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">Designation</label>
                            <input type="text" className="form-control" id="validationCustom01" required value={designation} onChange={(e) => { setDesignation(e.target.value) }} />

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Employer Name</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={employerName} onChange={(e) => { setEmployerName(e.target.value) }} />

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">From</label>
                            <input type="date" className="form-control" id="validationCustom02" required value={joiningDate} onChange={(e) => { setJoiningDate(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">To<span className='text-sm text-gray'>(Type text, else type date)</span></label>
                            <input type="text" className="form-control" id="validationCustom03" required value={leavingDate} onChange={(e) => { setLeavingDate(e.target.value) }} />

                        </div>


                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">Salary with grade</label>
                            <input type="text" className="form-control" id="validationCustom03" required value={salaryWithGrade} onChange={(e) => { setSalaryWithGrade(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">Leaving Reason</label>
                            <input type="text" className="form-control" id="validationCustom03" required value={leavingReason} onChange={(e) => { setLeavingReason(e.target.value) }} />

                        </div>

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* // 3. TABLE */}

            <div className='mt-2 overflow-auto  change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-hover table-bordered">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Designation</th>
                            <th scope="col">Employer Name</th>
                            <th scope="col">From</th>
                            <th scope="col">To </th>
                            <th scope="col">Salary with Grade</th>
                            <th scope="col">Leaving Reason</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>



                    {data && sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.designation}</td>
                                    <td>{item.employerName}</td>
                                    <td>{item.joiningDate}</td>
                                    <td>{item.leavingDate}</td>
                                    <td>{item.salaryWithGrade}</td>
                                    <td>{item.leavingReason}</td>

                                    <td>
                                        <Actions item={item} model="AppointmentsHeldPrior" refreshFunction={() => { refetch() }} editState={setEditModal} addState={setAppointmentModal} pencilClick={() => pencilClick(item._id)} />

                                    </td>
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

        </div >
    )
}

export default AppointmentsHeldPrior