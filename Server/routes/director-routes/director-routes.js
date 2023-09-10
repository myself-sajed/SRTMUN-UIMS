const fs = require('fs');
const express = require('express');
const xlsx = require('xlsx');
const router = express.Router();
const Award = require('../../models/director-models/awardSchema');
const CounselingAndGuidance = require('../../models/director-models/counselingAndGuidanceSchema');
const DemandRatio = require('../../models/director-models/demandRatioSchema');
const ProjectsInternships = require('../../models/director-models/projectsInternshipsSchema');
const Employability = require('../../models/director-models/employabilitySchema');
const ExtensionActivities = require('../../models/director-models/extensionActivitysSchema');
const IctClassrooms = require('../../models/director-models/ictClassroomsSchema')
const MoUs = require('../../models/director-models/moUsSchema')
const ValueAddedCource = require('../../models/director-models/valueAddedCourceSchema');
const SkillsEnhancementInitiatives = require('../../models/director-models/skillsEnhancementInitiativesSchema');
const StudentSatisfactionSurvey = require('../../models/director-models/studentSatisfactionSurveySchema');
const UgcSapCasDstFistDBTICSSR = require('../../models/director-models/ugcSapCasDstFistDBTICSSRSchema');
const TrainingProgramsOrganized = require('../../models/director-models/trainingProgramsOrganizedSchema');
const ResearchMethodologyWorkshops = require('../../models/director-models/researchMethodologyWorkshopsSchema');
const ReservedSeats = require('../../models/director-models/reservedSeatsSchema');
const QualifiedExams = require('../../models/director-models/qualifiedExamSchema');
const ProgressionToHE = require('../../models/director-models/progressionToHESchema');
const Placement = require('../../models/director-models/placementSchema');
const SyllabusRevision = require('../../models/director-models/syllabusRevisionSchema');
const AlumniContribution = require('../../models/director-models/alumniContributionSchema');
const ConferencesSemiWorkshopOrganized = require('../../models/director-models/conferencesSemiWorkshopOrganizedSchema')
const CourceInAllProgram = require('../../models/director-models/courceInAllProgramSchema')
const NewPrograms = require('../../models/director-models/newProgramsSchema')
const StudentUser = require('../../models/student-models/studentUserSchema')
const AlumniUser = require('../../models/alumni-models/alumniUserSchema')
const StudentIdCount = require('../../models/student-models/studentIdCountSchema')

