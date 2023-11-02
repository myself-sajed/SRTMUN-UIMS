import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import Text from "../../../components/formComponents/Text";
import YearSelect from "../../../components/formComponents/YearSelect";
import Select from "../../../components/formComponents/Select";
import UploadFile from "../../../components/formComponents/UploadFile";
import AddButton from "../../director/components/UtilityComponents/AddButton";
import BulkExcel from "../../../components/BulkExcel";
import DialogBox from "../../../components/formComponents/DialogBox";
import TableComponent from "../../../components/tableComponents/TableComponent";
import SchoolsProgram from "../../../components/SchoolsProgram";
import editReq from "../../../components/requestComponents/editReq";
import addReq from "../../../components/requestComponents/addReq";
import getReq from "../../../components/requestComponents/getReq";
import { academicYearGenerator } from "../../../inputs/Year";

  const tableHead = { index: "Sr. no.", Name_of_student_enrolling: "Name of student enrolling",SchoolName: "School Name",Program_graduated_from: "Program graduated from",Name_of_institution_admitted: "Name of institution admitted",Name_of_programme_admitted: "Name of programme admitted",academicYear: "Academic Year", Proof: "Upload Proof", Action: "Action" }
  
  const TPOProgressionToHE = () => {

    const module = "tpo";
    const model = "TpoProgrationToHE";
    const title = "Progression To HE";
    let filter = {};

    const params = { model, module, filter };
    const { data, isLoading, refetch } = useQuery(`${model}3>Pkj$7=9c6Ai:n]e7CD`, () => getReq(params));

    const initialstate = { Name_of_student_enrolling: "",SchoolName: "",Program_graduated_from: "",Name_of_institution_admitted: "",Name_of_programme_admitted: "",academicYear: "", Proof: "" };
    const [values, setValues] = useState(initialstate);

    const { Name_of_student_enrolling,SchoolName,Program_graduated_from,Name_of_institution_admitted,Name_of_programme_admitted,academicYear} = values;

    const [open, setOpen] = useState(false);
    const [excelOpen, setExcelOpen] = useState(false);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null);
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
      if (itemToEdit && data.data) {
        data?.data.forEach((item) => {
          if (item?._id === itemToEdit) {
            const { Name_of_student_enrolling,SchoolName,Program_graduated_from,Name_of_institution_admitted,Name_of_programme_admitted,academicYear } = item
            setEdit(true); setOpen(true);
            setValues({ Name_of_student_enrolling,SchoolName,Program_graduated_from,Name_of_institution_admitted,Name_of_programme_admitted,academicYear })
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
    
    const typeObject = {Name_of_student_enrolling: "text",SchoolName: Object.keys(SchoolsProgram),Program_graduated_from: Object.values(SchoolsProgram).flat().map(programArray => programArray[0]),Name_of_institution_admitted: "text",Name_of_programme_admitted: "text",academicYear: academicYearGenerator( 29, true, true )};
      
    return (
      <>
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} Progression To HE`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
        <Text className='col-md-6 col-lg-4'  id="Name_of_student_enrolling" value={Name_of_student_enrolling} label={tableHead.Name_of_student_enrolling} setState={setValues}  />
				<Select className='col-md-6 col-lg-4'  id="SchoolName" value={SchoolName} label={tableHead.SchoolName} setState={setValues} options={Object.keys(SchoolsProgram)} />
				<Select className='col-md-6 col-lg-4'  id="Program_graduated_from" value={Program_graduated_from} label={tableHead.Program_graduated_from} setState={setValues} options={SchoolsProgram?SchoolsProgram[SchoolName]?.map(item => item[0]):[]} />
				<Text className='col-md-6 col-lg-4'  id="Name_of_institution_admitted" value={Name_of_institution_admitted} label={tableHead.Name_of_institution_admitted} setState={setValues}  />
				<Text className='col-md-6 col-lg-4'  id="Name_of_programme_admitted" value={Name_of_programme_admitted} label={tableHead.Name_of_programme_admitted} setState={setValues}  />
				<YearSelect className='col-md-6 col-lg-4'  id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues}  />
				<UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
        </DialogBox>
        
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
        
        <TableComponent TB={data?.data} module={module} getproof="proof" proof="tpo" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }
  export default TPOProgressionToHE