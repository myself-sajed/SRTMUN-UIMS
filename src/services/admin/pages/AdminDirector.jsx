import React, { useEffect, useState } from 'react'
import AdminDrower from './AdminDrower'

import Directors from '../tables_director/Directors';
import adminExcelObject from '../components/adminExcelObject';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
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
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import { downloadExcelZip } from './AdminFaculty';
import CircularProgress from '@mui/material/CircularProgress';


const AdminDirector = () => {

  const [childData, setChildData] = useState({ director: null, alumnicontribution: null, awards: null, conferencessemiworkshoporganized: null, counselingandguidance: null, awardrecognition: null, employability: null, extensionactivities: null, ictclassrooms: null, mous: null, placements: null, progressiontohe: null, projectsinternships: null, qualifiedexams: null, researchmethodologyworkshops: null, reservedseats: null, skillsenhancementinitiatives: null, studentsatisfactionsurvey: null, syllabusrevision: null, trainingprogramsorganized: null, ugcsapcasdstfistdbticssr: null, valueaddedcource: null, })
  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values

  const loadedInitial ={ director: false, alumnicontribution: false, awards: false, conferencessemiworkshoporganized: false, counselingandguidance: false, awardrecognition: false, employability: false, extensionactivities: false, ictclassrooms: false, mous: false, placements: false, progressiontohe: false, projectsinternships: false, qualifiedexams: false, researchmethodologyworkshops: false, reservedseats: false, skillsenhancementinitiatives: false, studentsatisfactionsurvey: false, syllabusrevision: false, trainingprogramsorganized: false, ugcsapcasdstfistdbticssr: false, valueaddedcource: false, }
  const [loaded, setLoaded] = useState(loadedInitial)

  console.log(loaded);
  
  const loading = !(Object.values(loaded).every((value) => value === true));

  const allDirectorComponents = [
    //all proofs remaining
    {
      element: <Directors id="director" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Directors' setLoaded={setLoaded} />,
      childData: childData?.director, filename: 'Directors.xlsx', SendReq: "DirectorUser", module: "faculty"
    },
    {
      element: <AlumniContribution id="alumnicontribution" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Contribution' setLoaded={setLoaded} />,
      childData: childData?.alumnicontribution, filename: 'Alumni Contribution.xlsx', SendReq: "AlumniContribution", proof: "Upload_Proof", module: "director"
    },
    {
      element: <Awards id="awards" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Awards' setLoaded={setLoaded} />,
      childData: childData?.awards, filename: 'Awards.xlsx', SendReq: "Award", proof: "Upload_Proof", module: "director"
    },
    {
      element: <ConferencesSemiWorkshopOrganized id="conferencessemiworkshoporganized" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Conferences Seminar Workshop Organized' setLoaded={setLoaded} />,
      childData: childData?.conferencessemiworkshoporganized, filename: 'Conferences Seminar Workshop Organized.xlsx', SendReq: "ConferencesSemiWorkshopOrganized", module: "director", proof: "Upload_Proof",
    },
    {
      element: <CounselingAndGuidance id="counselingandguidance" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Counseling And Guidance' setLoaded={setLoaded} />,
      childData: childData?.counselingandguidance, filename: 'Counseling And Guidance.xlsx', SendReq: "CounselingAndGuidance", module: "director", proof: "Upload_Proof",
    },
    {
      element: <DemandRatio id="awardrecognition" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Demand Ratio' setLoaded={setLoaded} />,
      childData: childData?.awardrecognition, filename: 'Demand Ratio.xlsx', SendReq: "DemandRatio", module: "director", proof: "Upload_Proof",
    },
    {
      element: <Employability id="employability" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Employability' setLoaded={setLoaded} />,
      childData: childData?.employability, filename: 'Employability.xlsx', SendReq: "Employability", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ExtensionActivities id="extensionactivities" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Extension Activities' setLoaded={setLoaded} />,
      childData: childData?.extensionactivities, filename: 'Extension Activities.xlsx', SendReq: "ExtensionActivities", module: "director", proof: "Upload_Proof",
    },
    {
      element: <IctClassrooms id="ictclassrooms" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Ict Classrooms' setLoaded={setLoaded} />,
      childData: childData?.ictclassrooms, filename: 'IctClassrooms.xlsx', SendReq: "IctClassrooms", module: "director", proof: "Upload_Proof",
    },
    {
      element: <MoUs id="mous" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='MoUs' setLoaded={setLoaded} />,
      childData: childData?.mous, filename: 'MoUs.xlsx', SendReq: "MoUs", module: "director", proof: "Upload_Proof",
    },
    {
      element: <Placements id="placements" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Placements' setLoaded={setLoaded} />,
      childData: childData?.placements, filename: 'Placements.xlsx', SendReq: "Placement", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ProgressionToHE id="progressiontohe" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Progression To HE' setLoaded={setLoaded} />,
      childData: childData?.progressiontohe, filename: 'Progression To HE.xlsx', SendReq: "ProgressionToHE", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ProjectsInternships id="projectsinternships" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Projects Internships' setLoaded={setLoaded} />,
      childData: childData?.projectsinternships, filename: 'Projects Internships.xlsx', SendReq: "ProjectsInternships", module: "director", proof: "Upload_Proof",
    },
    {
      element: <QualifiedExams id="qualifiedexams" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Qualified Exams' setLoaded={setLoaded} />,
      childData: childData?.qualifiedexams, filename: 'Qualified Exams.xlsx', SendReq: "QualifiedExams", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ResearchMethodologyWorkshops id="researchmethodologyworkshops" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Methodology Workshops' setLoaded={setLoaded} />,
      childData: childData?.researchmethodologyworkshops, filename: 'Research Methodology Workshops.xlsx', SendReq: "ResearchMethodologyWorkshops", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ReservedSeats id="reservedseats" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Reserved Seats' setLoaded={setLoaded} />,
      childData: childData?.reservedseats, filename: 'Reserved Seats.xlsx', SendReq: "ReservedSeats", module: "director", proof: "Upload_Proof",
    },
    {
      element: <SkillsEnhancementInitiatives id="skillsenhancementinitiatives" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Skills Enhancement Initiatives' setLoaded={setLoaded} />,
      childData: childData?.skillsenhancementinitiatives, filename: 'Skills Enhancement Initiatives.xlsx', SendReq: "SkillsEnhancementInitiatives", module: "director", proof: "Upload_Proof",
    },
    {
      element: <StudentSatisfactionSurvey id="studentsatisfactionsurvey" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Student Satisfaction Survey' setLoaded={setLoaded} />,
      childData: childData?.studentsatisfactionsurvey, filename: 'Student Satisfaction Survey.xlsx', SendReq: "StudentSatisfactionSurvey", module: "director", proof: "Upload_Proof",
    },
    {
      element: <SyllabusRevision id="syllabusrevision" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Syllabus Revision' setLoaded={setLoaded} />,
      childData: childData?.syllabusrevision, filename: 'Syllabus Revision.xlsx', SendReq: "SyllabusRevision", module: "director", proof: "Upload_Proof",
    },
    {
      element: <TrainingProgramsOrganized id="trainingprogramsorganized" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Administrative Training Programs Organized' setLoaded={setLoaded} />,
      childData: childData?.trainingprogramsorganized, filename: 'Administrative Training Programs Organized.xlsx', SendReq: "TrainingProgramsOrganized", module: "director", proof: "Upload_Proof",
    },
    {
      element: <UgcSapCasDstFistDbtICssr id="ugcsapcasdstfistdbticssr" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' setLoaded={setLoaded} />,
      childData: childData?.ugcsapcasdstfistdbticssr, filename: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR.xlsx', SendReq: "UgcSapCasDstFistDBTICSSR", module: "director", proof: "Upload_Proof",
    },
    {
      element: <ValueAddedCource id="valueaddedcource" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Value Added Course' setLoaded={setLoaded} />,
      childData: childData?.valueaddedcource, filename: 'Value Added Course.xlsx', SendReq: "ValueAddedCource", module: "director", proof: "Upload_Proof",
    },
  ]

  useEffect(() => {
    if (values.yearFilter) {
      setLoaded({
        ...loadedInitial, director: true, ictclassrooms: true,
      });
    } else if (values.schoolName) {
      setLoaded(loadedInitial);
    }
  }, [values.yearFilter, values.schoolName]);

  return (
    <AdminDrower>

      <div className='sub-main'>
        <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
          <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success align-middle' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allDirectorComponents, 'allDirectorExcel') }} disabled={loading} >{loading?<CircularProgress color="inherit" size={18}/>:"Export All Excels"}</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div className='button-wraper'>

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