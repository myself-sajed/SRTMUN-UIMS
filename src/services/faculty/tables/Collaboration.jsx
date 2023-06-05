import React, { useEffect, useState } from 'react'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
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

const Collaboration = ({ filterByAcademicYear = false, academicYear }) => {
    const [collModal, setCollModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [collTitle, setCollTitle] = useState('')
    const [agencyName, setAgencyName] = useState('')
    const [name, setName] = useState('')
    const [cYear, setCYear] = useState('')
    const [duration, setDuration] = useState('')
    const [nature, setNature] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])


    const [res, setRes] = useState('')

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('collabTitle', collTitle)
        formData.append('agencyName', agencyName)
        formData.append('participantName', name)
        formData.append('collabYear', cYear)
        formData.append('duration', duration)
        formData.append('activityNature', nature)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'collaborations', refetch, setLoading, setCollModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('collabTitle', collTitle)
        formData.append('agencyName', agencyName)
        formData.append('participantName', name)
        formData.append('collabYear', cYear)
        formData.append('duration', duration)
        formData.append('activityNature', nature)
        formData.append('file', proof)
        formData.append('year', year)


        handleEditWithFile(formData, 'Collaboration', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setCollTitle(item.collabTitle)
                setAgencyName(item.agencyName)
                setName(item.participantName)
                setCYear(item.collabYear)
                setDuration(item.duration)
                setNature(item.activityNature)
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setCollTitle('')
        setAgencyName('')
        setName('')
        setCYear('')
        setDuration('')
        setNature('')
        setYear('')
        setProof(null)



    }


    let param = { model: 'Collaboration', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Collaboration" editState={setEditModal} clearStates={clearStates} state={setCollModal} icon={<GroupRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Collaborations" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='CollaborationFaculty' title='Collaborations' SendReq='Collaboration' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setCollModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Collaboration' : 'Add a new Collaboration'}</p>


                        <Text title='Title of the collaborative activity' space='col-md-6' state={collTitle} setState={setCollTitle} />

                        <Text title='Name of the collaborating agency with contact details' space='col-md-6' state={agencyName} setState={setAgencyName} />

                        <Text title='Participant Name' space='col-md-6' state={name} setState={setName} />
                        <Text title='Year of Collaboration' type="number" state={cYear} space='col-md-2' setState={setCYear} />

                        <Text title='Duration' state={duration} setState={setDuration} />

                        <Text title='Activity Nature' state={nature} setState={setNature} />

                        <Year space='col-md-4' state={year} setState={setYear} />


                        <File space='col-md-4' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>





            {/* TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col"><div className="w-52">Title of the collaborative activity</div></th>
                            <th scope="col"><div className="w-52">Name of the collaborating agency with contact details</div></th>
                            <th scope="col">Participant Name</th>
                            <th scope="col">Year of Collaboration</th>
                            <th scope="col">Duration</th>
                            <th scope="col"><div className="w-24">Nature of the activity</div></th>
                            <th scope="col"><div className="w-20">Year</div></th>

                            <th scope="col">Uploaded Proof</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>

                    <tbody>
                        {data && filteredItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.collabTitle}</td>
                                    <td>{item.agencyName}</td>
                                    <td>{item.participantName}</td>
                                    <td>{item.collabYear}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.activityNature}</td>
                                    <td>{item.year}</td>
                                    <td> <View proof={item.proof} /></td>
                                    <td> <Actions item={item} model="Collaboration" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setCollModal} /></td>



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









export default Collaboration