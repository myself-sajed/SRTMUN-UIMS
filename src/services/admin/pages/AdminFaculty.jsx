import React, { useState, useEffect } from 'react'
import AdminDrower from './AdminDrower'
import JSZip from "jszip";
import ExcelJS from 'exceljs';

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
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import { toast } from 'react-hot-toast';


const AdminFaculty = () => {

  const [childData, setChildData] = useState({ faculty: "", qualification: "", researchdegrees: "", econtentdeveloped: "", appointmentspriorjoining: "", awardrecognition: "", booksandchapters: "", collaborations: "", conferenceorganised: "", conferencepartipeted: "", consultancy: "", fellowship: "", researchprojects: "", postheldafterjoining: "", lectures: "", researchpapers: "", phdawarded: "", jrfsrfpdf: "", patents: "", invitedtalks: "", orientationrefreshercourse: "", financialsupport: "", responsibilities: "", foraginvisit: "", })
  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values
  // console.log (yearFilter)

  const allFacultyComponents = [
    {
      element: <Faculties id="faculty" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Faculties' />,
      childData: childData?.faculty, filename: 'Faculties.xlsx', SendReq: "User", module: "faculty"
    },
    {
      element: <Qualification id="qualification" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Qualifications' />,
      childData: childData?.qualification, filename: 'Qualification.xlsx', SendReq: "Qualification", module: "faculty"
    },
    {
      element: <ResearchDegrees id="researchdegrees" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Degrees' />,
      childData: childData?.researchdegrees, filename: 'ResearchDegrees.xlsx', SendReq: "Degree", proof: "proof", module: "faculty"
    },
    {
      element: <EContentDeveloped id="econtentdeveloped" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='E-Content Developed' />,
      childData: childData?.econtentdeveloped, filename: 'EContentDeveloped.xlsx', SendReq: "EContentDeveloped", module: "faculty"
    },
    {
      element: <AppointmentsPriorJoining id="appointmentspriorjoining" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Appointments Prior Joining' />,
      childData: childData?.appointmentspriorjoining, filename: 'AppointmentsPriorJoining.xlsx', SendReq: "AppointmentsHeldPrior", module: "faculty"
    },
    {
      element: <AwardRecognition id="awardrecognition" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Award Recognition' />,
      childData: childData?.awardrecognition, filename: 'Award Recognition.xlsx', SendReq: "AwardRecognition", proof: "proof", module: "faculty"
    },
    {
      element: <BooksAndChapters id="booksandchapters" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Books And Chapters' />,
      childData: childData?.booksandchapters, filename: 'BooksAndChapters.xlsx', SendReq: "BookAndChapter", proof: "proof", module: "faculty"
    },
    {
      element: <Collaborations id="collaborations" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Collaborations' />,
      childData: childData?.collaborations, filename: 'Collaborations.xlsx', SendReq: "Collaboration", proof: "proof", module: "faculty"
    },
    {
      element: <ConferenceOrganised id="conferenceorganised" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Conference Organised' />,
      childData: childData?.conferenceorganised, filename: 'ConferenceOrganised.xlsx', SendReq: "ConferenceOrganized", proof: "proof", module: "faculty"
    },
    {
      element: <ConferencePartipeted id="conferencepartipeted" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Conference Participated' />,
      childData: childData?.conferencepartipeted, filename: 'Conference Participated.xlsx', SendReq: "ConferenceParticipated", proof: "proof", module: "faculty"
    },
    {
      element: <Consultancy id="consultancy" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Consultancy Services' />,
      childData: childData?.consultancy, filename: 'Consultancy.xlsx', SendReq: "ConsultancyServices", proof: "proof", module: "faculty"
    },
    {
      element: <Fellowship id="fellowship" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Fellowships' />,
      childData: childData?.fellowship, filename: 'Fellowship.xlsx', SendReq: "Fellowship", proof: "proof", module: "faculty"
    },
    {
      element: <ResearchProjects id="researchprojects" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Projects' />,
      childData: childData?.researchprojects, filename: 'ResearchProjects.xlsx', SendReq: "ResearchProject", proof: "proof", module: "faculty"
    },
    {
      element: <PostHeldAfterJoining id="postheldafterjoining" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Post Held After Joining' />,
      childData: childData?.postheldafterjoining, filename: 'PostHeldAfterJoining.xlsx', SendReq: "PostHeld", proof: "proof", module: "faculty"
    },
    {
      element: <Lectures id="lectures" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Lectures' />,
      childData: childData?.lectures, filename: 'Lectures.xlsx', SendReq: "Lectures", module: "faculty"
    },
    {
      element: <ResearchPapers id="researchpapers" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Research Papers' />,
      childData: childData?.researchpapers, filename: 'ResearchPapers.xlsx', SendReq: "ResearchPaper", proof: "proof", module: "faculty"
    },
    {
      element: <PhdAwarded id="phdawarded" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Ph.D. Awarded' />,
      childData: childData?.phdawarded, filename: 'PhdAwarded.xlsx', SendReq: "PhdAwarded", proof: "proof", module: "faculty"
    },
    {
      element: <JrfSrfPdf id="jrfsrfpdf" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='JRF, SRF, PDF, Research Associate' />,
      childData: childData?.jrfsrfpdf, filename: 'JrfSrfPdf.xlsx', SendReq: "JrfSrf", proof: "proof", module: "faculty"
    },
    {
      element: <Patents id="patents" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Patents' />,
      childData: childData?.patents, filename: 'Patents.xlsx', SendReq: "Patent", proof: "proof", module: "faculty"
    },
    {
      element: <InvitedTalks id="invitedtalks" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Invited Talks' />,
      childData: childData?.invitedtalks, filename: 'InvitedTalks.xlsx', SendReq: "InvitedTalk", proof: "proof", module: "faculty"
    },
    {
      element: <OrientationRefresherCourse id="orientationrefreshercourse" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Orientation Refresher Course' />,
      childData: childData?.orientationrefreshercourse, filename: 'OrientationRefresherCourse.xlsx', SendReq: "Online", proof: "proof", module: "faculty"
    },
    {
      element: <FinancialSupport id="financialsupport" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Financial Support' />,
      childData: childData?.financialsupport, filename: 'FinancialSupport.xlsx', SendReq: "Financialsupport", proof: "proof", module: "faculty"
    },
    {
      element: <Responsibilities id="responsibilities" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Responsibilities' />,
      childData: childData?.responsibilities, filename: 'Responsibilities.xlsx', SendReq: "Responsibilities", proof: "proof", module: "faculty"
    },
    {
      element: <ForaginVisit id="foraginvisit" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Foreign Visits' />,
      childData: childData?.foraginvisit, filename: 'Foreign Visits.xlsx', SendReq: "ForeignVisit", module: "faculty"
    },
  ]

  return (
    <AdminDrower>

      <div className='sub-main' >
        <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />

          <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allFacultyComponents, 'allFacultiesExcel') }} >Export All Excels</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div className='button-wraper'>

            <div className='flex gap-auto flex-wrap'>
              {
                allFacultyComponents?.map(item => item?.element)
              }
            </div>
          </div>
        </div>
      </div>
    </AdminDrower>
  )
}

