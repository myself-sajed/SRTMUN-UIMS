import React, { useState, useEffect } from 'react'
import AdminDrower from './AdminDrower'
import JSZip from "jszip";
import Papa from 'papaparse';

import EContentDeveloped from '../tables_faculty/EContentDeveloped';
import Faculties from '../tables_faculty/Faculties';
import Qualification from '../tables_faculty/Qualification';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import SchoolsProgram from '../../../components/SchoolsProgram';
import ResearchDegrees from '../tables_faculty/ResearchDegrees';
import AppointmentsPriorJoining from '../tables_faculty/AppointmentsPriorJoining';
import AwardRecognition from '../tables_faculty/AwardRecognition';
import BooksAndChapters from '../tables_faculty/BooksAndChapters';
import Collaborations from '../tables_faculty/Collaborations';
import ConferenceOrganised from '../tables_faculty/ConferenceOrganised';
import ConferencePartipeted from '../tables_faculty/ConferencePartipeted';
import Consultancy from '../tables_faculty/Consultancy';
import Fellowship from '../tables_faculty/Fellowship';
import ResearchProjects from '../tables_faculty/ResearchProjects';
import PostHeldAfterJoining from '../tables_faculty/PostHeldAfterJoining';
import Lectures from '../tables_faculty/Lactures';
import ResearchPapers from '../tables_faculty/ResearchPapers';
import PhdAwarded from '../tables_faculty/PhdAwarded';
import JrfSrfPdf from '../tables_faculty/JrfSrfPdf';
import Patents from '../tables_faculty/Patents';
import InvitedTalks from '../tables_faculty/InvitedTalks';
import OrientationRefresherCourse from '../tables_faculty/OrientationRefresherCourse';
import FinancialSupport from '../tables_faculty/FinancialSupport';
import Responsibilities from '../tables_faculty/Responsibilities';
import ForaginVisit from '../tables_faculty/ForaginVisit';
import adminExcelObject from '../components/adminExcelObject';


