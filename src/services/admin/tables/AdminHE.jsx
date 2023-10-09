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

const tableHead = { index: "Sr. no.", schoolName: 'School', nameOfStudent: "Name of student enrolling", programGraduated: "Program graduated from", nameOfInstitution: "Name of institution admitted", programmeAdmitted: "Name of programme admitted", year: "Academic Year", Proof: "Uploaded Proof", Action: "Action"}

const AdminHE = () => {

    const model = 'HEAdmin'
    const module = 'adminTable'
    const title = "Progression To HE"

    const filter = {}

    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

    const initialstate = { schoolName: "", nameOfStudent: "", otherSchool: "", programGraduated: "", nameOfInstitution: "", programmeAdmitted: "", year: '', Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { schoolName, otherSchool, nameOfStudent, programGraduated, nameOfInstitution, programmeAdmitted, year, } = values
    const [open, setOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const schools = Object.keys(SchoolsProgram)

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { schoolName, nameOfStudent, programGraduated, nameOfInstitution, programmeAdmitted, year, } = item
                    setEdit(true); setOpen(true);
                    setValues({ 
                             schoolName, nameOfStudent, programGraduated, nameOfInstitution, programmeAdmitted, year,
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
            <AddButton title={title} onclick={setOpen} />
            <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="nameOfStudent" value={nameOfStudent} label={tableHead.nameOfStudent} setState={setValues} />
                    <Select options={schools
                        ? [
                            ...new Set([...schools, schoolName || '', "Other"]),
                          ].filter((item) => item !== "")
                        : []
                    } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} /> 
                    {
                        schoolName==="Other" 
                        ? <><Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} /><Text className='col-md-6 col-lg-4' id="programGraduated" value={programGraduated} label={tableHead.programGraduated} setState={setValues} />  </>
                        : !(Object.keys(SchoolsProgram).includes(schoolName)) 
                            ? <Text className='col-md-6 col-lg-4' id="programGraduated" value={programGraduated} label={tableHead.programGraduated} setState={setValues} />
                            : <Select options={SchoolsProgram[schoolName]?.map(item => item[0]) || []} className='col-md-6 col-lg-4' id="programGraduated" value={programGraduated} label={tableHead.programGraduated} setState={setValues} />
                    }
                    <Text className='col-md-6 col-lg-4' id="nameOfInstitution" value={nameOfInstitution} label={tableHead.nameOfInstitution} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="programmeAdmitted" value={programmeAdmitted} label={tableHead.programmeAdmitted} setState={setValues} />
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label="Choose Year" setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <Table TB={data?.data} module={module} getproof="proof" proof="admin" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}

export default AdminHE





