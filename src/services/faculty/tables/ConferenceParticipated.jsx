import React, { useEffect, useState } from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Text from '../../../inputs/Text';
import File from '../../../inputs/File';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import View from './View';
import handleEditWithFile from '../js/handleEditWithFile';
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import {tableHead} from '../../admin/tables_faculty/ConferencePartipeted'
import Lists from '../../../components/tableComponents/Lists';

const ConferenceParticipated = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [orgModal, setOrgModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [programTitle, setProgramTitle] = useState('')
    const [organizingInstitute, SetOrganizingInstitute] = useState('')
    const [nat, setNat] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);
const typeObject = {
    programTitle: 'text', organizingInstitute: 'text', fundedBy: 'text', isNational: Lists.bookChapConfIsNat, year: academicYearGenerator(29,true,true),
}
    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('programTitle', programTitle)
        formData.append('organizingInstitute', organizingInstitute)
        formData.append('isNational', nat)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'ConferenceParticipated', refetch, setLoading, setOrgModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)
        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('programTitle', programTitle)
        formData.append('organizingInstitute', organizingInstitute)
        formData.append('isNational', nat)
        formData.append('file', proof)
        formData.append('year', year)


        handleEditWithFile(formData, 'ConferenceParticipated', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setProgramTitle(item.programTitle)
                SetOrganizingInstitute(item.organizingInstitute)
                setNat(item.isNational)
                setProof(item.file)
                setYear(item.year)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setProgramTitle('')
        SetOrganizingInstitute('')
        setNat('')
        setProof(null)
        setYear('')

    }


    let param = { model: 'ConferenceParticipated', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))
    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header user={user} model='ConferenceParticipated' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="work" editState={setEditModal} clearStates={clearStates} state={setOrgModal} icon={<ConnectWithoutContactIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Conference / Workshop / Seminar Participated"} />

            <BulkExcel data={data?.data?.data} proof='proof' tableHead={tableHead} typeObject={typeObject} commonFilds={{userId:user?._id}} sampleFile='ConferenceParticipatedFaculty' title='Conference Participated' SendReq='ConferenceParticipated' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setOrgModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Conference Participated' : 'Add Conference Participated'}</p>


                        <Text title='Program Title' space='col-md-6' state={programTitle} setState={setProgramTitle} />

                        <Text title='Organizing Institute' space='col-md-6' state={organizingInstitute} setState={SetOrganizingInstitute} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={nat} onChange={(e) => { setNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>

                        <Year state={year} space='col-md-4' setState={setYear} />

                        <File space='col-md-8' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* TABLE */}

            {
                showTable && <div className=' mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Program Title</th>
                                <th scope="col">Organizing Institute</th>
                                <th scope="col">Level</th>
                                <th scope="col"><div className="w-20">Year</div></th>
                                <th scope="col">Upload Proof</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.programTitle}</td>
                                        <td>{item.organizingInstitute}</td>
                                        <td>{item.isNational}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td> <Actions item={item} model="ConferenceParticipated" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setOrgModal} /></td>



                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                    {
                        isLoading && <Loader />
                    }
                    {
                        ((data && data?.data?.data === undefined) || filteredItems.length === 0) && <EmptyBox />
                    }
                </div>
            }
        </div>
    )
}


export default ConferenceParticipated
