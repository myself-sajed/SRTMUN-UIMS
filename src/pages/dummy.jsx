import SyllabusRevision from '../../director/pages/SyllabusRevision'
import Employability from '../../director/pages/Employability'
import ValueAddedCource from '../../director/pages/ValueAddedCource'
import ProjectsInternships from '../../director/pages/ProjectsInternships'
import DemandRatio from '../../director/pages/DemandRatio'
import ReservedSeats from '../../director/pages/ReservedSeats'
import UgcSapCasDstFistDbtICssr from '../../director/pages/UgcSapCasDstFistDBTICSSR'
import ResearchMethodologyWorkshops from '../../director/pages/ResearchMethodologyWorkshops'
import Awards from '../../director/pages/Awards'
import ExtensionActivities from '../../director/pages/ExtensionActivities'
import MoUs from '../../director/pages/MoUs'
import CounselingAndGuidance from '../../director/pages/CounselingAndGuidance'
import SkillsEnhancementInitiatives from '../../director/pages/SkillsEnhancementInitiatives'
import QualifiedExams from '../../director/pages/QualifiedExams'
import Placements from '../../director/pages/Placements'
import ProgressionToHE from '../../director/pages/ProgressionToHE'
import AlumniContribution from '../../director/pages/AlumniContribution'
import TrainingProgramsOrganized from '../../director/pages/TrainingProgramsOrganized'
import AQARTextMatter from '../components/AQARTextMatter'
import AdminMasterTable from '../../admin/components/AdminMasterTable'