const excelObject = {
    Award: {
        'Title of the innovation': 'Title_of_the_innovation',
        'Name of the Award': 'Name_of_the_Award',
        'Name of the Awarding Agency': 'Name_of_the_Awarding_Agency',
        'Contact details Agency': 'Contact_details_Agency',
        'Year of Award': 'Year_of_Award',
        'Category': 'Category',
    },
    ConferencesSemiWorkshopOrganized: {
        'Year': 'Year',
        'Title Of the Program': 'Title_Of_the_Program',
        'Level of Program': 'Level_of_program',
        'Number of Participants': 'Number_of_Participants',
        'From Date': 'From_Date',
        'To Date': 'To_Date'
    },
    CounselingAndGuidance: {
        'Name of the Activity conducted by the HEI': 'Name_of_the_Activity_conducted_by_the_HEI',
        'Number of Students Attended': 'Number_of_Students_Attended',
        'Year of Activity': 'Year_of_Activity',
    },
    DemandRatio: {
        'Programme Code': 'Programme_Code',
        'Programme name': 'Programme_name',
        'Academic Year': 'Academic_Year',
        'Number of seats available': 'Number_of_seats_available',
        'Number of eligible applications': 'Number_of_eligible_applications',
        'Number of Students admitted': 'Number_of_Students_admitted',
        'Type of program': 'Type_of_program',
    },
    Employability: {
        'Program Name': 'Program_Name',
        'Course Code': 'Course_Code',
        'Name of the Course': 'Name_of_the_Course',
        'Academic Year': 'Academic_Year',
        'Year of introduction': 'Year_of_introduction',
        'Activities Content with direct bearing on Employability Entrepreneurship Skill development': 'Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development',
    },
    ExtensionActivities: {
        'Name of the activity': 'Name_of_the_activity',
        'Organising unit/ agency/ collaborating agency': 'Organising_unit',
        'Name of the scheme': 'Name_of_the_scheme',
        'Year of activity': 'Year_of_activity',
        'Number of students': 'Number_of_students',
    },
    IctClassrooms: {
        'Room number or Name of Classrooms': 'Room_number_or_Name_of_Classrooms',
        'Type of ICT facility': 'Type_of_ICT_facility'
    },
    MoUs: {
        'Name of Organisation with whome mou signed': 'Name_of_Organisation_with_whome_mou_signed',
        'Duration of MoU': 'Duration_of_MoU',
        'Year of signing MoU': 'Year_of_signing_MoU',
    },
    Placement: {
        "Name of student placed": "Name_of_student_placed",
        "Program graduated from": "Program_graduated_from",
        "Name of the employer": "Name_of_the_employer",
        "Employer contact details": "Employer_contact_details",
        "Pay package annum": "Pay_package_annum",
        "Academic Year": "Academic_Year",
        "Type Of Placement": 'Type_Of_Placement',
    },
    ProgressionToHE: {
        'Name of student enrolling': 'Name_of_student_enrolling',
        'Program graduated from': 'Program_graduated_from',
        'Name of institution admitted': 'Name_of_institution_admitted',
        'Name of programme admitted': 'Name_of_programme_admitted',
        'Academic Year': 'Academic_Year',
    },
    ProjectsInternships: {
        "Programme Code": "Programme_Code",
        "Programme name": "Programme_name",
        "Academic Year": "Academic_Year",
        "Name of the student": "Name_of_the_student",
    },
    QualifiedExams: {
        "Acadmic year": 'Acadmic_year',
        "Registration number roll number": 'Registration_number_roll_number',
        "Name of student qualified": 'Names_of_students_selected_qualified',
        "Name of the Exam": 'Name_of_the_Exam',
    },
    ReservedSeats: {
        "Academic Year": "Academic_Year",
        "Program Name": "Program_Name",
        "SC1": "NseSC",
        "ST1": "NseST",
        "OBC(VJNT)1": "NseOBC",
        "Divyngjan1": "NseDivyngjan",
        "General1": "NseGeneral",
        "Others1": "NseOthers",
        "SC2": "NsaSC",
        "ST2": "NsaST",
        "OBC(VJNT)2": "NsaOBC",
        "Divyngjan2": "NsaDivyngjan",
        "General2": "NsaGeneral",
        "Others2": "NsaOthers",
    },
    ResearchMethodologyWorkshops: {
        "Name of the workshop seminar": "Name_of_the_workshop_seminar",
        "Number of Participants": "Number_of_Participants",
        "year": "year",
        "From Date": "From_Date",
        "To Date": "To_Date",
    },
    TrainingProgramsOrganized: {
        "Year": "Year",
        "From Date": "From_Date",
        "To Date": "To_Date",
        "Title Of the Program": "Title_Of_the_Program",
        "Type of staff": "Type_of_staff",
        "Number of Participants": "Number_of_Participants",
    },
    UgcSapCasDstFistDBTICSSR: {
        "Name of the Scheme Project Endowments Chairs": "Name_of_the_Scheme_Project_Endowments_Chairs",
        "Name of the Principal Investigator Co-Investigator": "Name_of_the_Principal_Investigator_Co_Investigator",
        "Name of the Funding agency": "Name_of_the_Funding_agency",
        "Type of Agency": "Type_of_Agency",
        "Name of Department": "Name_of_Department",
        "Year of Award": "Year_of_Award",
        "Funds provided in lakhs": "Funds_provided_in_lakhs",
        "Duration of the project in Years": "Duration_of_the_project_in_Years",
    },
    StudentSatisfactionSurvey: {
        "Name of the student": "Name_of_the_student",
        "Year of joining": "Year_of_joining",
        "Category": "Category",
        "State of Domicile": "State_of_Domicile",
        "Nationality": "Nationality",
        "Email ID": "Email_ID",
        "Programme name": "Programme_name",
        "Student Unique Enrolment ID": "Student_Unique_Enrolment_ID",
        "Mobile Number": "Mobile_Number",
        "Gender": "Gender",
    },
    SkillsEnhancementInitiatives:{
        "Name of the capacity development schemes":"Name_of_the_capacity_development_schemes",
        "Academic Year":"Academic_Year",
        "Number of students enrolled":"Number_of_students_enrolled",
        "Date of implementation":"Date_of_implementation"
    },
    ValueAddedCource: {
        "Name of the value added courses offered": "Name_of_the_value_added_courses_offered",
        "Course Code (if any)": "Course_Code_if_any",
        "Academic year": "Academic_year",
        "Year of offering": "Year_of_offering",
        "No of times offered during the same year": "No_of_times_offered_during_the_same_year",
        "Duration of the course (in Months)": "Duration_of_the_course",
        "Number of students enrolled": "Number_of_students_enrolled",
        "Number of Students completing the course": "Number_of_Students_completing_the_course",
    },
    SyllabusRevision: {
        "Programme Code": "Programme_Code",
        "Programme Name": "Programme_Name",
        "Academic Year": "Academic_Year",
        "Year of Introduction": "Year_of_Introduction",
        "Status of implementation": "Status_of_implementation",
        "Year of Implimentation": "Year_of_Implimentation",
        "Year of Revision": "Year_of_Revision",
        "Percentage of content added or replaced": "Percentage_of_content_added_or_replaced",
    },
    AlumniContribution: {
        "Name Of The Alumni": "Name_of_The_Alumni_Contributed",
        "Program Graduated From": "Program_graduated_from",
        "Contribution Ammount in ₹": "Amount_of_contribution",
        "Year of Contribution": "Academic_Year",
    },
    CourceInAllProgram: {
        "Program Name": 'programName',
        "Program Code": 'programCode',
        "Course Name": 'courseName', 
        "Course Code": 'courseCode',
        "Academic Year": 'academicYear',
    },
    NewPrograms: {
        "Program Name": 'programName',
        "Program Code": 'programCode',
        "Academic Year": 'academicYear',
    }

}

