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

  const tableHead = { index: "Sr. no.", academicYear: "Year",governmentAgencyName: "Name of the government funding agencies",nonGovernmentAgencyName: "Name of the non government funding agencies/ individuals",grantPurpose: "Purpose of the Grant",fundsReseived: "Funds/ Grants received (INR in lakhs)", Proof: "Link to Audited Statement of Accounts reflecting the receipts", Action: "Action" }
  const MaintenanceAndInfrastructure = () => {

    const module = "other";
    const model = "MaintenanceAndInfrastructure";
    const title = "Infrastructure and Maintenance Fundings";
    let filter = {};

    const params = { model, module, filter };
    const { data, isLoading, refetch } = useQuery(`${model}?sBB2x(M8dX(3MJEi#4g`, () => getReq(params));

    const initialstate = { academicYear: "",governmentAgencyName: "",nonGovernmentAgencyName: "",grantPurpose: "",fundsReseived: "", Proof: "" };
    const [values, setValues] = useState(initialstate);

    const { academicYear,governmentAgencyName,nonGovernmentAgencyName,grantPurpose,fundsReseived} = values;

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
            const { academicYear,governmentAgencyName,nonGovernmentAgencyName,grantPurpose,fundsReseived } = item
            setEdit(true); setOpen(true);
            setValues({ academicYear,governmentAgencyName,nonGovernmentAgencyName,grantPurpose,fundsReseived })
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
    
    const typeObject = {academicYear: academicYearGenerator( 29, true, true ),governmentAgencyName: "text",nonGovernmentAgencyName: "text",grantPurpose: "text",fundsReseived: "number"};
      
    return (
      <>
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} Infrastructure and Maintenance Fundings`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
         <YearSelect className='col-md-6 col-lg-4'  id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="governmentAgencyName" value={governmentAgencyName} label={tableHead.governmentAgencyName} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="nonGovernmentAgencyName" value={nonGovernmentAgencyName} label={tableHead.nonGovernmentAgencyName} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="grantPurpose" value={grantPurpose} label={tableHead.grantPurpose} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4' type="number" id="fundsReseived" value={fundsReseived} label={tableHead.fundsReseived} setState={setValues}  />
				<UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
        </DialogBox>
        
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
        
        <TableComponent TB={data?.data} module={module} getproof="proof" proof="other" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }
  export default MaintenanceAndInfrastructure
  export {tableHead}