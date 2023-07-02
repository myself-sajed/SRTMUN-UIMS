import React, { useEffect, useState } from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
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

const FinancialSupportToAttendConferences = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [jrfModal, setJrfModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    // states
    const [nameOfConference, setNameOfConference] = useState('')
    const [feeprovider, setFeeprovider] = useState('')
    const [amountOfSupport, setAmountOfSupport] = useState('')
    const [pan, setPan] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('nameOfConference', nameOfConference)
        formData.append('amountOfSupport', amountOfSupport)
        formData.append('feeprovider', feeprovider)
        formData.append('pan', pan)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'FinancialSupport', refetch, setLoading, setJrfModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('nameOfConference', nameOfConference)
        formData.append('amountOfSupport', amountOfSupport)
        formData.append('feeprovider', feeprovider)
        formData.append('pan', pan)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'FinancialSupport', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setNameOfConference(item.nameOfConference)
                setAmountOfSupport(item.amountOfSupport)
                setFeeprovider(item.feeprovider)
                setPan(item.pan)
                setProof(item.file)
                setYear(item.year)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setNameOfConference('')
        setAmountOfSupport('')
        setFeeprovider('')
        setPan('')
        setProof(null)
        setYear('')

    }

    let param = { model: 'FinancialSupport', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))
    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} editState={setEditModal} clearStates={clearStates} state={setJrfModal} icon={<CurrencyRupeeIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Financial Support To Attend Conferences"} />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='FinancialSupportToAttendConferencesFaculty' title='Financial Support To Attend Conferences' SendReq='Financialsupport' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}



            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setJrfModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Financial Support' : 'Add a new Financial Support'}</p>

                        <Text title='Name Of Conference' state={nameOfConference} setState={setNameOfConference} />
                        <Text title='Name of professional body Funds provided for' state={feeprovider} setState={setFeeprovider} />
                        <Text title='Ammount of Support' type='number' state={amountOfSupport} setState={setAmountOfSupport} />
                        <Text title='PAN No.' state={pan} setState={setPan} />
                        <Year state={year} setState={setYear} />
                        <File space='col-md-6' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* TABLE */}



            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Name of conference/ workshop attended for which financial support provided</th>
                                <th scope="col">Name of professional body Funds provided for</th>
                                <th scope="col">Amount of support</th>
                                <th scope="col">PAN No.</th>
                                <th scope="col"><div className="w-20">Year</div></th>
                                <th scope="col">Uploaded Proof</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nameOfConference}</td>
                                        <td>{item.feeprovider}</td>
                                        <td>{item.amountOfSupport}</td>
                                        <td>{item.pan}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td> <Actions item={item} model="FinancialSupport" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setJrfModal} /></td>

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

export default FinancialSupportToAttendConferences
