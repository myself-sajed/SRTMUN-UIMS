import React, { useEffect, useState } from 'react'
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import File from '../../../inputs/File';
import Text from '../../../inputs/Text';
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

const OnlineFDP = () => {

    const [onlineFDPModal, setOnlineFDPModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [teacherName, setTeacherName] = useState('')
    const [programTitle, setProgramTitle] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('nameOfAttendedTeacher', teacherName)
        formData.append('programTitle', programTitle)
        formData.append('durationFrom', from)
        formData.append('durationTo', to)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user._id)

        submitWithFile(formData, 'Online', refetch, setLoading, setOnlineFDPModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('nameOfAttendedTeacher', teacherName)
        formData.append('programTitle', programTitle)
        formData.append('durationFrom', from)
        formData.append('durationTo', to)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'Online', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setTeacherName(item.nameOfAttendedTeacher)
                setProgramTitle(item.programTitle)
                setFrom(item.durationFrom)
                setTo(item.durationTo)
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
        setProgramTitle('')
        setFrom('')
        setTo('')
        setYear('')
        setProof(null)

    }


    let param = { model: 'Online', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))



    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} add="Programmes" editState={setEditModal} clearStates={clearStates} state={setOnlineFDPModal} icon={<SentimentVerySatisfiedRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Online/Face-to-face Faculty Development Programmes(FDP)" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='OnlineORFasetoFaseFDPFaculty' title='Online/Face-to-face Faculty Development Programmes(FDP)' SendReq='Online' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setOnlineFDPModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Content' : 'Add a new Content'}</p>


                        <Text title='Program Title' state={programTitle} setState={setProgramTitle} />
                        <Text title='Organized by' state={teacherName} setState={setTeacherName} />


                        <Text title='Duration From' state={from} setState={setFrom} type='date' />

                        <Text title='Duration to' state={to} setState={setTo} type='date' />

                        <Year state={year} setState={setYear} />


                        <File space='col-md-6' title='Upload Proof' setState={setProof} />


                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* // TABLE */}
            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Program Title</th>
                            <th scope="col">Organized by</th>
                            <th scope="col"><div className="w-28">Duration From</div></th>
                            <th scope="col"><div className="w-28">Duration To</div></th>
                            <th scope="col"><div className="w-20">Year</div></th>
                            <th scope="col">Certificate</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.programTitle}</td>
                                    <td>{item.nameOfAttendedTeacher}</td>
                                    <td>{item.durationFrom}</td>
                                    <td>{item.durationTo}</td>
                                    <td>{item.year}</td>
                                    <td><View proof={item.proof} /></td>
                                    <td><Actions item={item} model="Online" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setOnlineFDPModal} /></td>



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








export default OnlineFDP