function AQARTablesObject({ academicYear, isDirector, school }) {
    return {
        "extended-profile": [],
        "criterion-1": [
            {
                title: '1.2.1 - Employability',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director', school
                },
                isAdmin: isDirector ? false : true,
                // component: isDirector ? <Employability filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="Employability" costomParams={{ model: "Employability", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Courses focusing employability / entrepreneurship / skill development' serviceName="director" />
                // component: <AQARTextMatter academicYear={academicYear} matterType="Employability" userType="director" school={school} isAdmin={isDirector ? false : true} />
            },
            {
                title: '1.2.2 - Syllabus Revision ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: isDirector ?
                    <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="SyllabusRevision" costomParams={{ model: "SyllabusRevision", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Syllabus Revision' serviceName="director" />,
            },
            {
                title: '1.3.3 - Value Added Courses ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ValueAddedCource', userType: 'director'
                },
                component: isDirector ?
                    <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="ValueAddedCource" costomParams={{ model: "ValueAddedCource", module: "Admin", filter: { Academic_year: academicYear } }} heading='Value Added Courses' serviceName="director" />,
            },
            {
                title: '1.3.4 - Projects / Internships',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProjectsInternships', userType: 'director'
                },
                component: isDirector ?
                    <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProjectsInternships" costomParams={{ model: "ProjectsInternships", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Projects / Internships' serviceName="director" />,
            },
        ],
        "criterion-2": [
            {
                title: '2.1.1 - Demand Ratio',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'DemandRatio', userType: 'director'
                },
                component: isDirector ?
                    <DemandRatio filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="DemandRatio" costomParams={{ model: "DemandRatio", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Demand Ratio' serviceName="director" />,
            },
            {
                title: '2.1.2 - Seats reserved for various categories as per applicable reservation policy',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ReservedSeats', userType: 'director'
                },
                component: isDirector ?
                    <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ReservedSeats" costomParams={{ model: "ReservedSeats", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Seats reserved for various categories as per applicable reservation policy' serviceName="director" />,
            },
        ],
        "criterion-3": [
            {
                title: '3.1.3 - Teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research  during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Fellowship', userType: 'faculty'
                },
                component: <AdminMasterTable model="Fellowship" academicYear={academicYear} school={school} heading='Fellowships' serviceName="faculty" />
            },
            {
                title: '3.1.4 - JRFs, SRFs, Post Doctoral Fellows, Research Associates and other research fellows enrolled in the institution during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'JrfSrf', userType: 'faculty'
                },
                component: <AdminMasterTable model="JrfSrf" academicYear={academicYear} school={school} heading='JRFs, SRFs, PDF, Research Associates' serviceName="faculty" />
            },
            {
                title: '3.1.6 - UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" costomParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" />,
            },
            {
                title: '3.3.2 - Research Methodology Workshops ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchMethodologyWorkshops', userType: 'director'
                },
                component: isDirector ?
                    <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ResearchMethodologyWorkshops" costomParams={{ model: "ResearchMethodologyWorkshops", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Research Methodology Workshops' serviceName="director" />,
            },
            {
                title: '3.3.3 - Awards ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Award', userType: 'director'
                },
                component: isDirector ?
                    <Awards filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Award" costomParams={{ model: "Award", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Awards' serviceName="director" />,
            },
            {
                title: '3.4.2 - Full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'AwardRecognition', userType: 'faculty'
                },
                component: <AdminMasterTable model="AwardRecognition" academicYear={academicYear} school={school} heading='Award Recognition' serviceName="faculty" />
            },
            {
                title: '3.4.3 - Patents published/awarded during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Patent', userType: 'faculty'
                },
                component: <AdminMasterTable model="Patent" academicYear={academicYear} school={school} heading='Patents' serviceName="faculty" />
            },
            {
                title: '3.4.4 - Ph.D awarded during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'PhdAwarded', userType: 'faculty'
                },
                component: <AdminMasterTable model="PhdAwarded" costomParams={{
                    model: "PhdAwarded", module: "Admin", filter: { year: academicYear, degreeName: "Ph.D.", awardSubmit: 'Awarded' },
                    filterConditios: { school }
                }} heading='Ph.D Awarded' serviceName="faculty" />
            },
            {
                title: '3.4.5 - Research papers per teacher in the Journals notified on UGC website during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchPapers', userType: 'faculty'
                },
                component: <AdminMasterTable model="ResearchPapers" academicYear={academicYear} school={school} heading='Research papers' serviceName="faculty" />
            },
            {
                title: '3.4.6 - Books and  Chapters in edited volumes published per teacher during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'BooksAndChapters', userType: 'faculty'
                },
                component: <AdminMasterTable model="BooksAndChapters" academicYear={academicYear} school={school} heading='Books and  Chapters' serviceName="faculty" />
            },
            {
                title: '3.4.7 - E-content is developed by teachers',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'EContentDeveloped', userType: 'faculty'
                },
                component: <AdminMasterTable model="EContentDeveloped" academicYear={academicYear} school={school} heading='E-content Developed' serviceName="faculty" />
            },
            {
                title: '3.5.2 - Consultancy Services',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ConsultancyServices', userType: 'faculty'
                },
                component: <AdminMasterTable model="ConsultancyServices" academicYear={academicYear} school={school} heading='Consultancy Services' serviceName="faculty" />
            },
            {
                title: '3.6.3 - Extension Activities ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ExtensionActivities', userType: 'director'
                },
                component: isDirector ?
                    <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ExtensionActivities" costomParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: academicYear } }} heading='Extension Activities' serviceName="director" />,
            },
            {
                title: '3.7.1 - Collaborative activities and academic development of faculty and students during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Collaboration', userType: 'faculty'
                },
                component: <AdminMasterTable model="Collaboration" academicYear={academicYear} school={school} heading='Collaborations' serviceName="faculty" />
            },
            {
                title: '3.7.2 - Memorandum of Understanding (MoU) ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'MoUs', userType: 'director'
                },
                component: isDirector ?
                    <MoUs filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="MoUs" costomParams={{ model: "MoUs", module: "Admin", filter: { Academic_Year: academicYear } }} heading='MoUs' serviceName="director" />,
            },
        ],
        "criterion-4": [],
        "criterion-5": [
            {
                title: '5.1.2 - Counseling and Guidance ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'CounselingAndGuidance', userType: 'director'
                },
                component: isDirector ?
                    <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="CounselingAndGuidance" costomParams={{ model: "CounselingAndGuidance", module: "Admin", filter: { Year_of_Activity: academicYear } }} heading='Counseling and Guidance' serviceName="director" />,
            },
            {
                title: '5.1.3 - Skills Enhancement Initiatives',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SkillsEnhancementInitiatives', userType: 'director'
                },
                component: isDirector ?
                    <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="SkillsEnhancementInitiatives" costomParams={{ model: "SkillsEnhancementInitiatives", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Skills Enhancement Initiatives' serviceName="director" />,
            },
            {
                title: '5.2.1 - Qualified Exams',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'QualifiedExams', userType: 'director'
                },
                component: isDirector ?
                    <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="QualifiedExams" costomParams={{ model: "QualifiedExams", module: "Admin", filter: { Acadmic_year: academicYear } }} heading='Qualified Exams' serviceName="director" />,
            },
            {
                title: '5.2.2 - Placements',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Placement', userType: 'director'
                },
                component: isDirector ?
                    <Placements filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Placement" costomParams={{ model: "Placement", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Placements' serviceName="director" />,
            },
            {
                title: '5.2.3 - Progression to Higher Education',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProgressionToHE', userType: 'director'
                },
                component: isDirector ?
                    <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProgressionToHE" costomParams={{ model: "ProgressionToHE", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Progression to Higher Education' serviceName="director" />,
            },
        ],
        "criterion-6": [
            {
                title: '6.3.3 - Professional Development / Administrative Training programs organized',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'TrainingProgramsOrganized', userType: 'director'
                },
                component: isDirector ?
                    <TrainingProgramsOrganized filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="TrainingProgramsOrganized" costomParams={{ model: "TrainingProgramsOrganized", module: "Admin", filter: { Year: academicYear } }} heading='Professional Development / Administrative Training Programs Organized' serviceName="director" />,
            },
            {
                title: '6.3.4 - Teachers undergoing online/ face-to-face  Faculty Development Programmes (FDP)during  the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Online', userType: 'faculty'
                },
                component: <AdminMasterTable model="Online" academicYear={academicYear} school={school} heading='Orientation / Refresher Course (FDP)' serviceName="faculty" />
            },
        ],
        "criterion-7": [],
        director: [

            {
                title: 'Alumni Contribution',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'AlumniContribution', userType: 'director'
                },
                component: <AlumniContribution filterByAcademicYear={true} academicYear={academicYear} />
            },


        ]
    }
}


