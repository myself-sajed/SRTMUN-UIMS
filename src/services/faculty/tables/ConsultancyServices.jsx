import React, { useEffect, useState } from 'react'
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
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

const ConsultancyServices = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [conModal, setConModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [conName, setConName] = useState('')
    const [conProName, setConProName] = useState('')
    const [agency, setAgency] = useState('')
    const [cYear, setCYear] = useState('')
    const [rev, setRev] = useState('')
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
        formData.append('cName', conName)
        formData.append('cProjectName', conProName)
        formData.append('cAgency', agency)
        formData.append('cYear', cYear)
        formData.append('revenue', rev)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'ConsultancyServices', refetch, setLoading, setConModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('cName', conName)
        formData.append('cProjectName', conProName)
        formData.append('cAgency', agency)
        formData.append('cYear', cYear)
        formData.append('revenue', rev)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'ConsultancyServices', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setConName(item.cName)
                setConProName(item.cProjectName)
                setAgency(item.cAgency)
                setCYear(item.cYear)
                setRev(item.revenue)
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setConName(`${user?.salutation} ${user?.name}`)
        setConProName('')
        setAgency('')
        setCYear('')
        setRev('')
        setYear('')
        setProof(null)

    }

    let param = { model: 'ConsultancyServices', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header user={user} model='ConsultancyServices' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Consultancy Service" editState={setEditModal} clearStates={clearStates} state={setConModal} icon={<ConnectWithoutContactRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Consultancy Services"} />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='ConsultancyServicesFaculty' title='Consultancy Services' SendReq='ConsultancyServices' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setConModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Service' : 'Add a new Service'}</p>

                        <Text title='Consultant Name' space='col-md-6' state={conName} setState={setConName} />
                        <Text title='Consultancy Project Name' space='col-md-6' state={conProName} setState={setConProName} />
                        <Text title='Consulting / Sponsoring Agency with contact' space='col-md-6' state={agency} setState={setAgency} />
                        <Text title='Consultancy Year' type="number" state={cYear} space='col-md-2' setState={setCYear} />

                        <Text title='Revenue Generated(INR)' state={rev} setState={setRev} />
                        <Year space='col-md-4' state={year} setState={setYear} />

                        <File space='col-md-8' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* TABLE */}



            {showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base '>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Consultant Name</th>
                            <th scope="col">Consultancy Project Name</th>
                            <th scope="col">Consulting / Sponsoring Agency with contact</th>
                            <th scope="col">Consultancy Year</th>
                            <th scope="col">Revenue Generated(INR)</th>
                            <th scope="col"><div className="w-20">Year</div></th>

                            <th scope="col">Uploaded Proof</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data && filteredItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.cName}</td>
                                    <td>{item.cProjectName}</td>
                                    <td>{item.cAgency}</td>
                                    <td>{item.cYear}</td>
                                    <td>{item.revenue}</td>
                                    <td>{item.year}</td>
                                    <td><View proof={item.proof} /></td>
                                    <td><Actions item={item} model="ConsultancyServices" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setConModal} /></td>

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
            </div>}


        </div>
    )
}









export default ConsultancyServices