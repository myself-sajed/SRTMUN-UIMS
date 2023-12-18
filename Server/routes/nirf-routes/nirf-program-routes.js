
const router = require('express').Router()
const NIRFPrograms = require('../../models/nirf-models/nirfProgramsModel')
const NIRFStudentIntake = require('../../models/nirf-models/nirfStudentIntakeModel')

router.post('/NIRF/savePrograms', async (req, res) => {
    const { programs, schoolName } = req.body;

    const savedPrograms = await NIRFPrograms.findOneAndUpdate({ schoolName }, { programs, schoolName }, { upsert: true, new: true })

    if (savedPrograms) {
        res.send({ status: 'success', data: savedPrograms.programs })
    } else {
        res.send({ status: 'error', message: 'Could not save programs' })
    }

})

router.post('/NIRF/getPrograms', async (req, res) => {
    const { schoolName } = req.body;
    try {
        const program = await NIRFPrograms.findOne({ schoolName })
        res.send(program?.programs || [])
    } catch (error) {
        res.send([])
    }

})

router.post('/NIRF/saveStudentIntake', async (req, res) => {
    const { programId, programData, schoolName } = req.body;

    // Find the existing NIRFStudentIntake document
    const existingIntake = await NIRFStudentIntake.findOne({ schoolName });

    let updatedData;

    // If there is existing data, spread it with the new programData
    if (existingIntake) {
        updatedData = { ...existingIntake[programId], ...programData };
    } else {
        // If no existing data, use only the new programData
        updatedData = programData;
    }

    // Update or insert the document
    const savedIntake = await NIRFStudentIntake.findOneAndUpdate(
        { schoolName },
        { $set: { [programId]: updatedData, schoolName } },
        { upsert: true, new: true }
    );

    if (savedIntake) {
        res.send({ status: 'success', data: savedIntake[programId] });
    } else {
        res.send({ status: 'error', message: 'Could not save student intake' });
    }
});


router.post('/NIRF/getStudentIntake', async (req, res) => {
    const { schoolName } = req.body;
    try {
        const studentIntake = await NIRFStudentIntake.findOne({ schoolName })
        res.send(studentIntake)
    } catch (error) {
        res.send([])
    }

})

module.exports = router