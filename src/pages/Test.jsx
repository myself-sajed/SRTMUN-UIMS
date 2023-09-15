import React, { useState } from 'react'
import NumberToTextField from '../services/director/reports/academic-audit/components/NumberToTextField'
import TableData from '../services/director/reports/academic-audit/components/TableData'
import AuditTable from '../services/director/reports/academic-audit/components/AuditTable'
import Lists from '../components/tableComponents/Lists'
import Select from '../components/formComponents/Select'
import YearSelect from '../components/formComponents/YearSelect'
import { useQuery } from 'react-query'
import getReq from '../components/requestComponents/getReq'
import addReq from '../components/requestComponents/addReq'

const Test = () => {
    let studentsInfo = {
        auditHead: ["Sr. No.", "स्पर्धकाचे नाव", "कायमचा पत्ता", "भ्रमणध्वनी क्रमांक", "लिंग", "जन्म दिनांक", "१ जुलै २०२३ रोजी स्पर्धकांचे वय", "रक्त गट", "Action"],
        childHead: ['name', 'address', 'mobile', 'gender', 'dob', 'age', 'bloodGroup',],
        fieldOptions: [
            { field: 'text', keyName: "name", label: "स्पर्धकाचे नाव", },
            { field: 'Text', keyName: "address", label: "कायमचा पत्ता" },
            { field: 'Text', keyName: "mobile", label: "भ्रमणध्वनी क्रमांक" },
            { field: 'Select', keyName: "gender", label: "लिंग", options: Lists.gender },
            { field: 'Date', keyName: "dob", label: "जन्म दिनांक" },
            { field: 'Text', keyName: "age", label: "१ जुलै २०२३ रोजी स्पर्धकांचे वय" },
            { field: 'Select', keyName: "bloodGroup", label: "रक्त गट", options: Lists.bloodGr },
        ]

    }
    const module = "youth"
    const model = "YfGroup"

    let filter = {}

    const params = { model, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

    console.log(data);

    const [students, setStudents] = useState({ input: 0 })
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const initialstate = {
         namesOfCompetition: "", academicYear: "",
      }
    const [values, setValues] = useState(initialstate)
    const {namesOfCompetition, academicYear} =values

    console.log("Students :", students)
    const onSubmit = (e) => {
        e.preventDefault();
          addReq({ participantNames: JSON.stringify(students) }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
      }

    return (


        <div>
            <div className='flex justify-around'>
                <Select className="col-md-5" id="namesOfCompetition" value={namesOfCompetition} label="स्पर्धकाचे नाव" setState={setValues} options={Lists.yfGgroup} />
                <YearSelect className='col-md-5' id="academicYear" value={academicYear} label="शैक्षणिक वर्ष" setState={setValues} />
            </div>
            <NumberToTextField state={students} setState={setStudents} setAutoSaveLoader={() => { }} autoSaveLoader={null} label="Enter number of Students participating in the competition" isForm={true} classes='my-3'
                options={studentsInfo.fieldOptions}>

                <AuditTable setAutoSaveLoader={() => { }} tableHead={studentsInfo.auditHead}
                    tableChildHead={studentsInfo.childHead} state={students}
                    setState={setStudents} cellAsInput={false} options={studentsInfo.fieldOptions} isForm={true} editTitle="Students" />

            </NumberToTextField>
            <button onClick={onSubmit}> Submit</button>
        </div>
    )
}

export default Test





































































































































































// import React, { useEffect, useState } from 'react';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
// import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import { CircularProgress, IconButton } from '@mui/material';
// import { useQuery } from 'react-query';
// import GetReq from '../components/requestComponents/getReq';
// import EditReq from '../components/requestComponents/editReq';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const Test = ({ model, module, filter, tableObj }) => {

//     const params = { model, id: '', module, filter };
//     const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => GetReq(params))
//     let emptyfilds = {};
//     useEffect(() => {
//         Object.keys(tableObj).forEach(key => {
//             emptyfilds[key] = "";
//         });

//     }, [])
//     const [Data, setData] = useState([]);
//     const [editMode, setEditMode] = useState(true); // State to track edit mode
//     const [editedIndex, setEditedIndex] = useState(0); // Index of the row being edited
//     const [loading, setLoading] = useState(false)
//     useEffect(() => {
//         setData(data?.data)
//     }, [data])

//     const handleAddRow = () => {
//         setData([...Data, emptyfilds]);
//         handleEditRow(Data.length);
//     };

//     const handleInputChange = (e, index) => {
//         const { name, value } = e.target;
//         const updatedData = [...Data];
//         updatedData[index][name] = value;
//         setData(updatedData);
//     };

//     const handleEditRow = (index) => {
//         setEditMode(true);
//         setEditedIndex(index);
//     };

//     const handleSaveRow = () => {
//         setLoading(true)
//         try {
//             let lastData = Data[editedIndex];
//             axios.post(`${process.env.REACT_APP_MAIN_URL}/${module}/addEditRecord/${model}`, lastData).
//                 then(res => {
//                     if (res.status === 200 || res.status === 201) {
//                         toast.success(res.data);
//                         refetch();
//                         setLoading(false)
//                     } else {
//                         toast.error("Something wrong");
//                         setLoading(false);
//                         refetch();
//                     }
//                 })

//             setEditMode(false);
//             setEditedIndex(-1);
//         } catch (error) {
//             toast.error("Error while adding record");
//             refetch();
//             setLoading(false);
//         }
//     };

//     const handleDeleteRow = (index) => {
//         const updatedData = [...Data];
//         updatedData.splice(index, 1);
//         setData(updatedData);
//     };

//     return (
//         <div>
//             {
//                 isLoading ?
//                     <CircularProgress size={23} /> : <>
//                         <table className="table mt-5 table-bordered">
//                             <thead className="bg-primary text-light">
//                                 <tr>
//                                     {
//                                         Object.values(tableObj).map((e, i) => {
//                                             return (<th key={e + i}>{e}</th>)
//                                         })
//                                     }
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Data?.map((element, index) => (
//                                     <tr key={index}>
//                                         {
//                                             Object.keys(tableObj).map((tds) => {
//                                                 // console.log(element[tds]);
//                                                 return (
//                                                     <td key={tds + index}>
//                                                         {editMode && editedIndex === index ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className="form-control p-2"
//                                                                 name={tds}
//                                                                 value={element[tds]}
//                                                                 onChange={(e) => handleInputChange(e, index)}
//                                                             />
//                                                         ) : (
//                                                             element[tds]
//                                                         )}
//                                                     </td>
//                                                 )
//                                             })
//                                         }
//                                         <td>
//                                             {editMode && editedIndex === index ? (
//                                                 <SaveButton handleSaveRow={handleSaveRow} loading={loading} />
//                                             ) : (
//                                                 <Actions index={index} handleDeleteRow={handleDeleteRow} handleEditRow={handleEditRow} />
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <button onClick={handleAddRow} type="button" class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
//                             <AddRoundedIcon />
//                             Add Row
//                         </button></>
//             }
//         </div>
//     );
// };

// export default Test;

// const Actions = ({ index, handleEditRow, handleDeleteRow }) => {
//     return <div className="flex items-center gap-2">

//         <IconButton onClick={() => handleEditRow(index)}>
//             <EditRoundedIcon />
//         </IconButton>
//         <IconButton onClick={() => handleDeleteRow(index)}>
//             <DeleteRoundedIcon />
//         </IconButton>
//     </div>
// }

// const SaveButton = ({ handleSaveRow, loading }) => {
//     return <button onClick={handleSaveRow} type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white gap-2 bg-blue-700 rounded-lg hover:bg-blue-800 ">
//         {loading ? <CircularProgress /> : <SaveRoundedIcon />}
//         Save Details
//     </button>
// }