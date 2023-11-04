import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import { academicYearGenerator } from '../../../inputs/Year'
import BulkExcel from '../../../components/BulkExcel'

const tableHead = { index: "Sr. no.", fullTimeTeacher: 'Name of the full time teacher', qualification: "Qualification", recognisedAsResearchGuide: "Whether Recognised as research guide", researchCenterName: "Research Center Name", year: "Year of recognition as research gude", Proof: "Guideship Letter", Action: "Action"}

const AdminResearchGuide = () => {
    const model = 'ResearchGuideAdmin'
    const module = 'adminTable'
    const title = 'Research Guide'

    const filter = {}

    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery(`${model}8]6ss$!N,0.pfI0X9;Dl`, () => getReq(params))

    const initialstate = { fullTimeTeacher: "", qualification: "", recognisedAsResearchGuide: "", researchCenterName: "", year: "", Proof: "", }
    const [values, setValues] = useState(initialstate)
    const { fullTimeTeacher, qualification, recognisedAsResearchGuide, researchCenterName, year, } = values
    const [open, setOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [excelOpen, setExcelOpen] = useState(false)

    const typeObject = {
        fullTimeTeacher: 'text', qualification: "text", recognisedAsResearchGuide: "text", researchCenterName: "text", year: academicYearGenerator( 29, true, true ),
    }

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { fullTimeTeacher, qualification, recognisedAsResearchGuide, researchCenterName, year, } = item
                    setEdit(true); setOpen(true);
                    setValues({ 
                             fullTimeTeacher, qualification, recognisedAsResearchGuide, researchCenterName, year,
                     })
                }
            })
        }
    }, [itemToEdit, data?.data])

    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({}, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
    //  , , year,
    return (
        <>
            <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
            <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="fullTimeTeacher" value={fullTimeTeacher} label={tableHead.fullTimeTeacher} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="qualification" value={qualification} label={tableHead.qualification} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="recognisedAsResearchGuide" value={recognisedAsResearchGuide} label={tableHead.recognisedAsResearchGuide} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="researchCenterName" value={researchCenterName} label={tableHead.researchCenterName} setState={setValues} />
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label="Choose Year" setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' serviceName="admin" />
            <Table TB={data?.data} module={module} getproof="proof" proof="admin" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}

export default AdminResearchGuide