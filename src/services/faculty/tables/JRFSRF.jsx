import React, { useEffect, useState } from 'react'
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
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

const JRFSRF = () => {
    const [jrfModal, setJrfModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    // states
    const [fellowName, setFellowName] = useState('')
    const [enDate, setEnDate] = useState('')
    const [fellowDuration, setFellowDuration] = useState('')
    const [fellowType, setFellowType] = useState('')
    const [grantingAgency, setGrantingAgency] = useState('')
    const [exam, setExam] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [res, setRes] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('researchName', fellowName)
        formData.append('enrolmentYear', enDate)
        formData.append('fellowshipDuration', fellowDuration)
        formData.append('fellowshipType', fellowType)
        formData.append('grantingAgency', grantingAgency)
        formData.append('qualifyingExam', exam)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user._id)

        submitWithFile(formData, 'jrfsrf', refetch, setLoading, setJrfModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('researchName', fellowName)
        formData.append('enrolmentYear', enDate)
        formData.append('fellowshipDuration', fellowDuration)
        formData.append('fellowshipType', fellowType)
        formData.append('grantingAgency', grantingAgency)
        formData.append('qualifyingExam', exam)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'JrfSrf', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setFellowName(item.researchName)
                setEnDate(item.enrolmentYear)
                setFellowDuration(item.fellowshipDuration)
                setFellowType(item.fellowshipType)
                setGrantingAgency(item.grantingAgency)
                setExam(item.qualifyingExam)
                setProof(item.file)
                setYear(item.year)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setFellowName('')
        setEnDate('')
        setFellowDuration('')
        setFellowType('')
        setGrantingAgency('')
        setExam('')
        setProof(null)
        setYear('')

    }

    let param = { model: 'JrfSrf', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))



    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} add="Fellow" editState={setEditModal} clearStates={clearStates} state={setJrfModal} icon={<PersonSearchRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="JRF, SRF, Post Doctoral Fellows, Research Associate" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='JrfSrfFaculty' title='JRF, SRF, Post Doctoral Fellows, Research Associate' SendReq='JrfSrf' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}



            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setJrfModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Fellow' : 'Add a new Fellow'}</p>

                        <Text title='Research Fellow Name' state={fellowName} setState={setFellowName} />
                        <Text title='Enrolment Date' type='date' state={enDate} setState={setEnDate} />
                        <Text title='Fellowship Duration' state={fellowDuration} setState={setFellowDuration} />
                        <Text title='Fellowship Type' state={fellowType} setState={setFellowType} />
                        <Text title='Granting Agency' state={grantingAgency} setState={setGrantingAgency} />
                        <Text title='Qualifying Exam (if any)' state={exam} setState={setExam} />
                        <Year state={year} setState={setYear} />

                        <File space='col-md-6' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Research Fellow Name</th>
                            <th scope="col">Enrolment Year</th>
                            <th scope="col">Fellowship Duration</th>
                            <th scope="col">Fellowship Type</th>
                            <th scope="col">Granting Agency</th>
                            <th scope="col">Qualifying Exam (if any)</th>
                            <th scope="col"><div className="w-20">Year</div></th>

                            <th scope="col">Uploaded Proof</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                    {data &&data? sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.researchName}</td>
                                    <td>{item.enrolmentYear}</td>
                                    <td>{item.fellowshipDuration}</td>
                                    <td>{item.fellowshipType}</td>
                                    <td>{item.grantingAgency}</td>
                                    <td>{item.qualifyingExam}</td>
                                    <td>{item.year}</td>
                                    <td><View proof={item.proof} /></td>
                                    <td> <Actions item={item} model="JrfSrf" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setJrfModal} /></td>

                                </tr>
                            )
                        }):[]}

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


export default JRFSRF