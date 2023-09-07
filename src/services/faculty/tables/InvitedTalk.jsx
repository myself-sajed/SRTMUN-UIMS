import React, { useEffect, useState } from 'react'
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
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
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import { Dialog, DialogContent, LinearProgress } from '@mui/material';
import FormWrapper from '../components/FormWrapper';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';

const InvitedTalk = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [talkModal, setTalkModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [sessionTitle, setSessionTitle] = useState('')
    const [seminarTitle, setSeminarTitle] = useState('')
    const [organizedBy, setOrganizedBy] = useState('')
    const [isNat, setIsNat] = useState('')
    const [nature, setNature] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        console.log('Start')
        e.preventDefault();
        setLoading(true)

        let formData = new FormData()
        formData.append('lectureTitle', sessionTitle)
        formData.append('seminarTitle', seminarTitle)
        formData.append('organizedBy', organizedBy)
        formData.append('isNat', isNat)
        formData.append('nature', nature)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user._id)

        submitWithFile(formData, 'InvitedTalk', refetch, setLoading, setTalkModal, setIsFormOpen)

    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('lectureTitle', sessionTitle)
        formData.append('nature', nature)
        formData.append('seminarTitle', seminarTitle)
        formData.append('organizedBy', organizedBy)
        formData.append('isNat', isNat)
        formData.append('file', proof)
        formData.append('year', year)


        handleEditWithFile(formData, 'InvitedTalk', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setSessionTitle(item.lectureTitle)
                setSeminarTitle(item.seminarTitle)
                setOrganizedBy(item.organizedBy)
                setNature(item.nature)
                setIsNat(item.isNat)
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setSessionTitle('')
        setSeminarTitle('')
        setOrganizedBy('')
        setIsNat('')
        setNature('')
        setYear('')
        setProof(null)

    }

    let param = { model: 'InvitedTalk', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header user={user} model='InvitedTalk' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Invited Talk" editState={setEditModal} clearStates={clearStates} state={setTalkModal} icon={<HeadsetMicRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Invited Talks / Resource Person / Paper presentation"} />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='InvitedTalkFaculty' title='Invited Talk' SendReq='InvitedTalk' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}




            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setTalkModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Talk' : 'Add a new Talk'}</p>


                        <Text title='Title of Lecture/Academic Session' space='col-md-6' state={sessionTitle} setState={setSessionTitle} />

                        <Text title='Title of Seminar' space='col-md-6' state={seminarTitle} setState={setSeminarTitle} />

                        <Text title='Organized by' space='col-md-4' state={organizedBy} setState={setOrganizedBy} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={isNat} onChange={(e) => { setIsNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="State/University">State/University</option>
                                <option value="National">National</option>
                                <option value="International (within country)">International (within country)</option>
                                <option value="International (Abroad)">International (Abroad)</option>
                            </select>
                        </div>

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Choose Nature</label>
                            <select className="form-select" id="validationCustom05" required
                                value={nature} onChange={(e) => { setNature(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Invited Talk">Invited Talk</option>
                                <option value="Resource Person">Resource Person</option>
                                <option value="Paper Presentation">Paper Presentation</option>
                            </select>
                        </div>

                        <Year space='col-md-4' state={year} setState={setYear} />

                        <File space='col-md-4' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* TABLE */}



            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar text-sm sm:text-base'>
                    <table className="table table-bordered table-hover ">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Title of Lecture/Academic Session</th>
                                <th scope="col">Title of Seminar</th>
                                <th scope="col">Organized by </th>
                                <th scope="col">Type</th>
                                <th scope="col">Nature</th>
                                <th scope="col"><div className="w-20">Year</div></th>

                                <th scope="col">Upload Proof</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.lectureTitle}</td>
                                        <td>{item.seminarTitle}</td>
                                        <td>{item.organizedBy}</td>
                                        <td>{item.isNat}</td>
                                        <td>{item.nature}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td><Actions item={item} model="InvitedTalk" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setTalkModal} /></td>
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

        </div>
    )
}









export default InvitedTalk