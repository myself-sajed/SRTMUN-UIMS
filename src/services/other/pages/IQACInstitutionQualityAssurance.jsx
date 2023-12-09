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


  const tableHead = { index: "Sr. no.", academicYear: "Year",conferncesSeminarsWorkshops: "Confernces, Seminars, Workshops on quality conducted",aaaFollowUp: "Academic Administrative Audit (AAA) and initiation of follow up action",participationNIRF: "Participation in NIRF along with Status",iSOCertification: "ISO Certification. and nature and validity period",nBAOtherCertification: "NBA or any other certification received with program specifications",collaborativeQuality: "Collaborative quality initiatives with other institution(s) (Provide name of the institution and activity)",from: "Orientation programme on quality issues fromDate (DD-MM-YYYY)",to: "Orientation programme on quality issues ToDate (DD-MM-YYYY)", Proof: "Upload Proof", Action: "Action" }
  const IQACInstitutionQualityAssurance = () => {

    const module = "other";
    const model = "IQACInstitutionQualityAssurance";
    const title = "Institution adopted Quality assurance";
    let filter = {};

    const params = { model, module, filter };
    const { data, isLoading, refetch } = useQuery(`${model}s1sxfVf;[/:0SU<cJ'Yq`, () => getReq(params));

    const initialstate = { academicYear: "",conferncesSeminarsWorkshops: "",aaaFollowUp: "",participationNIRF: "",iSOCertification: "",nBAOtherCertification: "",collaborativeQuality: "",from: "",to: "", Proof: "" };
    const [values, setValues] = useState(initialstate);

    const { academicYear,conferncesSeminarsWorkshops,aaaFollowUp,participationNIRF,iSOCertification,nBAOtherCertification,collaborativeQuality,from,to} = values;

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
            const { academicYear,conferncesSeminarsWorkshops,aaaFollowUp,participationNIRF,iSOCertification,nBAOtherCertification,collaborativeQuality,from,to } = item
            setEdit(true); setOpen(true);
            setValues({ academicYear,conferncesSeminarsWorkshops,aaaFollowUp,participationNIRF,iSOCertification,nBAOtherCertification,collaborativeQuality,from,to })
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
    
    const typeObject = {academicYear: academicYearGenerator( 29, true, true ),conferncesSeminarsWorkshops: "text",aaaFollowUp: "text",participationNIRF: "text",iSOCertification: "text",nBAOtherCertification: "text",collaborativeQuality: "text",from: "date",to: "date"};
      
    return (
      <>
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} Institution adopted Quality assurance`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
         <YearSelect className='col-md-6 col-lg-4'  id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="conferncesSeminarsWorkshops" value={conferncesSeminarsWorkshops} label={tableHead.conferncesSeminarsWorkshops} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="aaaFollowUp" value={aaaFollowUp} label={tableHead.aaaFollowUp} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="participationNIRF" value={participationNIRF} label={tableHead.participationNIRF} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="iSOCertification" value={iSOCertification} label={tableHead.iSOCertification} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="nBAOtherCertification" value={nBAOtherCertification} label={tableHead.nBAOtherCertification} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4'  id="collaborativeQuality" value={collaborativeQuality} label={tableHead.collaborativeQuality} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4' type="date" id="from" value={from} label={tableHead.from} setState={setValues}  />
				 <Text className='col-md-6 col-lg-4' type="date" id="to" value={to} label={tableHead.to} setState={setValues}  />
				<UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
        </DialogBox>
        
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
        
        <TableComponent TB={data?.data} module={module} getproof="proof" proof="other" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }
  export default IQACInstitutionQualityAssurance
  export {tableHead}