import React, { useState, useEffect } from "react";
import DialogBox from "../../../components/formComponents/DialogBox";
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import BulkExcel from "../../../components/BulkExcel";
import TableComponent from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", portalName: "Portal Name", offeredOnlineCourses: "No. of students offered online courses which have credit transferred to transcript", onlineCoursesWhichTrasperedCredit: "Total no. of online courses which have credit transferred to the transcript", creditsTransferredToTranscript: "Total no. of credits transferred to transcript", academicYear: "Academic Year", Proof: "Upload Proof", Action: "Action" }
const SwayamDetailsOfOnlineCourses = () => {

  const module = "swayam";
  const model = "SwayamDetailsOfOnlineCourses";
  const title = "Details of online courses";
  let filter = {};

  const params = { model, module, filter };
  const { data, isLoading, refetch } = useQuery(`${model}p8J)OJ_da8_Xv@x>ug-|`, () => getReq(params));

  const initialstate = { portalName: "SWAYAM/NPTEL", offeredOnlineCourses: "", onlineCoursesWhichTrasperedCredit: "", creditsTransferredToTranscript: "", academicYear: "", Proof: "" };
  const [values, setValues] = useState(initialstate);

  const { offeredOnlineCourses, onlineCoursesWhichTrasperedCredit, creditsTransferredToTranscript, academicYear } = values;

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
          const { portalName, offeredOnlineCourses, onlineCoursesWhichTrasperedCredit, creditsTransferredToTranscript, academicYear } = item
          setEdit(true); setOpen(true);
          setValues({ portalName, offeredOnlineCourses, onlineCoursesWhichTrasperedCredit, creditsTransferredToTranscript, academicYear })
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

  const typeObject = { offeredOnlineCourses: "number", onlineCoursesWhichTrasperedCredit: "number", creditsTransferredToTranscript: "number", academicYear: academicYearGenerator(29, true, true) };

  return (
    <>
      <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} Details of online courses`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' type="number" id="offeredOnlineCourses" value={offeredOnlineCourses} label={tableHead.offeredOnlineCourses} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="onlineCoursesWhichTrasperedCredit" value={onlineCoursesWhichTrasperedCredit} label={tableHead.onlineCoursesWhichTrasperedCredit} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="creditsTransferredToTranscript" value={creditsTransferredToTranscript} label={tableHead.creditsTransferredToTranscript} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />

      <TableComponent TB={data?.data} module={module} getproof="proof" proof="swayam" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}
export default SwayamDetailsOfOnlineCourses