export default AQARTablesObject























// import React, { useState, useRef, useEffect } from "react";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
// import { IconButton, Tooltip } from "@mui/material";
// import { useSelector } from "react-redux";
// import sortByAcademicYear from "../js/sortByAcademicYear";
// import { useQuery } from "react-query";
// import refresh from "../services/faculty/js/refresh";
// import CASDataTable from "../services/faculty/reports/cas/components/CASDataTable";
// import useAuth from "../hooks/useAuth";

// function Test() {
//   useAuth(false);

//   const user = useSelector((state) => state.user.user);
//   const [serverData, setServerData] = useState([
//     {
//       _id: "64bfff9534fd2d912e72d839",
//       lectureTitle:
//         "Free and Open Source Mathematical Software’s for e- content development",
//       seminarTitle: "Refresher Course in Mathematics",
//       organizedBy: "UGC-HRDC University of Hyderabad",
//       isNat: "National",
//       nature: "Invited Talk",
//       year: "2022-23",
//       proof: "1690304405864-Resource person certificate UOH.pdf",
//       userId: "62b0a06942f8174e43cd9a26",
//       createdAt: "2023-07-25T17:00:05.871Z",
//       updatedAt: "2023-07-25T17:00:05.871Z",
//       __v: 0,
//     },
//     {
//       _id: "62b74d16f7635cd7148c3379",
//       lectureTitle: "Create And Design Website For Free Using Google Sites",
//       seminarTitle:
//         "UGC Sponsored Online Refresher Course In Physical Education For The Teachers Working In University Departments & Colleges, 24th August To 05th September, 2020",
//       organizedBy:
//         "PG Department Of Physical Education, Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur",
//       isNational: "National",
//       year: "2020-21",
//       proof: "1656413321615-nagpur hrdc certificate.pdf",
//       userId: "62b0a06942f8174e43cd9a26",
//       createdAt: "2022-06-25T17:59:50.952Z",
//       updatedAt: "2023-06-27T10:18:47.992Z",
//       __v: 0,
//       isNat: "National",
//       nature: "Resource Person",
//     },
//     {
//       _id: "649abb09c6ae94e61ba1b476",
//       lectureTitle: "Software for online exam",
//       seminarTitle:
//         "One Week National Online FDP on ICT Tools for Effective Teaching Learning",
//       organizedBy: "School of Mathematical Sciences, SRTM University, Nanded",
//       isNat: "National",
//       nature: "Invited Talk",
//       year: "2019-20",
//       proof: "1687862025250-FDP may talk.pdf",
//       userId: "62b0a06942f8174e43cd9a26",
//       createdAt: "2023-06-27T10:33:45.255Z",
//       updatedAt: "2023-06-27T10:33:45.255Z",
//       __v: 0,
//     },
//   ]);

