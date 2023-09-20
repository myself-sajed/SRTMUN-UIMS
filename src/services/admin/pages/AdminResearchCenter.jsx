import React, { useState } from 'react'
import AdminDrower from './AdminDrower'
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const AdminResearchCenter = () => {
  const [active, setActive] = useState("BooksAndChapters")

  console.log(active);

  const Btns ={
    "BooksAndChapters":{tableHead:{},name:"Books And Chapters", icon: <MenuBookIcon sx={{fontSize: "30px !important"}}/>},
    "ResearchProjects": {tableHead:{},name:"Research Projects", icon: <ScienceIcon sx={{fontSize: "30px !important"}} />},
    "ResearchPapers": {tableHead:{},name:"Research Papers", icon: <PlagiarismIcon sx={{fontSize: "30px !important"}}/>},
    "Patent": {tableHead:{},name:"Patents", icon: <DocumentScannerIcon sx={{fontSize: "30px !important"}}/>}
  }
  return (
    <div>
      <AdminDrower>
        <div className='sub-main'>
          <div className='flex flex-wrap w-full'>
            {Object.keys(Btns).map((e,i)=>{
              return(
                <div className='col-12 col-sm-6 col-lg-3 px-1 h-[90px]' onClick={()=>{setActive(e)}}>
                <div className={`w-full h-full flex flex-row ${active===e?'bg-[#c19038]':'bg-[#f1f3f4]'} rounded-md border-t-4 border-[#deb66f] ${active===e?'text-[#f1f3f4]':'text-[#ae7e28]'} cursor-pointer`}>
                  <div className='bg-red h-full w-1/4 flex justify-end items-center p-3'>{Btns[e].icon}</div>
                  <div className='bg-red h-full w-3/4 flex flex-col'>
                    <div className='h-1/2 w-full flex items-end text-[18px] font-semibold' >{Btns[e].name}</div>
                    <div className='h-1/2 w-full flex items-start font-semibold text-[14px]'>42</div>
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
                      <th>Sr. No.</th>
                      <th>profile Pic</th>
                      <th>Name</th>
                      <th>School</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Eanroled Program</th>
                      <th>Program Complited on</th>

                    </tr>
                  </thead>
                  <tbody>
                    {/* {
                      tileData?.map((item, index) => <tr>
                        <td>{index + 1}</td>
                        <td><Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${item.photoURL}/student`} /></td>
                        <td>{`${item.salutation} ${item.name}`}</td> 
                        <td>{item.schoolName}</td>
                        <td>{item.gender}</td>
                        <td>{item.email}</td>
                        <td>{item.programGraduated}</td>
                        <td>{model==="StudentUser"?item.programEnroledOn:item.programCompletedOn}</td>
                      </tr>
                      )
                    } */}
                  </tbody>
                </table>
              </div>
        </div>
      </AdminDrower>
    </div>
  )
}

export default AdminResearchCenter
