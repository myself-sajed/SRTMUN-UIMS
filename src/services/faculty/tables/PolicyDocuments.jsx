import React, { useEffect, useState } from 'react'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
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
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';




const PolicyDocument = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [orgModal, setOrgModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [policyName, setPolicyName] = useState('')
    const [organizationName, setOrganizationName] = useState('')
    const [isNat, setIsNat] = useState('')
    const [year, setYear] = useState('')
    const [proof, setProof] = useState(null)
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
        formData.append('policyName', policyName)
        formData.append('organizationName', organizationName)
        formData.append('isNat', isNat)
        formData.append('file', proof)
        formData.append('year', year)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'PolicyDocuments', refetch, setLoading, setOrgModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)
        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('policyName', policyName)
        formData.append('organizationName', organizationName)
        formData.append('isNat', isNat)
        formData.append('file', proof)
        formData.append('year', year)


        handleEditWithFile(formData, 'PolicyDocuments', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setPolicyName(item.policyName)
                setOrganizationName(item.organizationName)
                setIsNat(item.isNat)
                setProof(item.file)
                setYear(item.year)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setPolicyName('')
        setOrganizationName('')
        setIsNat('')
        setProof(null)
        setYear('')

    }


    let param = { model: 'PolicyDocuments', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))
    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Policy Document" editState={setEditModal} clearStates={clearStates} state={setOrgModal} icon={<ArticleRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Policy Documents"} />

            {/* <BulkExcel data={data?.data?.data} proof='proof' sampleFile='PolicyDocumentFaculty' title='Policy Documents' SendReq='PolicyDocument' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} /> */}

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setOrgModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Policy Document' : 'Add a Policy Document'}</p>


                        <Text title='Policy Name' space='col-md-6' state={policyName} setState={setPolicyName} />


                        <div className="col-md-6">
                            <label htmlFor="validationCustom05" className="form-label">Organisation Name</label>
                            <select className="form-select" id="validationCustom05" required
                                value={organizationName} onChange={(e) => { setOrganizationName(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="International Body">International Body</option>
                                <option value="Organizations like UNO / UNESCO / World Bank / IMF etc.">Organizations like UNO / UNESCO/ World Bank / IMF etc.</option>
                                <option value="Central Government / State Government">Central Government / State Government</option>
                            </select>
                        </div>
                        <div className='col-md-4'>

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={isNat} onChange={(e) => { setIsNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="State">State</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>

                        <Year state={year} setState={setYear} />

                        <File space="col-md-6" title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* TABLE */}

            {
                showTable && <div className=' mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Policy Name</th>
                                <th scope="col">Organisation Name</th>
                                <th scope="col">Type / Level</th>
                                <th scope="col"><div className="w-20">Year</div></th>
                                <th scope="col">Upload Proof</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.policyName}</td>
                                        <td>{item.organizationName}</td>
                                        <td>{item.isNat}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td> <Actions
                                            item={item} model="PolicyDocuments" refreshFunction={refetch}
                                            pencilClick={() => pencilClick(item._id)} editState={setEditModal}
                                            addState={setOrgModal} /></td>



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


export default PolicyDocument