const downloadExcelZip = async (allComponentData, zipName) => {
  try {
    const zip = new JSZip();

    // Generate Excel worksheets and add them to the zip file
    allComponentData.forEach(({ childData, filename, SendReq, proof, module }) => {
      const columnMapping = adminExcelObject[SendReq];

      if (!columnMapping) {
        throw new Error(`Column mapping '${SendReq}' not found.`);
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const columnNames = Object.values(columnMapping);
      columnNames.unshift('Sr.No.');

      // Set column headers and formatting
      const headerRow = worksheet.addRow(columnNames);
      headerRow.font = { bold: true, size: 12 };

      // Apply formatting to all cells
      worksheet.columns.forEach((column) => {
        column.width = 20;
        column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      });

      // Add data rows with auto-incrementing numbers
      childData.forEach((rowData, index) => {
        const values = Object.keys(columnMapping).map((columnName) => columnName === 'userId.name' ? rowData.userId.name : columnName === 'userId.username' ? rowData.userId.username : columnName === 'userId.department' ? rowData.userId.department : rowData[columnName] || 'N.A.');
        values.unshift(index + 1);
        worksheet.addRow(values);
      });

      if (proof) {
        const lastColumnIndex = Object.keys(columnMapping).length + 2;
        const proofColumnName = "Link Of Proof";

        worksheet.getColumn(lastColumnIndex).header = proofColumnName;

        for (let i = 2; i <= childData.length + 1; i++) {
          const proofValue = childData[i - 2][proof] == undefined || childData[i - 2][proof] == "undefined" ? 'Not Uploaded' : 'View Proof';
          const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`);
          if (proofValue === 'View Proof') {
            const proofURL = `${process.env.REACT_APP_MAIN_URL}/showFile/${childData[i - 2][proof]}/${module}`;
            cell.value = { text: proofValue, hyperlink: proofURL };
            cell.font = { color: { argb: 'FF0000FF' }, underline: true };
          } else {
            cell.value = proofValue;
          }
        }

        // Set width and alignment for the last column
        worksheet.getColumn(lastColumnIndex).width = 20;
        worksheet.getColumn(lastColumnIndex).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      }
      worksheet.getRow(1).font = { bold: true, size: 12 };
      worksheet.getRow(1).height = 30;

      for (let i = 2; i <= childData.length; i++) {
        worksheet.getRow(i).commit();
      }

      // Save the workbook as a file
      const buffer = workbook.xlsx.writeBuffer();
      zip.file(filename, buffer);
    });

    // Generate the zip file and download it
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(content);
    link.setAttribute('download', `${zipName}.zip`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Excel zip generated and downloaded successfully.');
    toast.success("Excel zip generated successfully")
  }
  catch (err) {
    console.error('Error while generating Excel zip:', err);
    toast.error("Error while generating try again")
  }
};

export default AdminFaculty
export { downloadExcelZip }