import React, { useEffect, useState } from 'react'
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
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
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import { tableHead } from '../../admin/tables_faculty/Patents'
import Lists from '../../../components/tableComponents/Lists';

const PatentPublished = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [patentModal, setPatentModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [patenterName, setPatenterName] = useState('')
    const [patentNumber, setPatentNumber] = useState('')
    const [patentTitle, setPatentTitle] = useState('')
    const [awardYear, setAwardYear] = useState('')
    const [isNat, setIsNat] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [publishedDate, setPublishedDate] = useState('')
    const [fieldDate, setFieldDate] = useState('')
    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);
    const typeObject = {
        patentNumber: 'text', patentTitle: 'text', isNat: Lists.bookChapConfIsNat, awardYear: 'number', fieldDate: 'date', publishedDate: 'date', year: academicYearGenerator( 29, true, true ),
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        let formData = new FormData()
        formData.append('patenterName', patenterName)
        formData.append('patentNumber', patentNumber)
        formData.append('patentTitle', patentTitle)
        formData.append('isNat', isNat)
        formData.append('awardYear', awardYear)
        formData.append('fieldDate', fieldDate)
        formData.append('publishedDate', publishedDate)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'Patent', refetch, setLoading, setPatentModal, setIsFormOpen)
    }


    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('patenterName', patenterName)
        formData.append('patentNumber', patentNumber)
        formData.append('isNat', isNat)
        formData.append('patentTitle', patentTitle)
        formData.append('fieldDate', fieldDate)
        formData.append('publishedDate', publishedDate)
        formData.append('awardYear', awardYear)
        formData.append('file', proof)
        formData.append('year', year)


        handleEditWithFile(formData, 'Patent', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setPatenterName(item.patenterName)
                setPatentNumber(item.patentNumber)
                setPatentTitle(item.patentTitle)
                setAwardYear(item.awardYear)
                setFieldDate(item.fieldDate)
                setPublishedDate(item.publishedDate)
                setIsNat(item.isNat)
                setYear(item.year)
                setProof(item.proof)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setPatenterName(`${user?.salutation} ${user?.name}`)
        setPatentNumber('')
        setPatentTitle('')
        setAwardYear('')
        setFieldDate('')
        setPublishedDate('')
        setIsNat('')
        setYear('')
        setProof(null)
    }

    let param = { model: 'Patent', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))
    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}
            <Header user={user} model='Patent' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Patent" editState={setEditModal} clearStates={clearStates} state={setPatentModal} icon={<DocumentScannerRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Patents published / awarded"} />

            <BulkExcel data={data?.data?.data} proof='proof' tableHead={tableHead} typeObject={typeObject} commonFilds={{userId:user?._id, patenterName: `${user?.salutation} ${user?.name}`}} title='Patents published / awarded' SendReq='Patent' refetch={refetch} module='faculty' open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setPatentModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Patent' : 'Add a new Patent'}</p>


                        <Text title='Patenter Name' space='col-md-6' state={patenterName} setState={setPatenterName} />
                        <Text title='Patent Title' space='col-md-6' state={patentTitle} setState={setPatentTitle} />
                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={isNat} onChange={(e) => { setIsNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>

                        <Text title="Patent Field Date" type="date" state={fieldDate} setState={setFieldDate} />
                        <Text title="Patent Published / Granted Date" type="date" state={publishedDate} setState={setPublishedDate} />
                        <Text title='Patent Number' state={patentNumber} setState={setPatentNumber} />
                        <Text title='Award Year of Patent' state={awardYear} setState={setAwardYear} />
                        <Year space='col-md-4' state={year} setState={setYear} />

                        <File space='col-md-4' title='Upload Proof' setState={setProof} />


                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* TABLE */}



            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Patenter Name</th>
                                <th scope="col">Patent Number</th>
                                <th scope="col">Patent Title</th>
                                <th scope="col">National / International</th>
                                <th scope="col">Patent Field Date</th>
                                <th scope="col">Patent Published / Granted Date</th>
                                <th scope="col">Award Year of Patent </th>
                                <th scope="col"><div className="w-20">Year</div></th>

                                <th scope="col">Uploaded Proof </th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear).map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.patenterName}</td>
                                        <td>{item.patentNumber}</td>
                                        <td>{item.patentTitle}</td>
                                        <td>{item.isNat}</td>
                                        <td>{item.fieldDate}</td>
                                        <td>{item.publishedDate}</td>
                                        <td>{item.awardYear}</td>
                                        <td>{item.year}</td>
                                        <td> <View proof={item.proof} /></td>
                                        <td><Actions item={item} model="Patent" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setPatentModal} /></td>



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






export default PatentPublished