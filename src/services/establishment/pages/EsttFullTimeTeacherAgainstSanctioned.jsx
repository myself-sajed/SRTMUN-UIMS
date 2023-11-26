import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import Lists from "../../../components/tableComponents/Lists";
import Select from "../../../components/formComponents/Select";
import Text from "../../../components/formComponents/Text";
import YearSelect from "../../../components/formComponents/YearSelect";
import BulkExcel from "../../../components/BulkExcel";
import TableComponent from "../../../components/tableComponents/TableComponent";
import DialogBox from "../../../components/formComponents/DialogBox";
import AddButton from "../../director/components/UtilityComponents/AddButton";
import { academicYearGenerator } from "../../../inputs/Year";
import addReq from "../../../components/requestComponents/addReq";
import editReq from "../../../components/requestComponents/editReq";
import getReq from "../../../components/requestComponents/getReq";


const tableHead = { index: "Sr. no.", name: "Name of the Full-time teacher", pan: "PAN", designation: "Designation", yearOfAppointment: "Year of appointment", natureOfAppointment: "Nature of Appointment", departmentName: "Name of the Department", experienceInYears: "Total years of Experience in the same institution", stillWorking: "Is the teacher still serving the institution/If not last year of the service of Faculty to the Institution", academicYear: "Academic Year", Action: "Action" }
const EsttFullTimeTeacherAgainstSanctioned = ({ filterByAcademicYear = false }) => {

  const module = "estt";
  const model = "EsttFullTimeTeacherAgainstSanctioned";
  const title = "Full Time Teachers Against Sanctioned Posts";
  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};

  const params = { model, module, filter };
  const { data, isLoading, refetch } = useQuery(`${model}/lj&JdJ((rtH}9&$j/er`, () => getReq(params));

  const initialstate = { name: "", pan: "", designation: "", yearOfAppointment: "", natureOfAppointment: "", departmentName: "", experienceInYears: "", stillWorking: "", academicYear: "" };
  const [values, setValues] = useState(initialstate);

  const { name, pan, designation, yearOfAppointment, natureOfAppointment, departmentName, experienceInYears, stillWorking, academicYear } = values;

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
          const { name, pan, designation, yearOfAppointment, natureOfAppointment, departmentName, experienceInYears, stillWorking, academicYear } = item
          setEdit(true); setOpen(true);
          setValues({ name, pan, designation, yearOfAppointment, natureOfAppointment, departmentName, experienceInYears, stillWorking, academicYear })
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

  const typeObject = { name: "text", pan: "text", designation: "text", yearOfAppointment: "number", natureOfAppointment: Lists.esttNatureOfAppointment, departmentName: "text", experienceInYears: "number", stillWorking: "text", academicYear: academicYearGenerator(29, true, true) };

  return (
    <>
      <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} Full Time Teachers Against Sanctioned Posts`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="name" value={name} label={tableHead.name} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="pan" value={pan} label={tableHead.pan} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="designation" value={designation} label={tableHead.designation} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="yearOfAppointment" value={yearOfAppointment} label={tableHead.yearOfAppointment} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="natureOfAppointment" value={natureOfAppointment} label={tableHead.natureOfAppointment} setState={setValues} options={Lists.esttNatureOfAppointment} />
          <Text className='col-md-6 col-lg-4' id="departmentName" value={departmentName} label={tableHead.departmentName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="experienceInYears" value={experienceInYears} label={tableHead.experienceInYears} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="stillWorking" value={stillWorking} label={tableHead.stillWorking} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} />

      <TableComponent TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}
export default EsttFullTimeTeacherAgainstSanctioned
export { tableHead }