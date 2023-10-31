import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import Lists from "../../../components/tableComponents/Lists";
import Text from "../../../components/formComponents/Text";
import Select from "../../../components/formComponents/Select";
import YearSelect from "../../../components/formComponents/YearSelect";
import BulkExcel from "../../../components/BulkExcel";
import TableComponent from "../../../components/tableComponents/TableComponent";
import DialogBox from "../../../components/formComponents/DialogBox";
import AddButton from "../../director/components/UtilityComponents/AddButton";
import editReq from "../../../components/requestComponents/editReq";
import addReq from "../../../components/requestComponents/addReq";
import { academicYearGenerator } from "../../../inputs/Year";
import getReq from "../../../components/requestComponents/getReq";


  const tableHead = { index: "Sr. no.", name: "Name",idNumber: "ID number/Aadhar number",yearInWhich: "Year in which left/joined/resigned/ retired etc.",email: "Email",gender: "Gender",designation: "Designation",natureOfPost: "Nature of Post",dateOfJoining: "Date of joining institution",dateOfLeaving: "Date of leaving",academicYear: "Academic Year", Action: "Action" }
  const EsttFullTimeTeacherWhoLeft = () => {

    const module = "estt";
    const model = "EsttFullTimeTeacherWhoLeft";
    const title = "Full Time Teachers who left/joined the institution";
    let filter = {};

    const params = { model, module, filter };
    const { data, isLoading, refetch } = useQuery(`${model}d'/ELf01=eER$.Hlvp;9`, () => getReq(params));

    const initialstate = { name: "",idNumber: "",yearInWhich: "",email: "",gender: "",designation: "",natureOfPost: "",dateOfJoining: "",dateOfLeaving: "",academicYear: "" };
    const [values, setValues] = useState(initialstate);

    const { name,idNumber,yearInWhich,email,gender,designation,natureOfPost,dateOfJoining,dateOfLeaving,academicYear} = values;

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
            const { name,idNumber,yearInWhich,email,gender,designation,natureOfPost,dateOfJoining,dateOfLeaving,academicYear } = item
            setEdit(true); setOpen(true);
            setValues({ name,idNumber,yearInWhich,email,gender,designation,natureOfPost,dateOfJoining,dateOfLeaving,academicYear })
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
    
    const typeObject = {name: "text",idNumber: "text",yearInWhich: "number",email: "text",gender: "text",designation: "text",natureOfPost: Lists.natureOfPost,dateOfJoining: "date",dateOfLeaving: "date",academicYear: academicYearGenerator( 29, true, true )};
      
    return (
      <>
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} Full Time Teachers who left/joined the institution`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
         <Text className='col-md-6 col-lg-4'  id="name" value={name} label={tableHead.name} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="idNumber" value={idNumber} label={tableHead.idNumber} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4' type="number" id="yearInWhich" value={yearInWhich} label={tableHead.yearInWhich} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="email" value={email} label={tableHead.email} setState={setValues}  />
				 <Select className='col-md-6 col-lg-4'  id="gender" value={gender} label={tableHead.gender} setState={setValues} options={Lists.gender} />
				 <Text className='col-md-6 col-lg-4'  id="designation" value={designation} label={tableHead.designation} setState={setValues}  />
				 <Select className='col-md-6 col-lg-4'  id="natureOfPost" value={natureOfPost} label={tableHead.natureOfPost} setState={setValues} options={Lists.esttNatureOfPost} />
				 <Text className='col-md-6 col-lg-4' type="date" id="dateOfJoining" value={dateOfJoining} label={tableHead.dateOfJoining} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4' type="date" id="dateOfLeaving" value={dateOfLeaving} label={tableHead.dateOfLeaving} setState={setValues}  />
				 <YearSelect className='col-md-6 col-lg-4'  id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues}  />
        </div>
        </DialogBox>
        
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} />
        
        <TableComponent TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }
  export default EsttFullTimeTeacherWhoLeft