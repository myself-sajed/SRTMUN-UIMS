import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../student/components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'
import SchoolsProgram from '../../../components/SchoolsProgram'


const tableHead = { index: "Sr. no.", researchName: "Researcher Name", guideName: "Research Guide", schoolName: "School / Department Name", enrolmentYear: "Enrollment Date", fellowshipDuration: "Fellowship Duration", fellowshipType: "Fellowship Type", grantingAgency: "Granting Agency", qualifyingExam: "Qualifying Exam", year: "Academic Year", Proof: "Uploaded Proof", Action: "Action" }
const AdminJRFSRF = () => {

    const model = 'JrfSrfAdmin'
    const module = 'adminTable'

    const filter = {}

    const params = { model, module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

    const initialstate = { researchName: "", guideName: "", isSchool: "", schoolName: "", enrolmentYear: '', fellowshipDuration: '', fellowshipType: '', grantingAgency: '', qualifyingExam: '', year: '', Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { researchName, guideName, isSchool, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year } = values
    const [open, setOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { researchName, guideName, isSchool, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year } = item
                    setEdit(true); setOpen(true);
                    setValues({ researchName, guideName, isSchool, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year })
                }
            })
        }
    }, [itemToEdit])

    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({}, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <>
            <AddButton title="JRF, SRF, Post Doctoral Fellows, Research Associate" onclick={setOpen} />
            <DialogBox title={`${edit ? "Edit" : "Add"} JRF, SRF, Post Doctoral Fellows, Research Associate`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="researchName" value={researchName} label="Researcher Name" setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
                    {
                        <div className='col-12 col-md-6 col-lg-4 border rounded-md mt-[35px] mb-[10px]'>
                            <div className="form-check form-switch py-[0.20rem] mt-[0.28rem] ml-2">
                                <input className="form-check-input" checked={isSchool} onChange={() => { setValues((pri) => { return { ...pri, 'isSchool': !pri.isSchool, } }) }} type="checkbox" role="switch" id="checkbox" />
                                <label className="form-check-label" htmlFor="checkbox">IS it School?</label>
                            </div>
                        </div>
                    }
                    {
                        isSchool ? <Select options={Object.keys(SchoolsProgram)} className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School Name" setState={setValues} /> : <Text className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="Department Name" setState={setValues} />
                    }

                    <Text className='col-md-6 col-lg-4' id="enrolmentYear" value={enrolmentYear} type="date" label="Enrollment Year" setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="fellowshipDuration" type='number' value={fellowshipDuration} label="Fellowship Duration (in Months)" setState={setValues} />
                    <Select options={["JRF", "SRF", "Post Doctoral Fellows", "Research Associate"]} className='col-md-6 col-lg-4' id="fellowshipType" value={fellowshipType} label="Fellowship Type" setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="grantingAgency" value={grantingAgency} label="Granting Agency" setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="qualifyingExam" value={qualifyingExam} label="Qualified Exam" setState={setValues} />
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label="Choose Year" setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <Table TB={data?.data} module={module} getproof="proof" proof="admin" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}

export default AdminJRFSRF