import React, { useEffect, useState } from 'react'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
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

const ResearchProjects = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [projectModal, setProjectModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    //states
    const [projectName, setProjectName] = useState('')
    const [programTitle, setProgramTitle] = useState('')
    const [invName, setInvName] = useState('')
    const [fundingName, setFundingName] = useState('')
    const [fundType, setFundType] = useState('')
    const [gov, setGov] = useState('')
    const [department, setDepartment] = useState('')
    const [awardDate, setAwardDate] = useState('')
    const [funds, setFunds] = useState('')
    const [status, setStatus] = useState('')
    const [proof, setProof] = useState(null)
    const [duration, setDuration] = useState('')
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
        formData.append('schemeName', projectName)
        formData.append('programTitle', programTitle)
        formData.append('principalName', invName)
        formData.append('fundingName', fundingName)
        formData.append('isGov', gov)
        formData.append('department', department)
        formData.append('awardYear', awardDate)
        formData.append('providedFunds', funds)
        formData.append('fundType', fundType)
        formData.append('status', status)
        formData.append('projectDuration', duration)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'ResearchProject', refetch, setLoading, setProjectModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('schemeName', projectName)
        formData.append('programTitle', programTitle)
        formData.append('principalName', invName)
        formData.append('fundingName', fundingName)
        formData.append('isGov', gov)
        formData.append('department', department)
        formData.append('awardYear', awardDate)
        formData.append('providedFunds', funds)
        formData.append('fundType', fundType)
        formData.append('status', status)
        formData.append('projectDuration', duration)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'ResearchProject', setEditModal, refetch, setLoading, setIsFormOpen)


    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setProjectName(item.schemeName)
                setProgramTitle(item.programTitle)
                setInvName(item.principalName)
                setFundingName(item.fundingName)
                setGov(item.isGov)
                setDepartment(item.department)
                setFundType(item.fundType)
                setAwardDate(item.awardYear)
                setStatus(item.status)
                setFunds(item.providedFunds)
                setDuration(item.projectDuration)
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setProjectName('')
        setProgramTitle('')
        setInvName('')
        setFundingName('')
        setGov('')
        setDepartment('')
        setAwardDate('')
        setFunds('')
        setFundType('')
        setStatus('')
        setDuration('')
        setYear('')



    }

    let param = { model: 'ResearchProject', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div>
            {/* // HEADER */}


            <Header showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Projects" editState={setEditModal} clearStates={clearStates} state={setProjectModal} icon={<ScienceRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Research Projects"} />

            {/* // 2. FIELDS */}

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='ResearchProjectFaculty' title='Research Projects' SendReq='ResearchProject' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setProjectModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Project Details' : 'Add a new Project'}</p>


                        <Text title='Scheme or Project Name' state={projectName} setState={setProjectName} />

                        <Text title='Program Title' state={programTitle} setState={setProgramTitle} />

                        <Text title='Principal Invigilator Name' state={invName} setState={setInvName} />

                        <Text title='Funding Agency Name' state={fundingName} setState={setFundingName} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather Government / Non-Government</label>
                            <select className="form-select" id="validationCustom05" required
                                value={gov} onChange={(e) => { setGov(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Government">Government</option>
                                <option value="Non-Government">Non-Government</option>
                            </select>
                        </div>


                        <Text title='Department' state={department} setState={setDepartment} />

                        <Text type="number" title='Award Year' state={awardDate} setState={setAwardDate} />

                        <Text title='Provided Funds (INR)' state={funds} setState={setFunds} />

                        <div className="col-md-4">

                            <label htmlFor="fundType" className="form-label">Wheather Major / Minor</label>
                            <select className="form-select" id="fundType" required
                                value={fundType} onChange={(e) => { setFundType(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Major">Major (More than 10 Lacks)</option>
                                <option value="Minor">Minor (Less than 10 Lacks)</option>
                            </select>
                        </div>

                        <div className="col-md-4">

                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" required
                                value={status} onChange={(e) => { setStatus(e.target.value) }}>

                                <option selected disabled value="">Choose</option>
                                <option value="Completed">Completed</option>
                                <option value="Ongoing">Ongoing</option>
                            </select>
                        </div>

                        <Text type="number" title='Project Duration (Year)' space='col-md-3' state={duration} setState={setDuration} />

                        <Year state={year} setState={setYear} />

                        <File space='col-md-9' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>




            {/* // TABLE */}


            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    {/* <div className=' overflow-auto change__scrollbar mb-2 '> */}
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col"><div className='w-44'>Scheme/Project Name</div></th>
                                <th scope="col"><div className='w-44'>Program Title</div></th>
                                <th scope="col"><div className='w-44'>Principal Invigilator Name</div></th>
                                <th scope="col"><div className='w-44'>Funding Agency Name</div></th>
                                <th scope="col">Government / Non-Government</th>
                                <th scope="col">Department</th>
                                <th scope="col">Award Year</th>
                                <th scope="col"><div className='w-44'>Provided Funds (INR)</div></th>
                                <th scope="col">Major/Minor</th>
                                <th scope="col">Project Status</th>
                                <th scope="col">Project Duration</th>
                                <th scope="col"><div className="w-20">Year</div></th>
                                <th scope="col">Proof of Sactioned Project</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.schemeName}</td>
                                        <td>{item.programTitle}</td>
                                        <td>{item.principalName}</td>
                                        <td>{item.fundingName}</td>
                                        <td>{item.isGov}</td>
                                        <td>{item.department}</td>
                                        <td>{item.awardYear}</td>
                                        <td>{item.providedFunds}</td>
                                        <td>{item.fundType}</td>
                                        <td>{item.status}</td>
                                        <td>{item.projectDuration}</td>
                                        <td>{item.year}</td>
                                        <td><View proof={item.proof} /></td>
                                        <td><Actions item={item} model="ResearchProject" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setProjectModal} /></td>


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









export default ResearchProjects