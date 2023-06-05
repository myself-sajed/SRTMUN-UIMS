import React, { useEffect, useState } from 'react'
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import { useSelector } from 'react-redux';
import Text from '../../../inputs/Text';
import Header from '../components/Header';
import { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import View from './View';
import handleEditWithFile from '../js/handleEditWithFile';
import File from '../../../inputs/File';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';

const PostHeldAppointment = ({ filterByAcademicYear = false, academicYear }) => {

    const [open, setOpen] = useState(false);

    // states
    const [postsModal, setPostsModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [designation, setDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [leavingDate, setLeavingDate] = useState('')
    const [proof, setProof] = useState(null)
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
        formData.append('designation', designation)
        formData.append('department', department)
        formData.append('joiningDate', joiningDate)
        formData.append('leavingDate', leavingDate)
        formData.append('file', proof)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'PostHeld', refetch, setLoading, setPostsModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('designation', designation)
        formData.append('department', department)
        formData.append('joiningDate', joiningDate)
        formData.append('leavingDate', leavingDate)
        formData.append('file', proof)


        handleEditWithFile(formData, 'PostHeld', setEditModal, refetch, setLoading, setIsFormOpen)


    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setDesignation(item.designation)
                setDepartment(item.department)
                setJoiningDate(item.joiningDate)
                setLeavingDate(item.leavingDate)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setDesignation('')
        setDepartment('')
        setJoiningDate('')
        setLeavingDate('')
        setProof(null)


    }

    let param = { model: 'PostHeld', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div>
            {/* // HEADER */}


            <Header exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Posts" editState={setEditModal} state={setPostsModal} clearStates={clearStates} icon={<AirlineSeatReclineNormalRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Posts held after appointments at this institution" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='PostHeldFaculty' title='Posts held after appointments' SendReq='PostHeld' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setPostsModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Post' : 'Add a Post'}</p>


                        <p className='text-2xl font-bold my-3'></p>


                        <Text title='Designation' state={designation} setState={setDesignation} />

                        <Text title='Department' state={department} setState={setDepartment} />

                        <Text title='from' state={joiningDate} setState={setJoiningDate} type='date' />

                        <Text title='To (Type text, else type date)' state={leavingDate} setState={setLeavingDate} type='text' />

                        <File space='col-md-8' title='Appointment Order / CAS Promotion	' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* // 3. TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Designation</th>
                            <th scope="col">Department</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Appointment Order / CAS Promotion</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>



                        {data && filteredItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.designation}</td>
                                    <td>{item.department}</td>
                                    <td>{item.joiningDate}</td>
                                    <td>{item.leavingDate}</td>
                                    <td><View proof={item.proof} /></td>

                                    <td>
                                        <Actions item={item} model="PostHeld" editState={setEditModal} addState={setPostsModal} refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} />
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
                    (data && data?.data?.data === undefined || filteredItems.length === 0) && <EmptyBox />
                }
            </div>
        </div>
    )
}






export default PostHeldAppointment
