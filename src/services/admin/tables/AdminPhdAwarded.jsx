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
import Lists from '../../../components/tableComponents/Lists'

const tableHead = { index: 'Sr.No.', scholarName: 'Scholar Name', schoolName: 'School / Department Name', guideName: 'Guide Name', degreeName: 'Degree', awardSubmit: 'Awarded / Submitted / Ongoing', thesisTitle: 'Thesis Title', rac: "Date of Registration (RAC)", gender: "Gender", category: "Category", yearOfScholar: 'Year of Scholar Registration', phdAwardYear: 'Year of Award', year: 'Year', Proof: 'Uploaded Proof',  Action: "Action" }

const AdminPhdAwarded = () => {
    const model = 'PhdAwardedAdmin'
    const module = 'adminTable'

    const filter = {}

    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

    const initialstate = { scholarName: "", schoolName: "", otherSchool: "", guideName: "", otherGuide: "", degreeName: "", awardSubmit: "", thesisTitle: "", rac: "", gender: "", category: "", yearOfScholar: "", phdAwardYear: "", year: "", Proof: "" }
    const [values, setValues] = useState(initialstate)
    const { scholarName, schoolName, otherSchool, guideName, otherGuide, degreeName, awardSubmit, thesisTitle, rac, gender, category, yearOfScholar, phdAwardYear, year, } = values
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
                    const { scholarName, schoolName, guideName, degreeName, awardSubmit, thesisTitle, rac, gender, category, yearOfScholar, phdAwardYear, year, } = item
                    setEdit(true); setOpen(true);
                    setValues({ scholarName, schoolName, guideName, degreeName, awardSubmit, thesisTitle, rac, gender, category, yearOfScholar, phdAwardYear, year, })
                }
            })
        }
    }, [itemToEdit])

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
            <AddButton title="Research Guidance" onclick={setOpen} dataCount={data ? data?.data.length : 0} />
            <DialogBox title={`${edit ? "Edit" : "Add"} Research Guidance`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="scholarName" value={scholarName} label={tableHead.scholarName} setState={setValues} />
                    <Select options={schools
                        ? [
                            ...new Set([...schools, schoolName || "", "Other"]),
                          ].filter((item) => item !== "")
                        : []
                    } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} /> 
                    {
                        schoolName==="Other" &&  <><Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} /> <Text className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} /></>
                    }
                    {
                        schoolName!=="Other" && <Select options={guides
                            ? [
                                ...new Set([...guides, guideName || "", "Other"]),
                              ].filter((item) => item !== "")
                            : []
                        } className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
                    }
                    {
                        guideName==="Other" && <Text className='col-md-6 col-lg-4' id="otherGuide" value={otherGuide} label="Name of Guide" setState={setValues} />
                    }

                    <Text className='col-md-6 col-lg-4' id="thesisTitle" value={thesisTitle} label={tableHead.thesisTitle} setState={setValues} />
                    <Select options={Lists.phdAwardedDegree} className='col-md-6 col-lg-4' id="degreeName" value={degreeName} label={tableHead.degreeName} setState={setValues} />
                    {
                        degreeName === 'Ph.D.' && <Text className='col-md-6 col-lg-4' type="date" id="rac" title={tableHead.rac} value={rac} setState={setValues} />
                    }
                    <Select options={Lists.phdAwardedSubmit} className='col-md-6 col-lg-4' id="awardSubmit" value={awardSubmit} label={tableHead.awardSubmit} setState={setValues} />
                    <Select options={Lists.gender} className='col-md-6 col-lg-4' id="gender" value={gender} label={tableHead.gender} setState={setValues} />
                    <Select options={Lists.phdAwardedCategory} className='col-md-6 col-lg-4' id="category" value={category} label={tableHead.category} setState={setValues} />
                    <YearSelect className='col-md-6 col-lg-4' id="yearOfScholar" value={yearOfScholar} label={tableHead.yearOfScholar} setState={setValues} />
                    {
                        awardSubmit === 'Awarded' && <Text className='col-md-6 col-lg-4' id="phdAwardYear" label={tableHead.phdAwardYear} type="number" value={phdAwardYear} setState={setValues} />
                    }
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <Table TB={data?.data} module={module} getproof="proof" proof="admin" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}

export default AdminPhdAwarded
export { tableHead }
