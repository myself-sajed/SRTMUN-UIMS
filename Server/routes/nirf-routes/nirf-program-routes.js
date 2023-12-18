
const router = require('express').Router()
const NIRFPrograms = require('../../models/nirf-models/nirfProgramsModel')

router.post('/NIRF/savePrograms', async (req, res) => {
    const { programs, schoolName } = req.body;

    const savedPrograms = await NIRFPrograms.findOneAndUpdate({ schoolName }, { programs, schoolName }, { upsert: true, new: true })

    if (savedPrograms) {
        console.log('Saved program:', savedPrograms)
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

console.log('programs working...')

module.exports = router