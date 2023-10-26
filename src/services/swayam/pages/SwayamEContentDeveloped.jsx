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
import Lists from "../../../components/tableComponents/Lists";

const tableHead = { index: "Sr. no.", moduleName: 'Name of the Module / Course developed', creationType: 'Type of Creation', platform: 'Platform on which the module is developed', year: 'Academic Year', link: 'Web link to the content', Proof: "Uploaded Proof", Action: "Action" }

const SwayamEContentDeveloped = () => {
  const module = "swayam"
    const model = "SwayamEContentDeveloped"
    const title = "E-Content Developed"

  let filter = {}
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}|xdgeXXhsjsLpEt):pLj`, () => getReq(params))

  const initialstate = { moduleName: "", creationType: "", platform: "", year: "", link: "", Proof: "", }
  const [values, setValues] = useState(initialstate)
  const { moduleName, creationType, platform, year, link, } = values

  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  const typeObject = {
    moduleName: 'text', creationType: Lists.eContentCreation, platform: Lists.eContentPlatform, year: academicYearGenerator(29, true, true), link: 'text',
  }

  useEffect(() => {
    if(creationType === "Design of new curriculla & courses"){
      setValues((pri)=>{
        return{...pri, link: "N/A", platform: ""}
      })
    }
    else {
      setValues((pri)=>{
        return{...pri, link: "", platform: ""}
      })
  }
  },[creationType]) 

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { moduleName, creationType, platform, year, link, } = item
          setEdit(true); setOpen(true);
          setValues({ moduleName, creationType, platform, year, link, })
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
   addReq({  }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module) 
  }
  // { moduleName, creationType, platform, year, link, }
  return (
    <>
    <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
    <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
      <div className='flex flex-wrap'>
        <Text className='col-md-6 col-lg-4' id="moduleName" value={moduleName} label={tableHead.moduleName} setState={setValues} />
        <Select className='col-md-6 col-lg-4' id="creationType" value={creationType} label={tableHead.creationType} setState={setValues} options={Lists.eContentCreation} />
        <Select className='col-md-6 col-lg-4' id="platform" value={platform} label={tableHead.platform} setState={setValues} options={Lists.eContentPlatform} disable={creationType === "Design of new curriculla & courses"} />
        <Text className='col-md-6 col-lg-4' id="link" value={link} label={tableHead.link} setState={setValues} desable={creationType === "Design of new curriculla & courses"} />
        <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
        <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
      </div>
    </DialogBox>
    <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
    <Table TB={data?.data} module={module} getproof="proof" proof="swayam" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
  </>
  )
}

export default SwayamEContentDeveloped