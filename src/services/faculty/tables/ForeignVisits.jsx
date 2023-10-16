import React, { useEffect, useState } from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Text from '../../../inputs/Text';
// import File from '../../../inputs/File';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import submit from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import DateRPicker from '../../../inputs/DateRPicker';
import handleEdit from '../js/handleEdit';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import { tableHead } from '../../admin/tables_faculty/ForaginVisit'

const ForeignVisits = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [orgModal, setOrgModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [purposeOfVisit, setPurposeOfVisit] = useState('')
    const [nameOfTheInstitutionVisited, SetNameOfTheInstitutionVisited] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    // const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);
    const typeObject = {
        purposeOfVisit: 'text', nameOfTheInstitutionVisited: 'text', fromDate: 'date', toDate: 'date', year: academicYearGenerator( 29, true, true ),
    }

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        const data = { userId: user?._id, purposeOfVisit, nameOfTheInstitutionVisited, fromDate, toDate, year }

        submit(data, 'ForeignVisit', refetch, setLoading, setOrgModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)
        // arrange form Data
        const theItem = { itemId: itemToDelete._id, purposeOfVisit, nameOfTheInstitutionVisited, fromDate, toDate, year }

        handleEdit(theItem, 'ForeignVisit', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setPurposeOfVisit(item.purposeOfVisit)
                SetNameOfTheInstitutionVisited(item.nameOfTheInstitutionVisited)
                setFromDate(item.fromDate)
                setToDate(item.toDate)
                setYear(item.year)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setPurposeOfVisit('')
        SetNameOfTheInstitutionVisited('')
        setFromDate('')
        setToDate('')
        setYear('')

    }


    let param = { model: 'ForeignVisit', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div>
            {/* // HEADER */}

            <Header user={user} model='ForeignVisit' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} editState={setEditModal} clearStates={clearStates} state={setOrgModal} icon={<ConnectWithoutContactIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Foreign Visits" />

            <BulkExcel data={data?.data?.data} tableHead={tableHead} typeObject={typeObject} commonFilds={{userId:user?._id}} sampleFile='ForeignVisitFaculty' title='Foreign Visits' SendReq='ForeignVisit' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setOrgModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Foreign Visit' : 'Add a Foreign Visit'}</p>


                        <Text title='Purpose Of Visit' space='col-md-6' state={purposeOfVisit} setState={setPurposeOfVisit} />

                        <Text title='Name Of The Institution Visited' space='col-md-6' state={nameOfTheInstitutionVisited} setState={SetNameOfTheInstitutionVisited} />

                        <DateRPicker title="From" id='From_Date' space='col-md-4' state={fromDate} setState={setFromDate} />

                        <DateRPicker title="To" id='To_Date' space='col-md-4' state={toDate} setState={setToDate} />

                        <Year state={year} space='col-md-4' setState={setYear} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* TABLE */}


            {
                showTable &&
                <div className=' mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Purpose Of Visit</th>
                                <th scope="col">Name Of The Institution Visited</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Year</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.purposeOfVisit}</td>
                                        <td>{item.nameOfTheInstitutionVisited}</td>
                                        <td>{item.fromDate}</td>
                                        <td>{item.toDate}</td>
                                        <td>{item.year}</td>
                                        <td> <Actions item={item} model="ForeignVisit" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setOrgModal} /></td>



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

export default ForeignVisits