// multer configuration director 

const multer = require('multer');
const path = require('path');
const { sendMail } = require('../faculty-routes/services');
const emailTemplate = require('../../email/emailTemplate');
// const { Sync } = require('@mui/icons-material');
const dirstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Server/uploads/directorUploads
        const link = path.join(__dirname, `../../uploads/director-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: dirstorage })

// multer configuration excel 
const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../../excels/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const excelUpload = multer({ storage: excelStorage })

let models = { Award, MoUs, CounselingAndGuidance, ProgressionToHE, DemandRatio, ProjectsInternships, Employability, ReservedSeats, TrainingProgramsOrganized, UgcSapCasDstFistDBTICSSR, ResearchMethodologyWorkshops, ExtensionActivities, IctClassrooms, SyllabusRevision, Placement, ValueAddedCource, QualifiedExams, SkillsEnhancementInitiatives, StudentSatisfactionSurvey, AlumniContribution, ConferencesSemiWorkshopOrganized, StudentUser, AlumniUser, CourceInAllProgram, NewPrograms }

const YearSelecter={
    academicYear:['CourceInAllProgram', 'NewPrograms'],
    Year_of_Award:['Award', 'UgcSapCasDstFistDBTICSSR'],
    Academic_Year:["DemandRatio","ProgressionToHE","ProjectsInternships","SkillsEnhancementInitiatives","SyllabusRevision","Placement","Employability","ReservedSeats","AlumniContribution"],
    Acadmic_year:["QualifiedExams"],
    Academic_year:["ValueAddedCource"],
    Year_of_Activity:["CounselingAndGuidance"],
    Year_of_activity:["ExtensionActivities"],
    Year_of_signing_MoU:["MoUs"],
    year:["ResearchMethodologyWorkshops"],
    Year:["TrainingProgramsOrganized","ConferencesSemiWorkshopOrganized"],
    Year_of_joining:["StudentSatisfactionSurvey"]
}

//Set Route
router.post("/director/newRecord/:model", upload.single("Upload_Proof"), async (req, res) => {
    try {
        const model = req.params.model
        console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        const { School, schoolName } = data
        const up = req.file?req.file.filename:"";
        //Award
        if (model == 'Award') {
            const { atoti, anota, anotaa, acda, ayoa, ac } = data
            SendData = {
                Title_of_the_innovation: atoti,
                Name_of_the_Award: anota,
                Name_of_the_Awarding_Agency: anotaa,
                Contact_details_Agency: acda,
                Year_of_Award: ayoa,
                Category: ac,
            }
        }
        //CounselingAndGuidance
        else if (model == 'CounselingAndGuidance') {
            const { cagnotacbth, cagnosa, cagyoa, } = data
            SendData = {
                Name_of_the_Activity_conducted_by_the_HEI: cagnotacbth,
                Number_of_Students_Attended: cagnosa,
                Year_of_Activity: cagyoa
            }
        }
        //DemandRatio
        else if (model == 'DemandRatio') {
            const { drpc, drpn, dray, drnosav, drnoea, drnosad, drtop } = data
            SendData = {
                Programme_Code: drpc,
                Programme_name: drpn,
                Academic_Year: dray,
                Number_of_seats_available: drnosav,
                Number_of_eligible_applications: drnoea,
                Number_of_Students_admitted: drnosad,
                Type_of_program: drtop
            }
        }
        //ExtensionActivities
        else if (model == 'ExtensionActivities') {
            const { eanota, eaouaca, eanots, eanosp, eayota } = data
            SendData = {
                Name_of_the_activity: eanota,
                Organising_unit: eaouaca,
                Name_of_the_scheme: eanots,
                Year_of_activity: eayota,
                Number_of_students: eanosp
            }
        }
        //IctClassrooms
        else if (model == 'IctClassrooms') {
            const { icrnonoc, ictoif } = data
            SendData = {
                Room_number_or_Name_of_Classrooms: icrnonoc,
                Type_of_ICT_facility: ictoif
            }
        }
        //MoUs
        else if (model == 'MoUs') {
            const { munoowwms, mudom, muyosm } = data
            SendData = {
                Name_of_Organisation_with_whome_mou_signed: munoowwms,
                Duration_of_MoU: mudom,
                Year_of_signing_MoU: muyosm
            }
        }
        //ProgressionToHE
        else if (model == 'ProgressionToHE') {
            const { pthenose, pthepgf, pthenoia, pthenopa, ptheya } = data
            SendData = {
                Name_of_student_enrolling: pthenose,
                Program_graduated_from: pthepgf,
                Name_of_institution_admitted: pthenoia,
                Name_of_programme_admitted: pthenopa,
                Academic_Year: ptheya
            }
        }
        //ProjectsInternships
        else if (model == 'ProjectsInternships') {
            const { pipc, pipn, pinots, piay } = data
            SendData = {
                Programme_Code: pipc,
                Programme_name: pipn,
                Academic_Year: piay,
                Name_of_the_student: pinots
            }

        }
        //ResearchMethodologyWorkshops
        else if (model == 'ResearchMethodologyWorkshops') {
            const { rmwnotws, rmwnop, rmwy, rmwfd, rmwtd } = data
            SendData = {
                Name_of_the_workshop_seminar: rmwnotws,
                Number_of_Participants: rmwnop,
                year: rmwy,
                From_Date: rmwfd,
                To_Date: rmwtd
            }
        }
        //TrainingProgramsOrganized
        else if (model == 'TrainingProgramsOrganized') {
            const { tpoy, tpofd, tpotd, tpototp, tpotos, tponop, tpolop } = data
            SendData = {
                Year: tpoy,
                From_Date: tpofd,
                To_Date: tpotd,
                Title_Of_the_Program: tpototp,
                Type_of_staff: tpotos,
                Number_of_Participants: tponop,
                Level_of_program: tpolop
            }
        }
        //UgcSapCasDstFistDBTICSSR
        else if (model == 'UgcSapCasDstFistDBTICSSR') {
            const { uscnotspec, uscnotpici, uscnofa, usctoa, uscnod, uscyoa, uscfpil, uscdotpiy } = data
            SendData = {
                Name_of_the_Scheme_Project_Endowments_Chairs: uscnotspec,
                Name_of_the_Principal_Investigator_Co_Investigator: uscnotpici,
                Name_of_the_Funding_agency: uscnofa,
                Type_of_Agency: usctoa,
                Name_of_Department: uscnod,
                Year_of_Award: uscyoa,
                Funds_provided_in_lakhs: uscfpil,
                Duration_of_the_project_in_Years: uscdotpiy
            }
        }
        //StudentSatisfactionSurvey
        else if (model == 'StudentSatisfactionSurvey') {
            const { sssnots, sssg, sssc, ssssod, sssnioti, sssei, ssspn, ssssuei, sssmn, sssyoj } = data
            SendData = {
                Name_of_the_student: sssnots,
                Year_of_joining: sssyoj,
                Category: sssc,
                State_of_Domicile: ssssod,
                Nationality: sssnioti,
                Email_ID: sssei,
                Programme_name: ssspn,
                Student_Unique_Enrolment_ID: ssssuei,
                Mobile_Number: sssmn,
                Gender: sssg
            }
        }
        //SkillsEnhancementInitiatives
        else if (model == 'SkillsEnhancementInitiatives') {
            const { seiianotcds, seiiaay, seiiadoi, seiianose } = data
            SendData = {
                Name_of_the_capacity_development_schemes: seiianotcds,
                Academic_Year: seiiaay,
                Date_of_implementation: seiiadoi,
                Number_of_students_enrolled: seiianose
            }
        }
        //SyllabusRevision
        else if (model == 'SyllabusRevision') {
            const { srpc, srpn, sray, sryoi, srsoioce, sryoim, sryor, srpocaor } = data
            SendData = {
                Programme_Code: srpc,
                Programme_Name: srpn,
                Academic_Year: sray,
                Year_of_Introduction: sryoi,
                Status_of_implementation: srsoioce,
                Year_of_Implimentation: sryoim,
                Year_of_Revision: sryor,
                Percentage_of_content_added_or_replaced: srpocaor
            }
        }
        //AlumniContribution, CourSeInAllProgram, QualifiedExams, Placement, ConferencesSemiWorkshopOrganized, Employability, ValueAddedCource, ReservedSeats
        else {
            
            SendData = data
        }
        
        
        var withUpData = Object.assign(SendData, { Upload_Proof: up, SchoolName: School })
      
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
        
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//faculty routes for mous & extansion activity 
router.post("/faculty/newRecord/:model", upload.single("Upload_Proof"), async (req, res) => {
    try {
        const model = req.params.model
        console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        const { SchoolName, userId } = data
        const up = req.file.filename;

        //ExtensionActivities MoUs
        SendData = data

        var withUpData = Object.assign(SendData, { Upload_Proof: up, SchoolName, userId })
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//Get Route
router.post('/director/getData', async (req, res) => {

    const { model, id , filter} = req.body
    try {
        const fil = id === ""?filter: {SchoolName: id}
        const fetch = await models[model].find(fil).sort({ $natural: -1 });
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Get Route faculty mous and extension activity
router.post('/faculty/getData', async (req, res) => {

    const { model, id } = req.body
    try {
        const fetch = await models[model].find({ userId: id }).sort({ $natural: -1 });
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Delete Route
router.post('/director/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Upload_Proof;
        const link = path.join(__dirname, `../../uploads/director-uploads/${Filename}`);
        fs.unlink(link, function (err) {
            if (err) {
                console.error(err);
            }
            console.log("file deleted successfullay ");
        });
        res.status(200).send("Entry Deleted Successfully");
    }
    catch (e) {
        res.status(500).send({ massage: e.massage });
    }
})

//Edit Route
router.post('/director/editRecord/:model', upload.single('Upload_Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    // console.log(isfile);
    if (isfile) {
        console.log('file found: ' + isfile)
        var up = req.file.filename
    }

    //Award
    if (model == "Award") {
        const { atoti, anota, anotaa, acda, ayoa, ac } = data
        SendData = {
            Title_of_the_innovation: atoti,
            Name_of_the_Award: anota,
            Name_of_the_Awarding_Agency: anotaa,
            Contact_details_Agency: acda,
            Year_of_Award: ayoa,
            Category: ac,
        }
    }
    //CounselingAndGuidance
    else if (model == "CounselingAndGuidance") {
        const { cagnotacbth, cagnosa, cagyoa, } = data
        SendData = {
            Name_of_the_Activity_conducted_by_the_HEI: cagnotacbth,
            Number_of_Students_Attended: cagnosa,
            Year_of_Activity: cagyoa
        }
    }
    //DemandRatio
    else if (model == 'DemandRatio') {
        const { drpc, drpn, dray, drnosav, drnoea, drnosad, drtop } = data
        SendData = {
            Programme_Code: drpc,
            Programme_name: drpn,
            Academic_Year: dray,
            Number_of_seats_available: drnosav,
            Number_of_eligible_applications: drnoea,
            Number_of_Students_admitted: drnosad,
            Type_of_program: drtop
        }
    }    
    //ExtensionActivities
    else if (model == 'ExtensionActivities') {
        const { eanota, eaouaca, eanots, eanosp, eayota } = data
        SendData = {
            Name_of_the_activity: eanota,
            Organising_unit: eaouaca,
            Name_of_the_scheme: eanots,
            Year_of_activity: eayota,
            Number_of_students: eanosp
        }
    }
    //IctClassrooms
    else if (model == 'IctClassrooms') {
        const { icrnonoc, ictoif } = data
        SendData = {
            Room_number_or_Name_of_Classrooms: icrnonoc,
            Type_of_ICT_facility: ictoif
        }
    }
    //MoUs
    else if (model == "MoUs") {
        const { munoowwms, mudom, muyosm } = data
        SendData = {
            Name_of_Organisation_with_whome_mou_signed: munoowwms,
            Duration_of_MoU: mudom,
            Year_of_signing_MoU: muyosm
        }
    }    
    //ProgressionToHE
    else if (model == 'ProgressionToHE') {
        const { pthenose, pthepgf, pthenoia, pthenopa, ptheya } = data
        SendData = {
            Name_of_student_enrolling: pthenose,
            Program_graduated_from: pthepgf,
            Name_of_institution_admitted: pthenoia,
            Name_of_programme_admitted: pthenopa,
            Academic_Year: ptheya
        }
    }
    //ProjectsInternships
    else if (model == 'ProjectsInternships') {
        const { pipc, pipn, pinots, piay } = data
        SendData = {
            Programme_Code: pipc,
            Programme_name: pipn,
            Academic_Year: piay,
            Name_of_the_student: pinots
        }

    }
    //ResearchMethodologyWorkshops
    else if (model == 'ResearchMethodologyWorkshops') {
        const { rmwnotws, rmwnop, rmwy, rmwfd, rmwtd } = data
        SendData = {
            Name_of_the_workshop_seminar: rmwnotws,
            Number_of_Participants: rmwnop,
            year: rmwy,
            From_Date: rmwfd,
            To_Date: rmwtd
        }
    }
    //TrainingProgramsOrganized
    else if (model == 'TrainingProgramsOrganized') {
        const { tpoy, tpofd, tpotd, tpototp, tpotos, tponop, tpolop } = data
        SendData = {
            Year: tpoy,
            From_Date: tpofd,
            To_Date: tpotd,
            Title_Of_the_Program: tpototp,
            Type_of_staff: tpotos,
            Number_of_Participants: tponop,
            Level_of_program: tpolop
        }
    }
    //UgcSapCasDstFistDBTICSSR
    else if (model == 'UgcSapCasDstFistDBTICSSR') {
        const { uscnotspec, uscnotpici, uscnofa, usctoa, uscnod, uscyoa, uscfpil, uscdotpiy } = data
        SendData = {
            Name_of_the_Scheme_Project_Endowments_Chairs: uscnotspec,
            Name_of_the_Principal_Investigator_Co_Investigator: uscnotpici,
            Name_of_the_Funding_agency: uscnofa,
            Type_of_Agency: usctoa,
            Name_of_Department: uscnod,
            Year_of_Award: uscyoa,
            Funds_provided_in_lakhs: uscfpil,
            Duration_of_the_project_in_Years: uscdotpiy
        }
    }
    //StudentSatisfactionSurvey
    else if (model == 'StudentSatisfactionSurvey') {
        const { sssnots, sssg, sssc, ssssod, sssnioti, sssei, ssspn, ssssuei, sssmn, sssyoj } = data
        SendData = {
            Name_of_the_student: sssnots,
            Year_of_joining: sssyoj,
            Category: sssc,
            State_of_Domicile: ssssod,
            Nationality: sssnioti,
            Email_ID: sssei,
            Programme_name: ssspn,
            Student_Unique_Enrolment_ID: ssssuei,
            Mobile_Number: sssmn,
            Gender: sssg
        }
    }
    //SkillsEnhancementInitiatives
    else if (model == 'SkillsEnhancementInitiatives') {
        const { seiianotcds, seiiaay, seiiadoi, seiianose } = data
        SendData = {
            Name_of_the_capacity_development_schemes: seiianotcds,
            Academic_Year: seiiaay,
            Date_of_implementation: seiiadoi,
            Number_of_students_enrolled: seiianose
        }
    }
    //SyllabusRevision
    else if (model == 'SyllabusRevision') {
        const { srpc, srpn, sray, sryoi, srsoioce, sryoim, sryor, srpocaor } = data
        SendData = {
            Programme_Code: srpc,
            Programme_Name: srpn,
            Academic_Year: sray,
            Year_of_Introduction: sryoi,
            Status_of_implementation: srsoioce,
            Year_of_Implimentation: sryoim,
            Year_of_Revision: sryor,
            Percentage_of_content_added_or_replaced: srpocaor
        }
    }
    //AlumniContribution, ConferencesSemiWorkshopOrganized, QualifiedExams, Placement, CourceInAllProgram, Employability, ValueAddedCource, ReservedSeats
    else {
        SendData = data
    }

    var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { Upload_Proof: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//Edit Route for mous and extension activity
router.post('/faculty/editRecord/:model', upload.single('Upload_Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }
     //ExtensionActivities, MoUs
    SendData=data

     var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { Upload_Proof: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})


router.get('/viewer/director/:filename', (req, res) => {
    const link = path.join(__dirname, `../../uploads/director-uploads/${req.params.filename}`)
    res.sendFile(link);
})

router.post('/director/excelRecord/:model', excelUpload.single('excelFile'), (req, res) => {
    const excelFile = req.file.filename
    const model = req.params.model
    let sendData = {};
    const values = JSON.parse(JSON.stringify(req.body));
    const { School } = values
    const multiData = model=="MoUs"|| model=="ExtensionActivities"? JSON.parse(School):School

    let data = []
    try {
        const file = xlsx.readFile(path.join(__dirname, `../../../excels/${excelFile}`))
        const sheetNames = file.SheetNames
        for (let i = 0; i < sheetNames.length; i++) {
            const arr = xlsx.utils.sheet_to_json(
                file.Sheets[sheetNames[i]])
            arr.forEach((response) => data.push(response))
        }
       
        let dateInputs = ["From Date", "To Date","Date of implementation"]
           data.forEach((item)=>{
            Object.keys(excelObject[model]).forEach(key => {
                
                    if(dateInputs.includes(key)){
                        let d = new Date((item[key] - (25567 + 2))*86400*1000)
                        fullDate = (`${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0"+d.getDate()).slice(-2)}`)
                        sendData[excelObject[model][key]] = fullDate
                    }
                    else{
                        sendData[excelObject[model][key]] = item[key]
                    }    
                
            })
            const allData =  Object.assign(sendData, multiData.userId? multiData :{SchoolName: multiData })
            const obj = new models[model](allData);
            obj.save(function(error){
                if(error){
                    res.status(500).send()
                    console.log(error)  
                }
            })
        })
         res.status(201).send(`Entry suceeed`)  
    }
    catch(err){
        console.log(err);
        return res.status(500).send()
    }
})

