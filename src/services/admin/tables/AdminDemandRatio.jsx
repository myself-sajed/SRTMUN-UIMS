import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { academicYearGenerator } from '../../../inputs/Year'
import BulkExcel from '../../../components/BulkExcel'

const tableHead = { index: "Sr. no.", schoolName: 'School', programmeCode: "Program Code", programmeName: "Program name", programType: "Type of Program", seatsAvailable: "Number of seats available", eligibleApplications: "Number of eligible applications", studentsAdmitted: "Number of Students admitted", year: "Academic Year", Proof: "Uploaded Proof", Action: "Action"}

const AdminDemandRatio = () => {
    const TOP = ["UG", "PG", "Ph.D", "Diploma", "PG Diploma", "Certificate"]
    const model = 'DemandRatioAdmin'
    const module = 'adminTable'
    const title = 'Demand Ratio'

    const filter = {}

    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery(`${model}D~(U*G*2p4-L,@'3}?yH`, () => getReq(params))

    const initialstate = { schoolName: "", programmeCode: "", otherSchool: "", programmeName: "", programType: "", seatsAvailable: "", eligibleApplications: "",
    studentsAdmitted: '', year: '', Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { schoolName, otherSchool, programmeCode, programmeName, programType, seatsAvailable, eligibleApplications, studentsAdmitted, year, } = values
    const [open, setOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const schools = Object.keys(SchoolsProgram)
    const [excelOpen, setExcelOpen] = useState(false)

    const typeObject = {
        schoolName: schools, programmeCode: "text", programmeName: Object.values(SchoolsProgram).flatMap(school => school.map(program => program[0])), programType: TOP, seatsAvailable: "number", eligibleApplications: "number", studentsAdmitted: "number", year: academicYearGenerator( 29, true, true ),
    }

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { schoolName, programmeCode, programmeName, programType, seatsAvailable, eligibleApplications, studentsAdmitted, year, } = item
                    setEdit(true); setOpen(true);
                    setValues({ 
                             schoolName, programmeCode, programmeName, programType, seatsAvailable, eligibleApplications, studentsAdmitted, year,
                     })
                }
            })
        }
    }, [itemToEdit, data?.data])

    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        edit ? editReq({ id: itemToEdit }, model, initialstate, {...values, schoolName: schoolName=== "Other"?otherSchool:schoolName }, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({}, model, initialstate, {...values, schoolName: schoolName=== "Other"?otherSchool:schoolName }, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <>
            <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
            <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="programmeCode" value={programmeCode} label={tableHead.programmeCode} setState={setValues} />
                    <Select options={schools
                        ? [
                            ...new Set([...schools, schoolName || '', "Other"]),
                          ].filter((item) => item !== "")
                        : []
                    } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} /> 
                    {
                        schoolName==="Other" 
                        ? <><Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} /><Text className='col-md-6 col-lg-4' id="programmeName" value={programmeName} label={tableHead.programmeName} setState={setValues} />  </>
                        : !(Object.keys(SchoolsProgram).includes(schoolName)) 
                            ? <Text className='col-md-6 col-lg-4' id="programmeName" value={programmeName} label={tableHead.programmeName} setState={setValues} />
                            : <Select options={SchoolsProgram[schoolName]?.map(item => item[0]) || []} className='col-md-6 col-lg-4' id="programmeName" value={programmeName} label={tableHead.programmeName} setState={setValues} />
                    }
                    <Select options={[TOP]} className='col-md-6 col-lg-4' id="programType" value={programType} label={tableHead.programType} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' type='number' id="seatsAvailable" value={seatsAvailable} label={tableHead.seatsAvailable} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' type='number' id="eligibleApplications" value={eligibleApplications} label={tableHead.eligibleApplications} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' type='number' id="studentsAdmitted" value={studentsAdmitted} label={tableHead.studentsAdmitted} setState={setValues} />
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label="Choose Year" setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' serviceName="admin" />
            <Table TB={data?.data} module={module} getproof="proof" proof="admin" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}

export default AdminDemandRatio
export {tableHead}