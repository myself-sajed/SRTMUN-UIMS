import React, { useEffect, useState } from 'react'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
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

const Fellowship = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [fellowshipModal, setFellowshipModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states 
    const [teacherName, setTeacherName] = useState('')
    const [awardYear, setAwardYear] = useState('')
    const [awardName, setAwardName] = useState('')
    const [agency, setAgency] = useState('')
    const [proof, setProof] = useState(null)
    const [isNat, setIsNat] = useState('')
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])
    const [res, setRes] = useState('')

    const user = useSelector(state => state.user.user);
const typeObject = {

}
const tableHead = {

}

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('teacherName', teacherName)
        formData.append('awardName', awardName)
        formData.append('awardYear', awardYear)
        formData.append('awardingAgency', agency)
        formData.append('isNat', isNat)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'Fellowship', refetch, setLoading, setFellowshipModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('teacherName', teacherName)
        formData.append('awardName', awardName)
        formData.append('isNat', isNat)
        formData.append('awardYear', awardYear)
        formData.append('awardingAgency', agency)
        formData.append('file', proof)
        formData.append('year', year)


        handleEditWithFile(formData, 'Fellowship', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setTeacherName(item.teacherName)
                setAwardName(item.awardName)
                setAwardYear(item.awardYear)
                setAgency(item.awardingAgency)
                setIsNat(item.isNat)
                setYear(item.year)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setTeacherName(`${user?.salutation} ${user?.name}`)
        setAwardName('')
        setAwardYear('')
        setIsNat('')
        setAgency('')
        setYear('')
        setProof(null)

    }

    let param = { model: 'Fellowship', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header user={user} model='Fellowship' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Fellowship Assistance" editState={setEditModal} clearStates={clearStates} state={setFellowshipModal} icon={<AttachMoneyRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Fellowship/Financial assistance for advanced studies/research"} />

            <BulkExcel data={data?.data?.data} proof='proof' tableHead={tableHead} typeObject={typeObject} commonFilds={{userId:user?._id}} sampleFile='FellowshipFaculty' title='Fellowship/Financial assistance for advanced studies/research' SendReq='Fellowship' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />
            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setFellowshipModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Content' : 'Add a new Content'}</p>


                        <Text space='col-md-8' title='Name of the teacher awarded national/international fellowship/financial support' state={teacherName} setState={setTeacherName} />

                        <Text title='Award Year' type="number" state={awardYear} setState={setAwardYear} />
                        <Text space='col-md-6' title='Name of the award/fellowship' state={awardName} setState={setAwardName} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={isNat} onChange={(e) => { setIsNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>


                        <Text space='col-md-6' title='Awarding Agency' state={agency} setState={setAgency} />
                        <Year state={year} setState={setYear} />

                        <File space='col-md-6' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* TABLE */}


            {
                showTable &&
                <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col"><div className="w-96">Name of the teacher awarded national/international fellowship/financial support</div></th>
                                <th scope="col">Name of the award/fellowship</th>
                                <th scope="col">Award Year</th>
                                <th scope="col">National / International</th>
                                <th scope="col">Awarding Agency</th>
                                <th scope="col"><div className="w-20">Year</div></th>

                                <th scope="col">Upload Proof</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.teacherName}</td>
                                        <td>{item.awardName}</td>
                                        <td>{item.awardYear}</td>
                                        <td>{item.isNat}</td>
                                        <td>{item.awardingAgency}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td><Actions item={item} model="Fellowship" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setFellowshipModal} /></td>



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






export default Fellowship