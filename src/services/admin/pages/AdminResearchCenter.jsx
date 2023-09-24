import React, { useEffect, useState } from 'react'
import AdminDrower from './AdminDrower'
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import GoBack from '../../../components/GoBack';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import { CircularProgress } from '@mui/material';
import FileViewer from '../../../components/FileViewer';
import sortByAcademicYear from '../../../js/sortByAcademicYear';

const AdminResearchCenter = ({ isDirector = false }) => {

  const { School } = useParams();

  const [values, setValues] = useState({ schoolName: School ? School : "All Schools", yearFilter: [] })
  const { schoolName, yearFilter } = values
  const [active, setActive] = useState("JrfSrf")
  const [tableCells, setTableCells] = useState([])


  const Btns ={
    "BooksAndChapters":{tableHead:{},name:"Books And Chapters", icon: <MenuBookIcon sx={{fontSize: "30px !important"}}/>},
    "ResearchProjects": {tableHead:{},name:"Research Projects", icon: <ScienceIcon sx={{fontSize: "30px !important"}} />},
    "ResearchPapers": {tableHead:{},name:"Research Papers", icon: <PlagiarismIcon sx={{fontSize: "30px !important"}}/>},
    "Patent": {tableHead:{},name:"Patents", icon: <DocumentScannerIcon sx={{fontSize: "30px !important"}}/>}
  }

  const getReserchData = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/Admin/reserchCenterData`, filter)
  }

  let schoolFilter = schoolName==='All Schools'? {} :{department: schoolName}
  let academicYearFilter = yearFilter.length === 0? {} : {year: {$in:yearFilter}}

  const { data, isLoading, refetch} = useQuery(['getReserchData', schoolName, yearFilter], () => getReserchData({schoolFilter, academicYearFilter}))

  useEffect(()=>{
    let Cells = Object.keys(Btns[active].tableHead)
    const itemsToRemove = ["index","facultyName","School","proof"]
    setTableCells(Cells.filter(item => !itemsToRemove.includes(item))) 
  },[active])

  console.log(data?.data?.[active])
  return (
    <div>
      {isDirector && <div className='mb-4'><GoBack pageTitle={`${School} Research Center`} /></div>}
      <AdminDrower hideHeader={School ? true : false}>
        <div className='sub-main'>
        <div className='flex px-3 flex-wrap gap-2'>
            <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Academic Year" />
            {!School && <>
              <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
            </>}
          </div>
          <div className='flex flex-wrap w-full'>
            {Object.keys(Btns).map((e,i)=>{
              return(
                <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-1 pb-1 h-[90px]' onClick={() => { setActive(e) }} key={i}>
                  <div className={`w-full h-full flex flex-row ${active === e ? 'bg-[#c19038]' : 'bg-[#f1f3f4]'} rounded-md border-t-4 border-[#deb66f] ${active === e ? 'text-[#f1f3f4]' : 'text-[#ae7e28]'} cursor-pointer`}>
                    <div className='bg-red h-full w-1/4 flex justify-end items-center p-3'>{Btns[e].icon}</div>
                      <div className='bg-red h-full w-3/4 flex flex-col'>
                      <div className='h-1/2 w-full flex items-end text-[15px] font-semibold'>{Btns[e].name}</div>
                      <div className='h-1/2 w-full flex items-start font-semibold text-[14px]'>{isLoading ? <CircularProgress color="inherit" size={18} /> : data.data[e].length}</div>
                    </div>
                  </div>
                </div>
              )
            })
              
            }
          </div>
          <div className='table-responsive mt-4' style={{ height: "90vh" }}>
                <table className="table">
                  <thead className="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
                    <tr>
                      {
                        Object.keys(Btns[active].tableHead).map((e, i) => <th key={i}>{Btns[active].tableHead[e]}</th>)
                      }
                    </tr>
                  </thead>
                  <tbody>
                  {data?.data && sortByAcademicYear(data?.data?.[active], 'year')?.map((item, index) => {
                    let facultyName
                    let school
                    if (item.userId !== undefined && item.userId !== null) {
                      facultyName = `${item.userId.salutation} ${item.userId.name}`;
                      school = item.userId.department;
                    }
                    else if(item.userId === undefined){
                      facultyName = item.guideName
                      school = item.schoolName;
                    }
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{facultyName}</td>
                        <td>{school}</td>
                        {tableCells?.map((e, i) => <td key={i}>{item[e]}</td>)}
                        <td><FileViewer fileName={item.proof} serviceName="faculty" /></td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
        </div>
      </AdminDrower>
    </div>
  )
}

export default AdminResearchCenter
