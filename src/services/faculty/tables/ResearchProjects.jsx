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
import { Dialog, DialogContent, useStepContext } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import FromToDate from '../../../inputs/FromToDate';

const ResearchProjects = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {
    const [projectModal, setProjectModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    //states
    const [projectName, setProjectName] = useState('')
    const [programTitle, setProgramTitle] = useState('')
    const [invName, setInvName] = useState('')
    const [coInvName, setCoInvName] = useState('-')
    const [fundingName, setFundingName] = useState('')
    const [fundType, setFundType] = useState('')
    const [gov, setGov] = useState('')
    const [department, setDepartment] = useState('')
    const [awardDate, setAwardDate] = useState('')
    const [funds, setFunds] = useState('')
    const [status, setStatus] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [fromDate, setFromDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [editItem, setEditItem] = useState(null)
    const [active, setActive] = useState(false)
    const [durationYears, setDurationYears] = useState(null)
    const [duration, setDuration] = useState('')


    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])

    const [isCo, setIsCo] = useState(false)
    const [editId, setEditId] = useState(null)

    const user = useSelector(state => state.user.user);
const typeObject = {

}
const tableHead = {

}

    useEffect(() => {
        if (active) {
            setDuration(`${fromDate} to Till Date`)
            setDurationYears([fromDate, endDate])
        } else {
            setDuration(`${fromDate} to ${endDate}`)
            setDurationYears([fromDate, endDate])
        }
    }, [fromDate, endDate, active])

    useEffect(() => {
        console.log("duration :", duration, year)
    })

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('schemeName', projectName)
        formData.append('programTitle', programTitle)
        formData.append('principalName', invName)
        formData.append('coInvestigator', coInvName)
        formData.append('isCo', isCo)
        formData.append('fundingName', fundingName)
        formData.append('isGov', gov)
        formData.append('department', department)
        formData.append('awardYear', awardDate)
        formData.append('providedFunds', funds)
        formData.append('fundType', fundType)
        formData.append('status', status)
        formData.append('active', active)
        formData.append('duration', duration)
        formData.append('durationYears', JSON.stringify(durationYears))
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
        formData.append('coInvestigator', coInvName)
        formData.append('isCo', isCo)
        formData.append('fundingName', fundingName)
        formData.append('isGov', gov)
        formData.append('department', department)
        formData.append('awardYear', awardDate)
        formData.append('providedFunds', funds)
        formData.append('fundType', fundType)
        formData.append('status', status)
        formData.append('active', active)
        formData.append('duration', duration)
        formData.append('durationYears', JSON.stringify(durationYears))
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'ResearchProject', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        setEditId(itemId)

        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                console.log(item)
                setEditItem(item)
                setProjectName(item.schemeName)
                setProgramTitle(item.programTitle)
                setInvName(item.principalName)
                setCoInvName(item.coInvestigator)
                setIsCo(item.isCo ? true : false)
                setFundingName(item.fundingName)
                setGov(item.isGov)
                setDepartment(item.department)
                setFundType(item.fundType)
                setAwardDate(item.awardYear)
                setStatus(item.status)
                setFunds(item.providedFunds)
                setDuration(item.duration)
                setYear(item.year)
                if (item.durationYears?.[0]?.includes(',') || item.durationYears?.[0]?.length > 7) {
                    setDurationYears(() => [])
                    setFromDate(() => null)

                } else {
                    setDurationYears(() => item.durationYears)
                    setFromDate(() => item.durationYears[0] || null)
                }

                setActive(item.active === undefined ? false : item.active)
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
        setInvName(`${user?.salutation} ${user?.name}`)
        setCoInvName('-')
        setFundingName('')
        setGov('')
        setDepartment('')
        setAwardDate('')
        setFunds('')
        setFundType('')
        setStatus('')
        setDuration('')
        setYear('')
        setActive(false)
        setFromDate(null)
        setEndDate(null)
        setDurationYears(null)
        setIsCo(false)
    }

    useEffect(() => {
        console.log("is co:", isCo, coInvName)
    }, [isCo, coInvName])

    let param = { model: 'ResearchProject', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    useEffect(() => {
        if (editModal === true) {
            data?.data?.data?.forEach(function (item) {
                if (item._id === editId) {
                    if (isCo) {
                        setCoInvName(item.coInvestigator)
                    } else {
                        setCoInvName("-")
                    }
                }
            })
        } else {
            if (isCo) {
                setCoInvName("")
            } else {
                setCoInvName("-")
            }
        }
    }, [isCo, editModal])

    return (
        <div>
            {/* // HEADER */}


            <Header user={user} model='ResearchProject' showTable={showTable} exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Projects" editState={setEditModal} clearStates={clearStates} state={setProjectModal} icon={<ScienceRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title={title ? title : "Research Projects"} />

            {/* // 2. FIELDS */}

            <BulkExcel data={data?.data?.data} proof='proof' tableHead={tableHead} typeObject={typeObject} commonFilds={{userId:user?._id}} sampleFile='ResearchProjectFaculty' title='Research Projects' SendReq='ResearchProject' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setProjectModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Project Details' : 'Add a new Project'}</p>


                        <Text title='Scheme / Project Title' state={projectName} setState={setProjectName} />

                        <Text title='Principal Invigilator Name' state={invName} setState={setInvName} />

                        <div className='col-md-4 border rounded-md mt-5'>
                            <div className="form-check form-switch py-[0.20rem] mt-[0.28rem]">
                                <input className="form-check-input" checked={isCo} onChange={(e) => { setIsCo(e.target.checked) }} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label className="form-check-label" for="flexSwitchCheckDefault">Is this Project have a Co-Invigilator?</label>
                            </div>
                        </div>

                        <Text title='Co-Invigilator Name' state={coInvName} setState={setCoInvName} disabled={isCo ? false : true} />

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

                        <Year title="Choose Academic Year" state={year} setState={setYear} />


                        <div className="col-md-4">

                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" required
                                value={status} onChange={(e) => { setStatus(e.target.value) }}>

                                <option selected disabled value="">Choose</option>
                                <option value="Completed">Completed</option>
                                <option value="Ongoing">Ongoing</option>
                            </select>
                        </div>


                        <FromToDate activeTitle="Is the project still in progress?" fromDate={fromDate} setFromDate={setFromDate} endDate={endDate} setEndDate={setEndDate} setActive={setActive} active={active} isYear={true} editModal={editModal} editItem={editItem} dateTitles={{ startTitle: "Project Start Year", endTitle: "Project End Year" }} />


                        <File space='col-md-8' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>




            {/* // TABLE */}


            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Scheme / Project Title</th>
                                <th scope="col">Principal Invigilator</th>
                                <th scope="col">Co-Invigilator</th>
                                <th scope="col">Funding Agency</th>
                                <th scope="col">Govt. / Non-Govt.</th>
                                <th scope="col">Award Year</th>
                                <th scope="col">Funds (INR)</th>
                                <th scope="col">Major / Minor</th>
                                <th scope="col">Project Status</th>
                                <th scope="col">Project Duration</th>
                                <th scope="col">Year</th>
                                <th scope="col">Saction Proof</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && filteredItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.schemeName}</td>
                                        <td>{item.principalName}</td>
                                        <td>{item.coInvestigator}</td>
                                        <td>{item.fundingName}</td>
                                        <td>{item.isGov}</td>
                                        <td>{item.awardYear}</td>
                                        <td>{item.providedFunds}</td>
                                        <td>{item.fundType}</td>
                                        <td>{item.status}</td>
                                        <td>{item.duration}</td>
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