const AdminFaculty = () => {

  const [childData, setChildData] = useState({faculty: "", qualification: "", researchdegrees: "", econtentdeveloped: "", appointmentspriorjoining: "", awardrecognition: "", booksandchapters: "", collaborations: "", conferenceorganised: "", conferencepartipeted: "", consultancy: "", fellowship: "", researchprojects: "", postheldafterjoining: "", lectures: "", researchpapers: "", phdawarded: "", jrfsrfpdf: "", patents: "", invitedtalks: "", orientationrefreshercourse: "", financialsupport: "", responsibilities: "", foraginvisit: "",})
  const [values, setValues] = useState({ yearFilter: "", schoolName: "" })
  const { yearFilter, schoolName } = values


  const allFacultyComponents = [
    {
      element: <Faculties id="faculty" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading= 'Faculties' />,
      childData: childData?.faculty, filename: 'Faculties.csv', SendReq:"User",  module: "faculty"
    },
    {
      element: <Qualification id="qualification" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading= 'Qualifications' />,
      childData: childData?.qualification, filename: 'Qualification.csv', SendReq:"Qualification",  module: "faculty"
    },
    {
      element: <ResearchDegrees id="researchdegrees" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading= 'Research Degrees' />,
      childData: childData?.researchdegrees, filename: 'ResearchDegrees.csv', SendReq:"Degree", proof: "Proof", module: "faculty"
    },
    {
      element: <EContentDeveloped id="econtentdeveloped" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName}  Heading='E-Content Developed' />,
      childData: childData?.econtentdeveloped, filename: 'EContentDeveloped.csv', SendReq:"EContentDeveloped",  module: "faculty"
    },
    {
      element: <AppointmentsPriorJoining id="appointmentspriorjoining" setState={setChildData}  yearFilter={yearFilter} schoolName={schoolName} Heading='Appointments Prior Joining' />,
      childData: childData?.appointmentspriorjoining, filename: 'AppointmentsPriorJoining.csv', SendReq:"AppointmentsHeldPrior", module: "faculty"
    },
    {
      element: <AwardRecognition id="awardrecognition" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Award Recognation' />,
      childData: childData?.awardrecognition, filename: 'AwardRecognition.csv', SendReq:"AwardRecognition", proof: "proof", module: "faculty"
    },
    {
      element: <BooksAndChapters id="booksandchapters" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Books And Chapters' />,
      childData: childData?.booksandchapters, filename: 'BooksAndChapters.csv', SendReq:"BookAndChapter", proof: "proof", module: "faculty"
    },
    {
      element: <Collaborations id="collaborations" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Colaborations' />,
      childData: childData?.collaborations, filename: 'Collaborations.csv', SendReq:"Collaboration", proof: "proof", module: "faculty"
    },
    {
      element: <ConferenceOrganised id="conferenceorganised" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Conference Organised' />,
      childData: childData?.conferenceorganised, filename: 'ConferenceOrganised.csv', SendReq:"ConferenceOrganized", proof: "proof", module: "faculty"
    },
    {
      element: <ConferencePartipeted id="conferencepartipeted" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Conference Partipeted' />,
      childData: childData?.conferencepartipeted, filename: 'ConferencePartipeted.csv', SendReq:"ConferenceParticipated", proof: "proof", module: "faculty"
    },
    {
      element: <Consultancy id="consultancy" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Consultancy Services' />,
      childData: childData?.consultancy, filename: 'Consultancy.csv', SendReq:"ConsultancyServices", proof: "proof", module: "faculty"
    },
    {
      element: <Fellowship id="fellowship" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Fellowships' />,
      childData: childData?.fellowship, filename: 'Fellowship.csv', SendReq:"Fellowship", proof: "proof", module: "faculty"
    },
    {
      element: <ResearchProjects id="researchprojects" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Projects' />,
      childData: childData?.researchprojects, filename: 'ResearchProjects.csv', SendReq:"ResearchProject", proof: "proof", module: "faculty"
    },
    {
      element: <PostHeldAfterJoining id="postheldafterjoining" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Post Held After Joining' />,
      childData: childData?.postheldafterjoining, filename: 'PostHeldAfterJoining.csv', SendReq:"PostHeld", proof: "proof", module: "faculty"
    },
    {
      element: <Lectures id="lectures" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Lectures' />,
      childData: childData?.lectures, filename: 'Lectures.csv', SendReq:"Lectures", module: "faculty"
    },
    {
      element: <ResearchPapers id="researchpapers" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Papers' />,
      childData: childData?.researchpapers, filename: 'ResearchPapers.csv', SendReq:"ResearchPaper", proof: "proof", module: "faculty"
    },
    {
      element: <PhdAwarded id="phdawarded" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Ph.D. Awarded' />,
      childData: childData?.phdawarded, filename: 'PhdAwarded.csv', SendReq:"PhdAwarded", proof: "proof", module: "faculty"
    },
    {
      element: <JrfSrfPdf id="jrfsrfpdf" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='JRF, SRF, PDF, Research Associate' />,
      childData: childData?.jrfsrfpdf, filename: 'JrfSrfPdf.csv', SendReq:"JrfSrf", proof: "proof", module: "faculty"
    },
    {
      element: <Patents id="patents" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Patents' />,
      childData: childData?.patents, filename: 'Patents.csv', SendReq:"Patent", proof: "proof", module: "faculty"
    },
    {
      element: <InvitedTalks id="invitedtalks" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Invited Talks' />,
      childData: childData?.invitedtalks, filename: 'InvitedTalks.csv', SendReq:"InvitedTalk", proof: "proof", module: "faculty"
    },
    {
      element: <OrientationRefresherCourse id="orientationrefreshercourse" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Orientation Refresher Course' />,
      childData: childData?.orientationrefreshercourse, filename: 'OrientationRefresherCourse.csv', SendReq:"Online", proof: "proof", module: "faculty"
    },
    {
      element: <FinancialSupport id="financialsupport" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Financial Support' />,
      childData: childData?.financialsupport, filename: 'FinancialSupport.csv', SendReq:"Financialsupport", proof: "proof", module: "faculty"
    },
    {
      element: <Responsibilities id="responsibilities" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Responsibilities' />,
      childData: childData?.responsibilities, filename: 'Responsibilities.csv', SendReq:"Responsibilities", proof: "proof", module: "faculty"
    },
    {
      element: <ForaginVisit id="foraginvisit" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Foragin Visit' />,
      childData: childData?.foraginvisit, filename: 'ForaginVisit.csv', SendReq:"ForeignVisit", module: "faculty"
    },
  ]