//Activate Diactivate Student
router.post('/inactive-active/student', async (req, res) => {
    const {isActiveStudent,itemToEdit} = req.body
    try{
        await StudentUser.updateOne({_id: itemToEdit},{$set:{isActiveStudent}});
        const userdetails = await StudentUser.findOne({_id: itemToEdit});

        const { email, schoolName, isActiveStudent:isActive } = userdetails
        const activestate = isActive===true ? "Activated":"Disabled";
        subjectForEmail = `Your account is ${activestate} by director of ${schoolName} at SRTMUN-UIMS.`

        // message to send on res
        const statematter = isActive===true ? "Please utilize the provided username and password which were entered during registration, to access your student account at <strong>SRTMUN-UIMS</strong>" : `Visit to ${schoolName} with any admission proof to activate your student account`
        let message = { status: 'success', message: 'Email sent successfully, Please check your Email Account'}

        let htmlMatter = `<div>
                            <h2>Your student account ${activestate} by Director of ${schoolName}</h2>
                            <p style="font-size: 14px; line-height: 140%;">
                            <strong>${email}</strong> is your username that is <strong>${activestate}</strong> ${statematter}.
                            </p>
                        </div>`

        // send mail
        sendMail(req, res, email, subjectForEmail, 'html', emailTemplate(htmlMatter), message);
    }
    catch(err) {
        console.log(err)
        res.send({status:"error"})
    }
})

