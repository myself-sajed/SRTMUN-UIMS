import React, { useEffect, useState } from 'react'
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Actions from './Actions';
import submit, { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import handleEdit from '../js/handleEdit';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import Year from '../../../inputs/Year';
import File from '../../../inputs/File';
import handleEditWithFile from '../js/handleEditWithFile';
import View from './View';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import MultipleYearSelect from '../../../inputs/MultipleYearSelect';
import { toast } from 'react-hot-toast';
import FromToDate from '../../../inputs/FromToDate';

const Responsibities = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {

    const user = useSelector(state => state.user.user)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    // states
    const [committeeName, setCommitteeName] = useState(null)
    const [designation, setDesignation] = useState(null)
    const [institute, setInstitute] = useState(null)
    const [year, setYear] = useState([])
    const [proof, setProof] = useState(null)
    const [duration, setDuration] = useState(null)
    const [fromDate, setFromDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [active, setActive] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [res, setRes] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [filteredItems, setFilteredItems] = useState([])
    const [responsibilitiesModal, setResponsibitiesModal] = useState(false)
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        if (active) {
            setDuration(`${fromDate} to Till Date`)
            setYear([fromDate, endDate])
        } else {
            setDuration(`${fromDate} to ${endDate}`)
            setYear([fromDate, endDate])
        }
    }, [fromDate, endDate, active])


    function handleSubmit(e) {
        e.preventDefault();
        if (year.length === 0) {
            toast.error('Please select year(s)')
        } else if (year.length === 1) {
            setYear([fromDate, endDate])
        } else {
            setLoading(true)
            let formData = new FormData()
            formData.append('committeeName', committeeName)
            formData.append('designation', designation)
            formData.append('institute', institute)
            formData.append('duration', duration)
            formData.append('active', active)
            formData.append('durationYears', JSON.stringify(year))
            formData.append('file', proof)
            formData.append('userId', user?._id)
            submitWithFile(formData, 'Responsibilities', refetch, setLoading, setResponsibitiesModal, setIsFormOpen)
        }



    }


    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)



        if (year.length === 0) {
            toast.error('Please select year(s)')
        } else if (year.length === 1) {
            setYear([fromDate, endDate])
        } else {
            // arrange form Data
            let formData = new FormData()
            formData.append('itemId', itemToDelete._id)
            formData.append('proof', itemToDelete.proof)
            formData.append('committeeName', committeeName)
            formData.append('designation', designation)
            formData.append('institute', institute)
            formData.append('active', active)
            formData.append('duration', duration)
            formData.append('durationYears', JSON.stringify(year))
            formData.append('file', proof)
            handleEditWithFile(formData, 'Responsibilities', setEditModal, refetch, setLoading, setIsFormOpen)
        }

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setEditItem(item)
                setCommitteeName(item.committeeName)
                setInstitute(item.institute)
                setDuration(item.duration)
                setDesignation(item.designation)

                if (item.durationYears?.[0]?.includes(',') || item.durationYears?.[0]?.length > 7) {
                    setYear(() => [])
                    setFromDate(() => null)

                } else {
                    setYear(() => item.durationYears)
                    setFromDate(() => item.durationYears[0] || null)
                }

                setActive(item.active === undefined ? false : item.active)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setCommitteeName('')
        setInstitute('')
        setDuration('')
        setDesignation('')
        setYear('')
        setActive(false)
        setFromDate(null)
        setEndDate(null)
    }

    let param = { model: 'Responsibilities', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, null, false, null, true,))
    }, [data])



    return (
        <div className="">

            {/* // HEADER */}

            <Header user={user} model='Responsibilities' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Responsibilities" editState={setEditModal} clearStates={clearStates} state={setResponsibitiesModal} icon={<SchoolIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Administrative / Academic Responsibilities" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='ResponsibilitiesFaculty' title='Administrative / Academic Responsibilities' SendReq='Responsibilities' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />
            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? "Editing" : "Adding"} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setResponsibitiesModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? "Edit Responsibility" : "Add a new Responsibility"}</p>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Designation</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={designation} onChange={(e) => { setDesignation(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">Name of the Committee</label>
                            <input type="text" className="form-control" id="validationCustom01" required value={committeeName} onChange={(e) => { setCommitteeName(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Hosting institute name</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={institute} onChange={(e) => { setInstitute(e.target.value) }} />

                        </div>


                        <FromToDate activeTitle="Are you still active under this responsibility?" fromDate={fromDate} setFromDate={setFromDate} endDate={endDate} setEndDate={setEndDate} setActive={setActive} active={active} isYear={true} editModal={editModal} editItem={editItem} />


                        <File space='col-md-7' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* // TABLE OF ResponsibitiesS */}


            {
                showTable &&
                <div className='mt-2 overflow-auto change__scrollbar mb-2 text-sm sm:text-base'>
                    <table className="table table-hover table-bordered">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Sr.</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Name of the Committee</th>
                                <th scope="col">Hosting institute name</th>
                                <th scope="col">Duration of Responsibility</th>
                                <th scope="col">Uploaded Proof</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {data && filteredItems?.map((Responsibities, index) => {
                                return (
                                    <tr key={Responsibities._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{Responsibities.designation}</td>
                                        <td>{Responsibities.committeeName}</td>
                                        <td>{Responsibities.institute}</td>
                                        <td>{Responsibities.duration}</td>
                                        <td><View proof={Responsibities.proof} /></td>
                                        <td>
                                            <Actions item={Responsibities} model="Responsibilities" editState={setEditModal} addState={setResponsibitiesModal} refreshFunction={refetch} pencilClick={() => pencilClick(Responsibities._id)} />
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
                        (data && data?.data?.data === undefined || filteredItems?.length === 0) && <EmptyBox />
                    }
                </div>
            }

        </div>
    )
}

export default Responsibities