useEffect(() =>{
    const dataFacher = async()=> {
      allFacultyComponents.map((component)=> {
        console.log(component)
      })
    }
  },[])

  const downloadCSV = async() => {
    const zip = new JSZip();
    
   // add each CSV file to the zip file
   allFacultyComponents.forEach(({ childData, filename, SendReq ,proof, module}) => {
    let itemdata = []
    


    childData?.forEach((data, index) => {
      let newdata = {};


      Object.keys(adminExcelObject[SendReq]).forEach((key) => {
        newdata = Object.assign(newdata, { "Sr.No.": index + 1 })
        if (key === 'userId.name') { newdata[adminExcelObject[SendReq][key]] = data.userId?.name }
        else if (key === 'userId.department') { newdata[adminExcelObject[SendReq][key]] = data.userId?.department }
        else if (key === 'userId.username') { newdata[adminExcelObject[SendReq][key]] = data.userId?.username }
        else { newdata[adminExcelObject[SendReq][key]] = data[key] ? data[key] : "N.A."; }

      })
      if (proof) {
        data[proof] == undefined || data[proof] == "undefined" ? newdata = Object.assign(newdata, { "Link Of Proof": 'File Not Uploaded' }) : newdata = Object.assign(newdata, { "Link Of Proof": `${process.env.REACT_APP_MAIN_URL}/showFile/${data[proof]}/${module}` })
      }
      itemdata.push(newdata)
    })


    // console.log(data)
    zip.file(filename, Papa.unparse(itemdata));
  });

  // generate the zip file and download it
  const content = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(content);
  link.setAttribute('download', 'allFacultiesExcel.zip');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  };

  return (
    <AdminDrower>

      <div style={{ width: "100%", overflow: "hidden", background: "#9185b575" }} >
        <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          {/* <Select className='col-md-4 col-lg-4 col-12' id="schoolName" value={schoolName} label="Filter By School" setState={setValues} options={} /> */}
          <div className='col-12 p-1 col-md-4 col-lg-4'>
            <label htmlFor="choose" className="form-label" >Filter By School</label>
            <select className="form-select" id="schoolName" required="true"
                onChange={(e) => {
                    console.log(e.target.value);
                    setValues((pri) => {
                        return {
                            ...pri,
                            schoolName: e.target.value
                        }
                    })
                }
                } value={values.schoolName}>
                <option selected value="">All School</option>
                {
                    Object.keys(SchoolsProgram)?.map((e) => {
                        return <option value={e}>{e}</option>
                    })
                }
            </select>
        </div>
          <button className='col-md-3 col-lg-3 col-12 btn btn-success' style={{margin: "37px 0px auto 0px"}} onClick={downloadCSV} >Export All Excels</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div style={{ border: "solid #4b0082 2px", width: "100%", padding: "3px", marginBottom: "10px", borderRadius: "10px" }}>

            <div className='flex gap-auto flex-wrap'>
              {
                allFacultyComponents?.map(((item) => item?.element))
              }
            </div>
          </div>
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminFaculty