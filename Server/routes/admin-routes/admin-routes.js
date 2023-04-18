const express = require('express');
const router = express.Router();

const User = require('../../models/faculty-models/userModel')
const DirectorUser = require('../../models/director-models/directorUser');
const AlumniUser = require('../../models/alumni-models/alumniUserSchema');
const StudentUser = require('../../models/student-models/studentUserSchema');

const BooksAndChapters = require('../../models/faculty-models/booksAndChapters');
const ResearchPapers = require('../../models/faculty-models/researchPapers');
const ResearchProjects = require('../../models/faculty-models/researchProjects');
const EContentDeveloped = require('../../models/faculty-models/eContentDeveloped');
const Petant = require('../../models/faculty-models/patent');
const ConferenceOrganized = require('../../models/faculty-models/conferenceOrganized');
const InvitedTalk = require('../../models/faculty-models/invitedTalk');
const ResearchGuidance = require('../../models/faculty-models/researchGuidance');
const Fellowship = require('../../models/faculty-models/fellowship');
const Qualification = require('../../models/faculty-models/qualificationModel');
const Degree = require('../../models/faculty-models/degreeModel');
const AppointmentsHeldPrior = require('../../models/faculty-models/appointmentsHeldPrior');
const AwardRecognition = require('../../models/faculty-models/awardAndRecognition');
const BookAndChapter = require('../../models/faculty-models/booksAndChapters');
const Collaboration = require('../../models/faculty-models/collaborations');
const ConferenceParticipated = require('../../models/faculty-models/conferenceParticipated');
const ConsultancyServices = require('../../models/faculty-models/consultancyServices');
const ResearchProject = require('../../models/faculty-models/researchProjects')
const PostHeld = require('../../models/faculty-models/postHeld')
const Lectures = require('../../models/faculty-models/lectures')
const ResearchPaper = require('../../models/faculty-models/researchPapers')
const PhdAwarded = require('../../models/faculty-models/phdAwarded')
const JrfSrf = require('../../models/faculty-models/jrfsrf')
const Patent = require('../../models/faculty-models/patent')
const Online = require('../../models/faculty-models/online')
const Financialsupport = require('../../models/faculty-models/financialSupport')
const Responsibilities = require('../../models/faculty-models/responsibilities')
const ForeignVisit = require('../../models/faculty-models/foreignVisit')

// director 
const AlumniContribution = require('../../models/director-models/alumniContributionSchema')
const Award = require('../../models/director-models/awardSchema')
const ConferencesSemiWorkshopOrganized = require('../../models/director-models/conferencesSemiWorkshopOrganizedSchema')
const CounselingAndGuidance = require('../../models/director-models/counselingAndGuidanceSchema')
const DemandRatio = require('../../models/director-models/demandRatioSchema')
const Employability = require('../../models/director-models/employabilitySchema')
const ExtensionActivities = require('../../models/director-models/extensionActivitysSchema')
const IctClassrooms = require('../../models/director-models/ictClassroomsSchema')
const MoUs = require('../../models/director-models/moUsSchema')
const Placement = require('../../models/director-models/placementSchema')
const ProgressionToHE = require('../../models/director-models/progressionToHESchema')
const ProjectsInternships = require('../../models/director-models/projectsInternshipsSchema')
const QualifiedExams = require('../../models/director-models/qualifiedExamSchema')
const ResearchMethodologyWorkshops = require('../../models/director-models/researchMethodologyWorkshopsSchema')
const ReservedSeats = require('../../models/director-models/reservedSeatsSchema')
const SkillsEnhancementInitiatives = require('../../models/director-models/skillsEnhancementInitiativesSchema')
const StudentSatisfactionSurvey = require('../../models/director-models/studentSatisfactionSurveySchema')
const SyllabusRevision = require('../../models/director-models/syllabusRevisionSchema')
const TrainingProgramsOrganized = require('../../models/director-models/trainingProgramsOrganizedSchema')
const UgcSapCasDstFistDBTICSSR = require('../../models/director-models/ugcSapCasDstFistDBTICSSRSchema')
const ValueAddedCource = require('../../models/director-models/valueAddedCourceSchema')

//admin
const IsRegistration = require('../../models/admin-models/isRegistrationSchema')

const models = { User, DirectorUser, AlumniUser, StudentUser, BooksAndChapters, ResearchProjects, EContentDeveloped, Petant, ConferenceOrganized, InvitedTalk, ResearchGuidance, ResearchPapers, Fellowship, Qualification, Degree, AppointmentsHeldPrior, AwardRecognition, BookAndChapter, Collaboration, ConferenceParticipated, ConsultancyServices, ResearchProject, PostHeld, Lectures, ResearchPaper, PhdAwarded, JrfSrf, Patent, Online, Financialsupport, Responsibilities, ForeignVisit, AlumniContribution, Award, ConferencesSemiWorkshopOrganized, CounselingAndGuidance, DemandRatio, Employability, ExtensionActivities, IctClassrooms, MoUs, Placement, ProgressionToHE, ProjectsInternships, QualifiedExams, ResearchMethodologyWorkshops, ReservedSeats, SkillsEnhancementInitiatives, StudentSatisfactionSurvey, SyllabusRevision, TrainingProgramsOrganized, UgcSapCasDstFistDBTICSSR, ValueAddedCource }

const facultyModels = ["BooksAndChapters", "Qualification", "Degree", "AppointmentsHeldPrior", "AwardRecognition", "BookAndChapter", "Collaboration", "ConferenceOrganized", "ConferenceParticipated", "ConsultancyServices", "EContentDeveloped", "ResearchProject", "PostHeld", "Lectures", "ResearchPaper", "PhdAwarded", "JrfSrf", "Patent", "Online", "Financialsupport", "ForeignVisit", "InvitedTalk", "Fellowship", "Responsibilities"]

