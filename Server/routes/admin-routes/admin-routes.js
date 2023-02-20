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