//   // main fetcher
//   // let param = { model: "InvitedTalk", userId: user?._id };
//   // const { data, isLoading, isError, error, refetch } = useQuery(
//   //   [param.model, param],
//   //   () => refresh(param),
//   //   {
//   //     refetchOnWindowFocus: false,
//   //   }
//   // );

//   // useEffect(() => {
//   //   if (data) {
//   //     const sortedData = sortByAcademicYear(data?.data?.data, "year");
//   //     console.log(sortedData);
//   //     setServerData(sortedData);
//   //   }
//   // }, [data]);

//   const handleCellChange = (id, newData) => {
//     const updatedData = serverData.map((item) =>
//       item._id === id ? { ...item, ...newData } : item
//     );
//     setServerData(updatedData);
//   };

//   const handleSave = (id) => {
//     // Find the item with the matching ID
//     const itemToSave = serverData.find((item) => item._id === id);
//     // Save the item (You can send it to the server here)
//     console.log("Saving data:", itemToSave);
//   };

//   const handleDelete = (id) => {
//     const updatedData = serverData.filter((item) => item._id !== id);
//     setServerData(updatedData);
//   };

//   const handleAddRow = () => {
//     const newId = Date.now();
//     const newRow = { id: newId, name: "", age: "" };
//     setServerData([...serverData, newRow]);
//   };

//   // Function to adjust the textarea's height to fit its content
//   const adjustTextareaHeight = (element) => {
//     element.style.height = "auto";
//     element.style.height = element.scrollHeight + "px";
//   };

//   // Effect to adjust textarea height when the component updates
//   useEffect(() => {
//     const textareaElements = document.querySelectorAll(
//       ".auto-expanding-textarea"
//     );
//     textareaElements.forEach((textarea) => {
//       adjustTextareaHeight(textarea);
//     });
//   }, [serverData]);

//   return (
//     <div className="mt-4">
//       <div className="relative overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-500 border table-bordered table">
//           <thead className="text-gray-700 bg-gray-50">
//             <tr>
//               <th scope="col" className="px-2 py-3">
//                 Sr.
//               </th>
//               {CASDataTable.InvitedTalk.tableHeads.map((head) => {
//                 return (
//                   <th scope="col" className="px-2 py-3">
//                     {head}
//                   </th>
//                 );
//               })}

