import React, { useState, useEffect } from "react";
import DialogBox from "../../../components/formComponents/DialogBox";
import Text from '../../../components/formComponents/Text'
import Select from '../../../components/formComponents/Select'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import BulkExcel from "../../../components/BulkExcel";
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import { academicYearGenerator } from "../../../inputs/Year";
import SchoolsProgram from "../../../components/SchoolsProgram";
import Lists from "../../../components/tableComponents/Lists";

const tableHead = { index: "Sr. no.", Name_of_student_placed: "Name of student placed/started Business", SchoolName: "School Name", Program_graduated_from: "Program graduated from", Name_of_the_employer: "Name of the employer/business", Employer_contact_details: "Employer/business contact details", Pay_package_annum: "Pay package ( ₹ / annum)", academicYear: "Year of Placement", Type_Of_Placement: "Type of placemnt", Proof: "Upload Proof", Action: "Action" }

const TPOPlacements = () => {
    const module = "tpo"
    const model = "TpoPlacements"
    const title = "Placements"
  
    let filter = {}
    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery(`${model}LvUzq36k-TMy2{w?A|n8`, () => getReq(params))
  
    const initialstate = { SchoolName: "", Name_of_student_placed: "", Proof: "", Program_graduated_from: "", academicYear: "", Name_of_the_employer: "", Employer_contact_details: "", Pay_package_annum: "", Type_Of_Placement: "" }
    const [values, setValues] = useState(initialstate)
    const { SchoolName, Name_of_student_placed, Program_graduated_from, academicYear, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Type_Of_Placement } = values
  
    const [open, setOpen] = useState(false)
    const [excelOpen, setExcelOpen] = useState(false)
  
    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
  
    const typeObject = {
      SchoolName: Object.keys(SchoolsProgram), Name_of_the_employer: Lists.counselingActivities, Name_of_student_placed: "text", Program_graduated_from: "number", Employer_contact_details: "text", Pay_package_annum: "number", Type_Of_Placement: Lists.typesOfPlacements, academicYear: academicYearGenerator(29, true, true),
    }
  
    useEffect(() => {
      if (itemToEdit && data.data) {
        data?.data.forEach((item) => {
          if (item?._id === itemToEdit) {
            const { SchoolName, Name_of_student_placed, Program_graduated_from, academicYear, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Type_Of_Placement } = item
            setEdit(true); setOpen(true);
            setValues({ SchoolName, Name_of_student_placed, Program_graduated_from, academicYear, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Type_Of_Placement })
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
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
          <div className='flex flex-wrap'>
            <Select className='col-md-6 col-lg-4' id="SchoolName" value={SchoolName} label={tableHead.SchoolName} setState={setValues} options={Object.keys(SchoolsProgram)} />
            <Select className='col-md-6 col-lg-4' id="Program_graduated_from" value={Program_graduated_from} label={tableHead.Program_graduated_from} setState={setValues} options={SchoolsProgram[SchoolName]?.map(item => item[0])} />
            <Text className='col-md-6 col-lg-4' id="Name_of_student_placed" value={Name_of_student_placed} label={tableHead.Name_of_student_placed} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="Name_of_the_employer" value={Name_of_the_employer} label={tableHead.Name_of_the_employer} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="Employer_contact_details" value={Employer_contact_details} label={tableHead.Employer_contact_details} setState={setValues} />
            <Text className='col-md-6 col-lg-4' type='number' id="Pay_package_annum" value={Pay_package_annum} label={tableHead.Pay_package_annum} setState={setValues} />
            <Select className='col-md-6 col-lg-4' id="Type_Of_Placement" value={Type_Of_Placement} label={tableHead.Type_Of_Placement} setState={setValues} options={Lists.typesOfPlacements} />
            <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
            <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
          </div>
        </DialogBox>
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
        <Table TB={data?.data} module={module} getproof="proof" proof="tpo" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
}

export default TPOPlacements