// Convert student to alumni in single/bulk
router.post('/student-to-alumni/bulk', async (req,res)=> {

    const {arr} = req.body
    try{
        let NonConverted = [];

        
        for (id of arr){
            let student = await StudentUser.findOne({_id: id});
            if(student){
                const { programEnroledOn, currentIn } = student

                let yStarted = new Date().getFullYear()-parseInt(currentIn[0]);
                let YNext = (yStarted+1).toString().slice(-2);
                let doStarted = programEnroledOn===undefined?`${yStarted}-${YNext}`:programEnroledOn;
                let yComplited = new Date().getFullYear();
                let yCNext = (yComplited+1).toString().slice(-2);
                let doCompleted = `${yComplited}-${yCNext}`;

                await StudentUser.updateOne({_id:id}, {$set:{isAlumni:true, programEnroledOn: doStarted, doCompletion: doCompleted }})
                
            }else{
                NonConverted.push(id);
            }
        }
        if(NonConverted.length===0){
            res.status(201).send({status:"allCoverted", message:`Student converted to alumni successfully`}) 
        }
        else{
            res.status(201).send({status:"error", message:`${NonConverted.length} out of ${arr.length} are not converted`})
        }
    }
    catch(err){
        console.log(err)
    }
})

//aqar director 
router.post('/director/aqar/excel', async (req, res)=> {
    const {SchoolName,years} = req.body.filter
    try{
        let report={}
        let aqarModels = [ 'Award', 'MoUs', 'CounselingAndGuidance', 'ProgressionToHE', 'DemandRatio', 'ProjectsInternships', 'Employability', 'ReservedSeats', 'TrainingProgramsOrganized', 'UgcSapCasDstFistDBTICSSR', 'ResearchMethodologyWorkshops', 'ExtensionActivities', 'SyllabusRevision', 'Placement', 'ValueAddedCource', 'QualifiedExams', 'SkillsEnhancementInitiatives', 'AlumniContribution', 'CourceInAllProgram', 'NewPrograms' ]
        for (const model of aqarModels) {
            let year
            for (const yearField in YearSelecter) {
                if (YearSelecter[yearField].includes(model)) {
                  year= yearField;
                }
            }
            report[model] = await models[model].find({SchoolName,[year]:{$in:years}});
        }
        res.send({report})
    }
    catch(err){
        console.log(err);
    }
})

module.exports = { router, excelObject, YearSelecter }