//               <th scope="col" className="px-2 py-3">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {serverData?.map((item, index) => (
//               <tr key={item._id} className="bg-white border-b align-top">
//                 <td className="px-2 py-1">{index + 1}</td>
//                 {CASDataTable.InvitedTalk.tableCells.map((cell) => {
//                   return (
//                     <td className="px-2 py-1">
//                       <textarea
//                         className="p-2 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
//                         value={item?.[cell]}
//                         onChange={(e) =>
//                           handleCellChange(item._id, {
//                             [cell]: e.target.value,
//                             isEditing: true,
//                           })
//                         }
//                         style={{
//                           overflow: "hidden", // Hide the scrollbar
//                           height: "auto",
//                           resize: "none",
//                         }}
//                       ></textarea>
//                     </td>
//                   );
//                 })}

//                 <td className="py-1">
//                   {item?.isEditing ? (
//                     <Tooltip title="Save Changes">
//                       <IconButton
//                         disabled={!item?.isEditing}
//                         onClick={() => {
//                           handleSave(item._id);
//                           handleCellChange(item._id, { isEditing: false });
//                         }}
//                       >
//                         <CheckRoundedIcon
//                           className={item?.isEditing ? "text-yellow-500" : ""}
//                           sx={{ fontSize: "25px" }}
//                         />
//                       </IconButton>
//                     </Tooltip>
//                   ) : (
//                     <IconButton disabled={true}>
//                       <CheckRoundedIcon sx={{ fontSize: "25px" }} />
//                     </IconButton>
//                   )}

//                   <Tooltip title="Delete">
//                     <IconButton onClick={() => handleDelete(item._id)}>
//                       <DeleteRoundedIcon
//                         className="text-red-700"
//                         sx={{ fontSize: "24px" }}
//                       />
//                     </IconButton>
//                   </Tooltip>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4">
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleAddRow}
//         >
//           Add Row
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Test;



// import React from 'react';
// import GoBack from '../components/GoBack';
// import EditableTable from '../utility/EditableTable/content/EditableTable';
// import refresh from '../services/faculty/js/refresh';
// import UserLoading from './UserLoading';
// import sortByAcademicYear from '../js/sortByAcademicYear';
// import { useQuery } from 'react-query';
// import { useSelector } from 'react-redux';
// import useAuth from '../hooks/useAuth';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Test = () => {

//   useAuth(false)
//   const user = useSelector((state) => state.user?.user)
//   const info = {
//     model: 'InvitedTalk'
//   }

//   const formDataArray = [{ name: "_id", value: "_id" }, { name: "lectureTitle", value: "lectureTitle" }, { name: "seminarTitle", value: "seminarTitle" }, { name: "organizedBy", value: "organizedBy" }, { name: "isNat", value: "isNat" }, { name: "nature", value: "nature" }, { name: "file", value: "proof" }, { name: "year", value: "year" }, { name: "isNew", value: "isNew" }]
//   const formDataAdditionalArray = [{ name: "userId", value: user?._id }]

//   const tableColumns = [
//     {
//       field: "lectureTitle",
//       headerName: "Title of Lecture / Academic Session",
//     },
//     {
//       field: "seminarTitle",
//       headerName: "Title of Seminar",
//     },
//     {
//       field: "organizedBy",
//       headerName: "Organized by",
//     },
//     {
//       field: "isNat",
//       headerName: "Level",
//       type: 'select',
//       options: ["State/University", "National", "International (within country)", "International (Abroad)"]
//     },
//     {
//       field: "nature",
//       headerName: "Nature",
//       flex: 0.7,
//       type: 'select',
//       options: ["Invited Talk", "Resource Person", "Paper Presentation"]
//     },
//     {
//       field: "year",
//       headerName: "Year",
//       flex: 0.7,
//       type: 'AY',
//     },
//     {
//       field: "proof",
//       headerName: "Proof",
//       type: 'proof',
//       flex: 0.5,

//     },
//   ];

//   const [sortedData, setSortedData] = useState([])

//   // main fetcher
//   let param = { model: info.model, userId: user?._id };
//   const { data, isLoading, isError, error, refetch } = useQuery(
//     [param.model, param],
//     () => refresh(param),
//     {
//       refetchOnWindowFocus: false
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setSortedData(sortByAcademicYear(data?.data?.data, "year"))
//     }
//   }, [data]);

