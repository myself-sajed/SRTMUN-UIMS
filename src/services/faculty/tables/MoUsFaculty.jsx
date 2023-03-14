import React, { useEffect, useState } from 'react'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Actions from './Actions';
import View from './View';
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import getReq from '../../../components/requestComponents/getReq';
import addReq from '../../../components/requestComponents/addReq';
import Text from '../../../components/formComponents/Text';
import YearSelect from '../../../components/formComponents/YearSelect';
import editReq from '../../../components/requestComponents/editReq';
import UploadFile from '../../../components/formComponents/UploadFile';

const MoUsFaculty = () => {
    const module = "faculty";
    const model = "MoUs"

    const [orgModal, setOrgModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const user = useSelector(state => state.user.user);

    //states
    const initialstate = { Name_of_Organisation_with_whome_mou_signed: "", Duration_of_MoU: "", Year_of_signing_MoU: "", Upload_Proof: "" }
    const [values, setValues] = useState(initialstate)
    const { Name_of_Organisation_with_whome_mou_signed, Duration_of_MoU, Year_of_signing_MoU } = values

    const params = { model: model, id: user?._id, module: module }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))


    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        addReq({ SchoolName: user?.department, userId: user?._id }, model, initialstate, values, setValues, refetch, setIsFormOpen, setLoading, module)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        editReq({ id: itemToDelete._id }, model, initialstate, values, setValues, refetch, setIsFormOpen, setEditModal, setItemToDelete, setLoading, module)
    }

    function pencilClick(itemId) {
        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                const { Name_of_Organisation_with_whome_mou_signed, Duration_of_MoU, Year_of_signing_MoU } = item
                setValues({
                    Name_of_Organisation_with_whome_mou_signed, Duration_of_MoU, Year_of_signing_MoU,
                })
                setIsFormOpen(true)
                setItemToDelete(item)

            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setValues(initialstate);

    }


    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} add="MoUs" editState={setEditModal} clearStates={clearStates} state={setOrgModal} icon={<Diversity3Icon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="MoUS" />

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='MoUsFaculty' title='MoUs' SendReq='MoUs' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setOrgModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit MoUs' : 'Add New MoUs'}</p>

                        <Text className='col-md-6 col-lg-4' id="Name_of_Organisation_with_whome_mou_signed" value={Name_of_Organisation_with_whome_mou_signed} label="Name of Organisation with whome mou signed" setState={setValues} />

                        <Text className='col-md-6 col-lg-4' id="Duration_of_MoU" value={Duration_of_MoU} label="Duration of MoU" setState={setValues} />

                        <YearSelect className='col-md-6 col-lg-4' id="Year_of_signing_MoU" value={Year_of_signing_MoU} label="Year Of Signing Mou" setState={setValues} />

                        <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" required={!editModal} label="Upload actual activity list" setState={setValues} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* TABLE */}

            <div className=' mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Name of Organisation with whome mou signed</th>
                            <th scope="col">Duration of MoU</th>
                            <th scope="col">Year Of Signing Mou</th>
                            <th scope="col">Upload Proof</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && sortByAcademicYear(data?.data, 'Year_of_signing_MoU').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.Name_of_Organisation_with_whome_mou_signed}</td>
                                    <td>{item.Duration_of_MoU}</td>
                                    <td>{item.Year_of_signing_MoU}</td>
                                    <td><View proof={item.Upload_Proof} serviceName="director" /></td>
                                    <td> <Actions item={item} model="MoUs" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setOrgModal} /></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                {
                    isLoading && <Loader />
                }
                {
                    (data && data?.data === undefined) && <EmptyBox />
                }
            </div>
        </div>
    )
}

export default MoUsFaculty