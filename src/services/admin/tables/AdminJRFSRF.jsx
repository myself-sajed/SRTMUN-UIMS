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
import { fetchFacutys } from '../../student/pages/StudentHome'


const tableHead = { index: "Sr. no.", researchName: "Research Fellow Name", schoolName: "School / Research Center Name", guideName: "Research Guide", enrolmentYear: "Enrollment Date", fellowshipDuration: "Fellowship Duration", fellowshipType: "Fellowship Type", grantingAgency: "Granting Agency", qualifyingExam: "Qualifying Exam", year: "Academic Year", Proof: "Uploaded Proof", Action: "Action" }
const AdminJRFSRF = () => {

    const model = 'JrfSrfAdmin'
    const module = 'adminTable'

    const filter = {}

    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

    const initialstate = { researchName: "", guideName: "", otherGuide: "", otherSchool: "", schoolName: "", enrolmentYear: '', fellowshipDuration: '', fellowshipType: '', grantingAgency: '', qualifyingExam: '', year: '', Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { researchName, guideName, otherGuide, otherSchool, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year } = values
    const [open, setOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [guides, setGuides] = useState([]);
    const schools = Object.keys(SchoolsProgram)

    useEffect(() => {
        // setValues((pri)=>{
        //     return{...pri, guideName: ""} 

        // })
        if(schoolName!=="Other"){
            fetchFacutys({ model: "User", id: "", module, filter: { department: schoolName, salutation: "Dr." }, }, null, setGuides);
        }
    }, [schoolName]);

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { researchName, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, guideName } = item
                    setEdit(true); setOpen(true);
                    setValues({ 
                             researchName, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, guideName
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
        edit ? editReq({ id: itemToEdit }, model, initialstate, {...values,guideName: guideName=== "Other"?otherGuide:guideName, schoolName: schoolName=== "Other"?otherSchool:schoolName }, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({}, model, initialstate, {...values,guideName: guideName=== "Other"?otherGuide:guideName, schoolName: schoolName=== "Other"?otherSchool:schoolName }, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <>
            <AddButton title="JRF, SRF, Post Doctoral Fellows, Research Associate" onclick={setOpen} />
            <DialogBox title={`${edit ? "Edit" : "Add"} JRF, SRF, Post Doctoral Fellows, Research Associate`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="researchName" value={researchName} label="Research Fellow Name" setState={setValues} />
                    <Select options={schools
                        ? [
                            ...new Set([...schools, schoolName || '', "Other"]),
                          ].filter((item) => item !== "")
                        : []
                    } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} /> 
                    {
                        schoolName==="Other" &&  <><Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} /> <Text className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} /></>
                    }
                    {
                        schoolName!=="Other" && <Select options={guides
                            ? [
                                ...new Set([...guides, guideName || '', "Other"]),
                              ].filter((item) => item !== "")
                            : []
                        } className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
                    }
                    {
                        guideName==="Other" && <Text className='col-md-6 col-lg-4' id="otherGuide" value={otherGuide} label="Name of Guide" setState={setValues} />
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