//   return (
//     <div>
//       <GoBack pageTitle="Editable Table" />
//       <div className="pt-3">
//         {
//           isLoading ? <UserLoading title="Fetching table contents" /> : <EditableTable sortedData={sortedData} tableColumns={tableColumns} formDataArray={formDataArray} formDataAdditionalArray={formDataAdditionalArray} refetch={refetch} />
//         }

//       </div>
//     </div>
//   )
// }

// export default Test


// import React from 'react';
// import GoBack from '../components/GoBack';
// import EditableTable from '../utility/EditableTable/content/EditableTable';
// import refresh from '../services/faculty/js/refresh';
// import UserLoading from './UserLoading';
// import sortByAcademicYear from '../js/sortByAcademicYear';
// import { useQuery } from 'react-query';
// import { useSelector } from 'react-redux';
// import useAuth from '../hooks/useAuth';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Test = () => {

//   useAuth(false)
//   const user = useSelector((state) => state.user?.user)
//   const info = {
//     model: 'Degree'
//   }


//   const formDataArray = [{ name: "_id", value: "_id" },
//   { name: "degreeName", value: "degreeName" },
//   { name: "title", value: "title" },
//   { name: "subject", value: "subject" },
//   { name: "university", value: "university" },
//   { name: "awardDate", value: "awardDate" },
//   { name: "file", value: "proof" },
//   { name: "isNew", value: "isNew" }]

//   const formDataAdditionalArray = [{ name: "userId", value: user?._id }]

//   const tableColumns = [
//     {
//       field: "degreeName",
//       headerName: "Research Degree",
//     },
//     {
//       field: "title",
//       headerName: "Title",
//     },
//     {
//       field: "subject",
//       headerName: "Subject",
//     },
//     {
//       field: "university",
//       headerName: "University",
//     },
//     {
//       field: "awardDate",
//       headerName: "Award Date",
//     },
//     {
//       field: "proof",
//       headerName: "Proof",
//       type: 'proof',
//     },
//   ];

//   const [sortedData, setSortedData] = useState([])

//   // main fetcher
//   let param = { model: info.model, userId: user?._id };
//   const { data, isLoading, isError, error, refetch } = useQuery(
//     [param.model, param],
//     () => refresh(param),
//     {
//       refetchOnWindowFocus: false
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setSortedData(data?.data?.data)
//     }
//   }, [data]);

//   return (
//     <div>
//       <GoBack pageTitle="Editable Table" />
//       <div className="pt-3">
//         {
//           isLoading ? <UserLoading title="Fetching table contents" /> : <EditableTable sortedData={sortedData} tableColumns={tableColumns} formDataArray={formDataArray} formDataAdditionalArray={formDataAdditionalArray} refetch={refetch} info={info} />
//         }

//       </div>
//     </div>
//   )
// }

// export default Test

// import React from 'react';
// import GoBack from '../components/GoBack';
// import EditableTable from '../utility/EditableTable/content/EditableTable';
// import refresh from '../services/faculty/js/refresh';
// import UserLoading from './UserLoading';
// import sortByAcademicYear from '../js/sortByAcademicYear';
// import { useQuery } from 'react-query';
// import { useSelector } from 'react-redux';
// import useAuth from '../hooks/useAuth';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Test = () => {

//   useAuth(false)
//   const user = useSelector((state) => state.user?.user)

//   const info = {
//     model: 'Qualification'
//   }


//   const formDataArray = [{ name: "_id", value: "_id" },
//   { name: "exam", value: "exam" },
//   { name: "institute", value: "institute" },
//   { name: "year", value: "year" },
//   { name: "percentage", value: "percentage" },
//   { name: "subjects", value: "subjects" },
//   ]

//   const formDataAdditionalArray = [{ name: "userId", value: user?._id }]

