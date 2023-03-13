import React, { useState, useEffect } from 'react'
import AdminDrower from './AdminDrower'
import JSZip from "jszip";
import Papa from 'papaparse';

import Directors from '../tables_director/Directors';
import adminExcelObject from '../components/adminExcelObject';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import SchoolsProgram from '../../../components/SchoolsProgram';
import AlumniContribution from '../tables_director/AlumniContribution';
import Awards from '../tables_director/Awards';
import ConferencesSemiWorkshopOrganized from '../tables_director/ConferencesSemiWorkshopOrganized';
import CounselingAndGuidance from '../tables_director/CounselingAndGuidance';
import DemandRatio from '../tables_director/DemandRatio';
import Employability from '../tables_director/Employability';
import ExtensionActivities from '../tables_director/ExtensionActivities';
import IctClassrooms from '../tables_director/IctClassrooms';
import MoUs from '../tables_director/MoUs';
import Placements from '../tables_director/Placements';
import ProgressionToHE from '../tables_director/ProgressionToHE';
import ProjectsInternships from '../tables_director/ProjectsInternships';
import QualifiedExams from '../tables_director/QualifiedExams';
import ResearchMethodologyWorkshops from '../tables_director/ResearchMethodologyWorkshops';
import ReservedSeats from '../tables_director/ReservedSeats';
import SkillsEnhancementInitiatives from '../tables_director/SkillsEnhancementInitiatives';
import StudentSatisfactionSurvey from '../tables_director/StudentSatisfactionSurvey';
import SyllabusRevision from '../tables_director/SyllabusRevision';
import TrainingProgramsOrganized from '../tables_director/TrainingProgramsOrganized';
import UgcSapCasDstFistDbtICssr from '../tables_director/UgcSapCasDstFistDBTICSSR';
import ValueAddedCource from '../tables_director/ValueAddedCource';


