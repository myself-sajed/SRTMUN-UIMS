import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import TableComponent from '../../../components/tableComponents/TableComponent';
import Text from '../../../components/formComponents/Text';
import YearSelect from '../../../components/formComponents/YearSelect';
import UploadFile from '../../../components/formComponents/UploadFile';
import DialogBox from '../../../components/formComponents/DialogBox';
import getReq from  '../../../components/requestComponents/getReq';
import editReq from  '../../../components/requestComponents/editReq';
import addReq from  '../../../components/requestComponents/addReq';
import BulkExcel from  '../../../components/BulkExcel';
import AddButton from  '../../director/components/UtilityComponents/AddButton';
import { academicYearGenerator } from "../../../inputs/Year";

  const tableHead = { index: "Sr. no.", academicYear: "Year",name: "Name of the scheme",governmentStudnts: "Number of students",governmentAmount: "Amount",institutionStudnts: "Number of students",institutionAmount: "Amount",nonGovernmentStudnts: "Number of students",nonGovernmentAmount: "Amount",nonGovernmentNgo: "Name of the NGO/agency", Proof: "Link to relevant document", Action: "Action" }
  const Scholarship = () => {

    const module = "other";
    const model = "Scholarship";
    const title = "Scholarship Benefit";
    let filter = {};

    const params = { model, module, filter };
    const { data, isLoading, refetch } = useQuery(`${model}F"80}u{jCUw1U{eL^U'?`, () => getReq(params));

    const initialstate = { academicYear: "",name: "",governmentStudnts: "",governmentAmount: "",institutionStudnts: "",institutionAmount: "",nonGovernmentStudnts: "",nonGovernmentAmount: "",nonGovernmentNgo: "", Proof: "" };
    const [values, setValues] = useState(initialstate);

    const { academicYear,name,governmentStudnts,governmentAmount,institutionStudnts,institutionAmount,nonGovernmentStudnts,nonGovernmentAmount,nonGovernmentNgo} = values;

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
            const { academicYear,name,governmentStudnts,governmentAmount,institutionStudnts,institutionAmount,nonGovernmentStudnts,nonGovernmentAmount,nonGovernmentNgo } = item
            setEdit(true); setOpen(true);
            setValues({ academicYear,name,governmentStudnts,governmentAmount,institutionStudnts,institutionAmount,nonGovernmentStudnts,nonGovernmentAmount,nonGovernmentNgo })
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
    
    const typeObject = {academicYear: academicYearGenerator( 29, true, true ),name: "text",governmentStudnts: "text",governmentAmount: "number",institutionStudnts: "text",institutionAmount: "number",nonGovernmentStudnts: "text",nonGovernmentAmount: "number",nonGovernmentNgo: "text"};
      
    return (
      <>
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} Scholarship Benefit`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        
          <div className="flex flex-row flex-wrap">
            <YearSelect className='col-md-6 col-lg-4'  id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues}  />
            <Text className='col-md-6 col-lg-4'  id="name" value={name} label={tableHead.name} setState={setValues} />
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-full font-semibold ml-2 my-2">Number of students benefited by government scheme and amount</div>
				    <Text className='col-md-6 col-lg-4'  id="governmentStudnts" value={governmentStudnts} label={tableHead.governmentStudnts} setState={setValues}  />
            <Text className='col-md-6 col-lg-4' type="number" id="governmentAmount" value={governmentAmount} label={tableHead.governmentAmount} setState={setValues}  />
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-full font-semibold ml-2 my-2">Number of students benefited by  the institution's schemes and amount</div>
            <Text className='col-md-6 col-lg-4'  id="institutionStudnts" value={institutionStudnts} label={tableHead.institutionStudnts} setState={setValues}  />
				    <Text className='col-md-6 col-lg-4' type="number" id="institutionAmount" value={institutionAmount} label={tableHead.institutionAmount} setState={setValues}  />
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-full font-semibold ml-2 my-2">Number of students benefited by  the non-government agencies (NGOs) and amount</div>
            <Text className='col-md-6 col-lg-4'  id="nonGovernmentStudnts" value={nonGovernmentStudnts} label={tableHead.nonGovernmentStudnts} setState={setValues}  />
				    <Text className='col-md-6 col-lg-4' type="number" id="nonGovernmentAmount" value={nonGovernmentAmount} label={tableHead.nonGovernmentAmount} setState={setValues}  />
				    <Text className='col-md-6 col-lg-4'  id="nonGovernmentNgo" value={nonGovernmentNgo} label={tableHead.nonGovernmentNgo} setState={setValues}  />
          </div>
          <div className="flex flex-row flex-wrap">
				    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Link to relevant document" setState={setValues} required={!edit} />
          </div>
        </DialogBox>
        
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
        
        <TableComponent TB={data?.data} module={module} getproof="proof" proof="other" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }
  export default Scholarship
  export {tableHead}