//   const tableColumns = [
//     {
//       field: "exam",
//       headerName: "Exams",
//     },
//     {
//       field: "institute",
//       headerName: "Institute/Boards",
//     },
//     {
//       field: "year",
//       headerName: "Year",
//     },
//     {
//       field: "percentage",
//       headerName: "Percentage",
//     },
//     {
//       field: "subjects",
//       headerName: "Subjects",
//     },
//   ];

//   const [sortedData, setSortedData] = useState([])

//   // main fetcher
//   let param = { model: info.model, userId: user?._id };
//   const { data, isLoading, isError, error, refetch } = useQuery(
//     [param.model, param],
//     () => refresh(param),
//     {
//       refetchOnWindowFocus: false
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setSortedData(data?.data?.data)
//     }
//   }, [data]);

//   return (
//     <div>
//       <GoBack pageTitle="Editable Table" />
//       <div className="pt-3">
//         {
//           isLoading ? <UserLoading title="Fetching table contents" /> : <EditableTable sortedData={sortedData} tableColumns={tableColumns} formDataArray={formDataArray} formDataAdditionalArray={formDataAdditionalArray} refetch={refetch} info={info} />
//         }

//       </div>
//     </div>
//   )
// }

// export default Test

// import React, { useEffect, useState } from 'react'
// import DialogBox from '../../../components/formComponents/DialogBox'
// import Text from '../../../components/formComponents/Text'
// import YearSelect from '../../../components/formComponents/YearSelect'
// import UploadFile from '../../../components/formComponents/UploadFile'
// import AddButton from '../../director/components/UtilityComponents/AddButton'
// import Table from '../../../components/tableComponents/TableComponent'
// import { useQuery } from 'react-query'
// import getReq from '../../../components/requestComponents/getReq'
// import editReq from '../../../components/requestComponents/editReq'
// import addReq from '../../../components/requestComponents/addReq'
// import Select from '../../../components/formComponents/Select'
// import SchoolsProgram from '../../../components/SchoolsProgram'
// import { fetchFacutys } from '../../student/pages/StudentHome'
// import BulkExcel from '../../../components/BulkExcel'
// import uploadPaths from '../../../utility/EditableTable/js/uploadPaths'
// import refresh from '../../faculty/js/refresh'
// import UserLoading from '../../../pages/UserLoading'
// import EditableTable from '../../../utility/EditableTable/content/EditableTable'
// import sortByAcademicYear from '../../../js/sortByAcademicYear'


// const AdminJRFSRF = () => {


//   const info = {
//     model: 'JrfSrfAdmin'
//   }

//   const formDataArray = [
//     { name: "_id", value: "_id" },
//     { name: "researchName" },
//     { name: "schoolName" },
//     { name: "guideName" },
//     { name: "enrolmentYear" },
//     { name: "fellowshipDate" },
//     { name: "fellowshipDuration" },
//     { name: "fellowshipType" },


//     { name: "grantingAgency" },
//     { name: "qualifyingExam" },
//     { name: "year" },
//     { name: "file", value: "proof" },
//   ]

//   const formDataAdditionalArray = [
//     { name: 'uploadPath', value: uploadPaths.admin }
//   ]


//   const tableColumns = [
//     {
//       field: "researchName",
//       headerName: "Research Fellow Name",
//     },
//     {
//       field: "schoolName",
//       headerName: "School / Research Center Name",
//       type: 'schools'
//     },
//     {
//       field: "guideName",
//       headerName: "Research Guide",
//     },
//     {
//       field: "enrolmentYear",
//       headerName: "Enrollment Date (RAC)",
//       type: 'date'
//     },
//     {
//       field: "fellowshipDate",
//       headerName: "Fellowship Starting Date",
//       type: 'date'
//     },
//     {
//       field: "fellowshipDuration",
//       headerName: "Fellowship Duration (in Years)",
//       type: 'number'
//     },
//     {
//       field: "fellowshipType",
//       headerName: "Fellowship Type",
//       type: ["JRF", "SRF"]
//     },
//     {
//       field: "grantingAgency",
//       headerName: "Granting Agency",
//     },
//     {
//       field: "qualifyingExam",
//       headerName: "Qualifying Exam",
//       flex: 0.5,
//     },
//     {
//       field: "year",
//       headerName: "Academic Year",
//       flex: 0.7,
//       type: 'AY',
//     },
//     {
//       field: "proof",
//       headerName: "Proof",
//       type: 'proof',
//       flex: 0.5,