const AdminDirector = () => {

  const [childData, setChildData] = useState({ director: "", alumnicontribution: "", awards: "", conferencessemiworkshoporganized: "", counselingandguidance: "", awardrecognition: "", employability: "", extensionactivities: "", ictclassrooms: "", mous: "", placements: "", progressiontohe: "", projectsinternships: "", qualifiedexams: "", researchmethodologyworkshops: "", reservedseats: "", skillsenhancementinitiatives: "", studentsatisfactionsurvey: "", syllabusrevision: "", trainingprogramsorganized: "", ugcsapcasdstfistdbticssr: "", valueaddedcource: "", })
  const [values, setValues] = useState({ yearFilter: "", schoolName: "" })
  const { yearFilter, schoolName } = values


  const allDirectorComponents = [
    //all proofs remaining
    {
      element: <Directors id="director" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Directors' />,
      childData: childData?.director, filename: 'Directors.csv', SendReq: "DirectorUser", module: "faculty"
    },
    {
      element: <AlumniContribution id="alumnicontribution" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Contribution' />,
      childData: childData?.alumnicontribution, filename: 'Alumni Contribution.csv', SendReq: "AlumniContribution", module: "director"
    },
    {
      element: <Awards id="awards" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Awards' />,
      childData: childData?.awards, filename: 'Awards.csv', SendReq: "Award", proof: "Upload_Proof", module: "director"
    },
    {
      element: <ConferencesSemiWorkshopOrganized id="conferencessemiworkshoporganized" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Conferences Seminar Workshop Organized' />,
      childData: childData?.conferencessemiworkshoporganized, filename: 'Conferences Seminar Workshop Organized.csv', SendReq: "ConferencesSemiWorkshopOrganized", module: "director", proof: "Upload_Proof",
    },
    {
      element: <CounselingAndGuidance id="counselingandguidance" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Counseling And Guidance' />,
      childData: childData?.counselingandguidance, filename: 'Counseling And Guidance.csv', SendReq: "CounselingAndGuidance", module: "director", proof: "Upload_Proof",
    },
    {
      element: <DemandRatio id="awardrecognition" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Demand Ratio' />,
      childData: childData?.awardrecognition, filename: 'Demand Ratio.csv', SendReq: "DemandRatio", module: "director", proof: "Upload_Proof",
    },
    {
      element: <Employability id="employability" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Employability' />,
      childData: childData?.employability, filename: 'Employability.csv', SendReq: "Employability", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ExtensionActivities id="extensionactivities" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Extension Activities' />,
      childData: childData?.extensionactivities, filename: 'Extension Activities.csv', SendReq: "ExtensionActivities", module: "director", proof: "Upload_Proof",
    },
    {
      element: <IctClassrooms id="ictclassrooms" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Ict Classrooms' />,
      childData: childData?.ictclassrooms, filename: 'IctClassrooms.csv', SendReq: "IctClassrooms", module: "director", proof: "Upload_Proof",
    },
    {
      element: <MoUs id="mous" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='MoUs' />,
      childData: childData?.mous, filename: 'MoUs.csv', SendReq: "MoUs", module: "director", proof: "Upload_Proof",
    },
    {
      element: <Placements id="placements" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Placements' />,
      childData: childData?.consultancy, filename: 'Placements.csv', SendReq: "Placement", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ProgressionToHE id="progressiontohe" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Progression To HE' />,
      childData: childData?.progressiontohe, filename: 'Progression To HE.csv', SendReq: "ProgressionToHE", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ProjectsInternships id="projectsinternships" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Projects Internships' />,
      childData: childData?.projectsinternships, filename: 'Projects Internships.csv', SendReq: "ProjectsInternships", module: "director", proof: "Upload_Proof",
    },
    {
      element: <QualifiedExams id="qualifiedexams" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Qualified Exams' />,
      childData: childData?.qualifiedexams, filename: 'Qualified Exams.csv', SendReq: "QualifiedExams", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ResearchMethodologyWorkshops id="researchmethodologyworkshops" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Methodology Workshops' />,
      childData: childData?.researchmethodologyworkshops, filename: 'Research Methodology Workshops.csv', SendReq: "ResearchMethodologyWorkshops", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ReservedSeats id="reservedseats" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Reserved Seats' />,
      childData: childData?.reservedseats, filename: 'Reserved Seats.csv', SendReq: "ReservedSeats", module: "director", proof: "Upload_Proof",
    },
    {
      element: <SkillsEnhancementInitiatives id="skillsenhancementinitiatives" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Skills Enhancement Initiatives' />,
      childData: childData?.skillsenhancementinitiatives, filename: 'Skills Enhancement Initiatives.csv', SendReq: "SkillsEnhancementInitiatives", module: "director", proof: "Upload_Proof",
    },
    {
      element: <StudentSatisfactionSurvey id="studentsatisfactionsurvey" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Student Satisfaction Survey' />,
      childData: childData?.studentsatisfactionsurvey, filename: 'Student Satisfaction Survey.csv', SendReq: "StudentSatisfactionSurvey", module: "director", proof: "Upload_Proof",
    },
    {
      element: <SyllabusRevision id="syllabusrevision" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Syllabus Revision' />,
      childData: childData?.syllabusrevision, filename: 'Syllabus Revision.csv', SendReq: "SyllabusRevision", module: "director", proof: "Upload_Proof",
    },
    {
      element: <TrainingProgramsOrganized id="trainingprogramsorganized" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Administrative Training Programs Organized' />,
      childData: childData?.trainingprogramsorganized, filename: 'Administrative Training Programs Organized.csv', SendReq: "TrainingProgramsOrganized", module: "director", proof: "Upload_Proof",
    },
    {
      element: <UgcSapCasDstFistDbtICssr id="ugcsapcasdstfistdbticssr" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' />,
      childData: childData?.ugcsapcasdstfistdbticssr, filename: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR.csv', SendReq: "UgcSapCasDstFistDBTICSSR", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ValueAddedCource id="valueaddedcource" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Value Added Cource' />,
      childData: childData?.valueaddedcource, filename: 'Value Added Cource.csv', SendReq: "ValueAddedCource", module: "director", proof: "Upload_Proof",
    },
  ]
  useEffect(() => {
    const dataFacher = async () => {
      allDirectorComponents.map((component) => {
        console.log(component)
      })
    }
  }, [])

  const downloadCSV = async () => {
    const zip = new JSZip();

    // add each CSV file to the zip file
    allDirectorComponents?.forEach(({ childData, filename, SendReq, proof, module }) => {
      let itemdata = []

      childData?.forEach((data, index) => {
        let newdata = {};


        Object.keys(adminExcelObject[SendReq]).forEach((key) => {
          newdata = Object.assign(newdata, { "Sr.No.": index + 1 })
          newdata[adminExcelObject[SendReq][key]] = data[key] ? data[key] : "N.A.";

        })
        if (proof) {
          data[proof] == undefined || data[proof] == "undefined" ? newdata = Object.assign(newdata, { "Link Of Proof": 'File Not Uploaded' }) : newdata = Object.assign(newdata, { "Link Of Proof": `${process.env.REACT_APP_MAIN_URL}/showFile/${data[proof]}/${module}` })
        }
        itemdata.push(newdata)
      })

      zip.file(filename, Papa.unparse(itemdata));
    });

    // generate the zip file and download it
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(content);
    link.setAttribute('download', 'allDirectorExcel.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminDrower>

      <div style={{ width: "100%", overflow: "hidden", background: "#9185b575" }} >
        <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
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
          <button className='col-md-3 col-lg-3 col-12 btn btn-success' style={{ margin: "37px 0px auto 0px" }} onClick={downloadCSV} >Export All Excels</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div style={{ border: "solid #4b0082 2px", width: "100%", padding: "3px", marginBottom: "10px", borderRadius: "10px" }}>

            <div className='flex gap-auto flex-wrap'>
              {
                allDirectorComponents?.map(((item) => item?.element))
              }
            </div>
          </div>
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminDirector