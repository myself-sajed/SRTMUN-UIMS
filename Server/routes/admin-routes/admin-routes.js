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

const models = { User, DirectorUser, AlumniUser, StudentUser, BooksAndChapters, ResearchProjects, EContentDeveloped, Petant, ConferenceOrganized, InvitedTalk, ResearchGuidance, ResearchPapers, Fellowship }


    const SchoolNames = [
         "School of Computational Sciences",
         "School of Chemical Sciences",
         "School of Commerce and Management Sciences",
         "School of Educational Sciences",
         "School of Mathematical Sciences",
         "School of Physical Sciences",
         "School of Social Sciences",
         "School of Earth Sciences",
         "School of Life Sciences",
         "School of Pharmacy",
         "School of Media Studies",
         "School of Fine and Performing Arts",
         "School of Language, Literature and Culture Studies",
         "School of Management Sciences, Sub-Campus, Latur",
         "School of Technology, Sub-Campus, Latur",
         "School of Social Sciences, Sub-Campus, Latur",
    ]

    const dataSetter = {
        StudentUser: {
            "School of Computational Sciences" : "compStudentCount",
            "School of Chemical Sciences" : "chemiStudentCount",
            "School of Commerce and Management Sciences" : "managementStudentCount",
            "School of Educational Sciences" : "eduStudentCount",
            "School of Mathematical Sciences" : "mathStudentCount",
            "School of Physical Sciences" : "phyStudentCount",
            "School of Social Sciences" : "socialStudentCount",
            "School of Earth Sciences" : "earthStudentCount",
            "School of Life Sciences" : "lifeStudentCount",
            "School of Pharmacy" : "pharmaStudentCount",
            "School of Media Studies" : "mediaStudentCount",
            "School of Fine and Performing Arts" : "fineStudentCount",
            "School of Language, Literature and Culture Studies" : "langStudentCount",
            "School of Management Sciences, Sub-Campus, Latur" : "managementLaturStudentCount",
            "School of Technology, Sub-Campus, Latur" : "techLaturStudentCount",
            "School of Social Sciences, Sub-Campus, Latur" : "socialLaturStudentCount",
        }
    }


    router.post("/getDepartmentWiseDocumentCount", async (req, res) => {
        const { model, property } = req.body
        try{
            let report = {}
            for (const school of SchoolNames) {
                let count = await models[model].countDocuments({[property]: school })
                report[dataSetter[model][school]] = count
             }
             res.send(report)
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    })

router.post("/getDocumentCount", async (req, res) => {
    const { model, filterCundition } = req.body
    try {
        if (model === "StudentUser" && filterCundition !== null) {
            const fetch = await models[model].countDocuments({})
            res.status(200).send({ fetch });
        } else {
            const fetch = await models[model].countDocuments({})
            res.status(200).send({ fetch });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})



module.exports = router;