//     },
//   ];

//   const [sortedData, setSortedData] = useState([])

//   // main fetcher
//   let param = { model: info.model };
//   const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param),
//     {
//       refetchOnWindowFocus: false
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setSortedData(sortByAcademicYear(data?.data?.data, "year"))
//     }
//   }, [data]);

//   return (
//     <>
//       {
//         isLoading ? <UserLoading title="Fetching table contents" /> : <EditableTable sortedData={sortedData} tableColumns={tableColumns} formDataArray={formDataArray} formDataAdditionalArray={formDataAdditionalArray} refetch={refetch} info={info} />
//       }
//     </>
//   )
// }

// export default AdminJRFSRF

// import React from 'react';
// import GoBack from '../components/GoBack';
// import EditableTable from '../utility/EditableTable/content/EditableTable';
// import refresh from '../services/faculty/js/refresh';
// import UserLoading from './UserLoading';
// import sortByAcademicYear from '../js/sortByAcademicYear';
// import { useQuery } from 'react-query';
// import { useSelector } from 'react-redux';
// import useAuth from '../hooks/useAuth';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Test = () => {

//   useAuth(false)
//   const user = useSelector((state) => state.user?.user)


//   const info = {
//     model: 'InvitedTalk'
//   }

//   const formDataArray = [
//     { name: "_id", value: "_id" },
//     { name: "lectureTitle", value: "lectureTitle" },
//     { name: "seminarTitle", value: "seminarTitle" },
//     { name: "organizedBy", value: "organizedBy" },
//     { name: "isNat", value: "isNat" },
//     { name: "nature", value: "nature" },
//     { name: "file", value: "proof" },
//     { name: "year", value: "year" }
//   ]

//   const formDataAdditionalArray = [
//     { name: "userId", value: user?._id },
//     { name: 'uploadPath', value: `../uploads/faculty-uploads/` }
//   ]

//   const tableColumns = [
//     {
//       field: "lectureTitle",
//       headerName: "Title of Lecture / Academic Session",
//     },
//     {
//       field: "seminarTitle",
//       headerName: "Title of Seminar",
//     },
//     {
//       field: "organizedBy",
//       headerName: "Organized by",
//     },
//     {
//       field: "isNat",
//       headerName: "Level",
//       type: ["State/University", "National", "International (within country)", "International (Abroad)"],
//     },
//     {
//       field: "nature",
//       headerName: "Nature",
//       flex: 0.7,
//       type: ["Invited Talk", "Resource Person", "Paper Presentation"],
//     },
//     {
//       field: "year",
//       headerName: "Year",
//       flex: 0.7,
//       type: 'AY',
//     },
//     {
//       field: "proof",
//       headerName: "Proof",
//       type: 'proof',
//       flex: 0.5,

//     },
//   ];

//   const [sortedData, setSortedData] = useState([])

//   // main fetcher
//   let param = { model: info.model, userId: user?._id };
//   const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param),
//     {
//       refetchOnWindowFocus: false
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setSortedData(sortByAcademicYear(data?.data?.data, "year"))
//     }
//   }, [data]);

//   return (
//     <div>
//       <GoBack pageTitle="Editable Table" />
//       <div className="pt-3">
//         {
//           isLoading ? <UserLoading title="Fetching table contents" /> : <EditableTable sortedData={sortedData} tableColumns={tableColumns} formDataArray={formDataArray} formDataAdditionalArray={formDataAdditionalArray} refetch={refetch} info={info} />
//         }

//       </div>
//     </div>
//   )
// }

// export default Test



