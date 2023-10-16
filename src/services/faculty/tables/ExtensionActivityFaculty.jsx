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
import { tableHead } from '../../admin/tables_director/ExtensionActivities'
import { academicYearGenerator } from '../../../inputs/Year';

const ExtensionActivityFaculty = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const module = "faculty";
    const model = "ExtensionActivities";

    const [orgModal, setOrgModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);
    const typeObject = {
        Name_of_the_activity: "text", Organising_unit: "text", Name_of_the_scheme: "text", Year_of_activity: academicYearGenerator( 29, true, true ), Number_of_students: "number"
      } 

    //states
    const initialstate = { Name_of_the_activity: "", Organising_unit: "", Name_of_the_scheme: "", Year_of_activity: "", Number_of_students: "", Upload_Proof: "" }
    const [values, setValues] = useState(initialstate)
    const { Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students } = values

    const params = { model: model, id: user?._id, module: module }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))


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
                const { Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students } = item
                setValues({
                    Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students
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


    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data, 'Year_of_activity', filterByAcademicYear, academicYear))
    }, [data])


    return (
        <div>
            {/* // HEADER */}

            <Header showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} editState={setEditModal} clearStates={clearStates} state={setOrgModal} icon={<Diversity3Icon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Extension Activities"} />

            <BulkExcel data={data?.data} proof='Upload_Proof' tableHead={tableHead} typeObject={typeObject} commonFilds={{userId:user?._id, SchoolName:user?.department}} title='Extension Activities' SendReq={model} refetch={refetch} module='director' open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}

            {/* , , , ,  */}
            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setOrgModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Extension Activity' : 'Add New Extension Activity'}</p>

                        <Text className='col-md-6 col-lg-4' id="Name_of_the_activity" value={Name_of_the_activity} label="Name of Activity" setState={setValues} />

                        <Text className='col-md-6 col-lg-4' id="Organising_unit" value={Organising_unit} label="Organising unit/ agency/ collaborating agency" setState={setValues} />

                        <Text className='col-md-6 col-lg-4' id="Name_of_the_scheme" value={Name_of_the_scheme} label="Name of the Scheme" setState={setValues} />

                        <YearSelect className='col-md-6 col-lg-4' id="Year_of_activity" value={Year_of_activity} label="Year Of Activity" setState={setValues} />

                        <Text className='col-md-6 col-lg-4' id="Number_of_students" value={Number_of_students} label="Number of students participated in such activities" type='number' setState={setValues} />

                        <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" required={!editModal} label="Upload actual activity list" setState={setValues} />

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
                                <th scope="col">Name of Activity</th>
                                <th scope="col">Organising unit/ agency/ collaborating agency</th>
                                <th scope="col">Name of the Scheme</th>
                                <th scope="col">Year Of Activity</th>
                                <th scope="col">Number of students participated in such activities</th>
                                <th scope="col">Upload actual activity list</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.Name_of_the_activity}</td>
                                        <td>{item.Organising_unit}</td>
                                        <td>{item.Name_of_the_scheme}</td>
                                        <td>{item.Year_of_activity}</td>
                                        <td>{item.Number_of_students}</td>
                                        <td><View proof={item.Upload_Proof} serviceName="director" /></td>
                                        <td> <Actions item={item} model={model} refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setOrgModal} /></td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                    {
                        isLoading && <Loader />
                    }
                    {
                        (data && data?.data === undefined || filteredItems.length === 0) && <EmptyBox />
                    }
                </div>

            }
        </div>
    )
}

export default ExtensionActivityFaculty