const directorModels = ["AlumniContribution", "Award", "ConferencesSemiWorkshopOrganized", "CounselingAndGuidance", "DemandRatio", "Employability", "ExtensionActivities", "IctClassrooms", "MoUs", "Placement", "ProgressionToHE", "ProjectsInternships", "QualifiedExams", "ResearchMethodologyWorkshops", "ReservedSeats", "SkillsEnhancementInitiatives", "StudentSatisfactionSurvey", "SyllabusRevision", "TrainingProgramsOrganized", "UgcSapCasDstFistDBTICSSR", "ValueAddedCource"]

const dataSetter = {
    "School of Computational Sciences": "compCount",
    "School of Chemical Sciences": "chemiCount",
    "School of Commerce and Management Sciences": "managementCount",
    "School of Educational Sciences": "eduCount",
    "School of Mathematical Sciences": "mathCount",
    "School of Physical Sciences": "phyCount",
    "School of Social Sciences": "socialCount",
    "School of Earth Sciences": "earthCount",
    "School of Life Sciences": "lifeCount",
    "School of Pharmacy": "pharmaCount",
    "School of Media Studies": "mediaCount",
    "School of Fine and Performing Arts": "fineCount",
    "School of Language, Literature and Culture Studies": "langCount",
    "School of Management Sciences, Sub-Campus, Latur": "managementLaturCount",
    "School of Technology, Sub-Campus, Latur": "techLaturCount",
    "School of Social Sciences, Sub-Campus, Latur": "socialLaturCount",
}


router.post("/getDepartmentWiseDocumentCount", async (req, res) => {
    const { model, property } = req.body
    try {

        let report = {}

        if (facultyModels.includes(model)) {
            let data = await models[model].find({}).populate("userId")
            for (const school of Object.keys(dataSetter)) {

                let count = 0
                for (const item of data) {
                    if (item.userId !== null && item.userId.department === school) {
                        count += 1
                    }
                }
                report[dataSetter[school]] = count
            }
        } else {
            for (const school of Object.keys(dataSetter)) {
                let count = await models[model].countDocuments({ [property]: school })
                report[dataSetter[school]] = count
            }
        }
        res.send(report)

    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post("/getDocumentCount", async (req, res) => {
    const mod = { 'User': 'facltyCount', 'DirectorUser': 'directorCount', 'AlumniUser': 'alumniCount', 'StudentUser': 'studentCount', 'BooksAndChapters': 'booksAndChaptersCount', 'ResearchProjects': 'researchProjectsCount', 'EContentDeveloped': 'eContentDevelopedCount', 'Petant': 'petantCount', 'ConferenceOrganized': 'conferenceOrganizedCount', 'InvitedTalk': 'invitedTalkCount', 'PhdAwarded': 'researchGuidanceCount', 'ResearchPapers': 'researchPapersCount', 'Fellowship': 'fellowshipCount', }

    let report = {};

    try {
        for (const model of Object.keys(mod)) {
            // console.log(model)
            const fatch = await models[model].countDocuments({})
            report[mod[model]] = fatch
        }
        // console.log(report)
        res.status(200).send({ report })
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Get Route
router.post('/Admin/getData', async (req, res) => {

    const { model, filter, filterConditios } = req.body
    let school = directorModels.includes(model) ? "SchoolName" : model === "AlumniUser" || model === "StudentUser" ? "schoolName" : model === 'DirectorUser' || model === 'User' ? "department" : ""

    let fil = {};
    let filc = {};
    if (filterConditios !== null) {
        filc = filterConditios
    }
    if (filter !== null) {
        fil = filter
    }
    try {
        if (facultyModels.includes(model)) {
            models[model].find(fil).populate({
                path: 'userId',
                match: filc,
                select: ('-password'),
            }).exec(function (err, fetch) {
                let filterData = []
                if (err) {
                    // throw err; 
                    console.log(err);
                }
                for (item of fetch) {
                    if (item.userId !== null) {
                        filterData.push(item)
                    }
                }
                res.status(200).send(filterData);
            });
        }
        else {
            const fetch = await models[model].find(fil).sort({ [school]: 1 });
            res.status(200).send(fetch);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Get Route
router.post('/Admin/getData', async (req, res) => {

    const { model, filter, filterConditios } = req.body
    let fil = {};
    let filc = {};
    if (filterConditios !== null) {
        filc = filterConditios
    }
    if (filter !== null) {
        fil = filter
    }
    try {
        if (facultyModels.includes(model)) {
            models[model].find(fil).populate({
                path: 'userId',
                match: filc,
                select: ('-password'),
            }).exec(function (err, fetch) {
                let filterData = []
                if (err) {
                    // throw err; 
                    console.log(err);
                }
                for (item of fetch) {
                    if (item.userId !== null) {
                        filterData.push(item)
                    }
                }
                res.status(200).send(filterData);
            });
        }
        else {
            const fetch = await models[model].find(fil).sort({ $natural: -1 });
            res.status(200).send(fetch);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//registration page Enable/ Disable
router.post('/Registration/pageToggler', async (req, res) => {
    // console.log(req)
    const { name, state } = req.body
    await IsRegistration.updateOne({ name: "isRegToggle" }, { $set: { [`idObject.${name}`]: state } })
    const status = await IsRegistration.findOne({ name: "isRegToggle" }, { idObject: 1 })
    res.send(status.idObject)
})
// router.post('/Registration/pageStatus', async (req, res) => {
//     const status = await IsRegistration.findOne({name: "isRegToggle"}, {idObject: 1})
//     res.send(status.idObject)
// })

module.exports = router;