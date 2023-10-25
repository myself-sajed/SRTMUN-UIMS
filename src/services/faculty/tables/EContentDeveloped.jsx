import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CloudIcon from '@mui/icons-material/Cloud';
import Header from '../components/Header';
import submit, { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import Text from '../../../inputs/Text';
import handleEdit from '../js/handleEdit';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import Lists from '../../../components/tableComponents/Lists'
import { tableHead } from '../../admin/tables_faculty/EContentDeveloped'
import File from '../../../inputs/File';
import View from './View';
import handleEditWithFile from '../js/handleEditWithFile';


const EContentDeveloped = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [eCont, setECont] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [moduleName, setModuleName] = useState('')
    const [platform, setPlatform] = useState('')
    const [year, setYear] = useState('')
    const [creationType, setCreationType] = useState('')
    const [link, setLink] = useState('')
    const [proof, setProof] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])
    const [editId, setEditId] = useState(null)

    const user = useSelector(state => state.user.user);
    const typeObject = {
        moduleName: 'text', creationType: Lists.eContentCreation, platform: 'text', year: academicYearGenerator(29, true, true), link: 'text',
    }
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        let formData = new FormData()
        formData.append('moduleName', moduleName)
        formData.append('platform', platform)
        formData.append('year', year)
        formData.append('creationType', creationType)
        formData.append('link', link)
        formData.append('userId', user?._id)
        formData.append('file', proof)

        submitWithFile(formData, 'EContentDeveloped', refetch, setLoading, setECont, setIsFormOpen)

    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        let formData = new FormData()
        formData.append('moduleName', moduleName)
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', proof)
        formData.append('platform', platform)
        formData.append('year', year)
        formData.append('creationType', creationType)
        formData.append('userId', user?._id)
        formData.append('link', link)
        formData.append('file', proof)

        handleEditWithFile(formData, 'EContentDeveloped', setEditModal, refetch, setLoading, setIsFormOpen)


    }

    function pencilClick(itemId) {
        setEditId(itemId)
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setModuleName(item.moduleName)
                setPlatform(item.platform)
                setYear(item.year)
                setLink(item.link)
                setCreationType(item.creationType)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setModuleName('')
        setPlatform('')
        setYear('')
        setCreationType('')
        setLink('')
        setProof(null)

    }

    let param = { model: 'EContentDeveloped', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    useEffect(() => {

        if (editModal === true) {

            data?.data?.data?.forEach(function (item) {
                if (item._id === editId) {

                    if (creationType === 'Design of new curriculla & courses') {
                        setPlatform("")
                        setLink("N/A")
                        setModuleName(item.moduleName)
                        setYear(item.year)
                    } else {
                        setModuleName(item.moduleName)
                        setPlatform(item.platform)
                        setYear(item.year)
                        setLink(item.link)

                    }
                }
            })
        } else {
            if (creationType === 'Design of new curriculla & courses') {
                setPlatform("")
                setLink("N/A")
            } else {
                setPlatform("")
                setLink("")
            }
        }



    }, [creationType, editModal])




    return (
        <div>
            {/* // HEADER */}

            <Header showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Content" editState={setEditModal} clearStates={clearStates} state={setECont} icon={<CloudIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "E-Content Developed"} />

            <BulkExcel data={data?.data?.data} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile='EContentDevelopedFaculty' title='EContent Developed' SendReq='EContentDeveloped' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setECont(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Content' : 'Add a new Content'}</p>


                        <Text title='Name of the Module / Course developed' space='col-md-6' state={moduleName} setState={setModuleName} />

                        <div className="col-md-6">

                            <label htmlFor="validationCustom05" className="form-label">Type of Creation</label>
                            <select className="form-select" id="validationCustom05" required
                                value={creationType} onChange={(e) => { setCreationType(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Development of Innovative Pedagogy">Development of Innovative Pedagogy</option>
                                <option value="Design of new curriculla & courses">Design of new curriculla & courses</option>
                                <option value="MOOCS">MOOCS</option>
                                <option value="E-Content">E-Content</option>
                            </select>
                        </div>




                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Platform on which the module is developed</label>
                            <select disabled={creationType === "Design of new curriculla & courses" && true} className="form-select" id="validationCustom05" required
                                value={platform} onChange={(e) => { setPlatform(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="For e-PG-Pathshala" >For e-PG-Pathshala</option>
                                <option value="For SWAYAM" >For SWAYAM</option>
                                <option value="For MOOCs Platforms" >For MOOCs Platforms</option>
                                <option value="Any other Government Initiatives" >Any other Government Initiatives</option>
                                <option value="For Institutional LMS" >For Institutional LMS</option>
                            </select>
                        </div>

                        <Year space='col-md-3' state={year} setState={setYear} />



                        <Text title='Web Link to the content' disabled={creationType === "Design of new curriculla & courses" && true} state={link} space='col-md-5' setState={setLink} required={false} />

                        <File disabled={creationType === "Design of new curriculla & courses" && true} space='col-md-4' title='Upload Proof' setState={setProof} />


                    </FormWrapper>
                </DialogContent>
            </Dialog>





            {/* TABLE */}



            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Name of the Module / Course developed</th>
                                <th scope="col">Type of Creation</th>
                                <th scope="col">Platform on which the module is developed</th>
                                <th scope="col"><div className="w-20">Year</div></th>
                                <th scope="col"><div className="w-64">Link to content</div></th>
                                <th scope="col">Proof</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>

                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.moduleName}</td>
                                        <td>{item.creationType}</td>
                                        <td>{item.platform}</td>
                                        <td>{item.year}</td>


                                        <td>
                                            {item?.link === 'N/A' ? 'N/A' : <a href={item?.link} target="_blank" className='text-blue-500 hover:text-blue-900 ease-in-out duration-200'>
                                                {item?.link?.slice(0, 30)}{item?.link?.length > 30 && `...`}</a>}
                                        </td>

                                        <td>
                                            <View proof={item?.proof} />
                                        </td>

                                        <td><Actions item={item} model="EContentDeveloped" refreshFunction={refetch} editState={setEditModal} addState={setECont} pencilClick={() => pencilClick(item._id)} /></td>
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









export default EContentDeveloped