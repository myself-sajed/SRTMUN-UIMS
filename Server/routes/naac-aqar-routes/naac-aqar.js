const router = require('express').Router()
const AQARMatter = require('../../models/aqar-models/aqarMatter')

router.post('/aqar/fetchAQARMatter', async (req, res) => {
    try {
        const { filter } = req.body
        const doc = await AQARMatter.findOne(filter)
        if (doc) {
            res.send({ status: 'success', data: doc })
        } else {
            res.send({ status: 'notfound' })
        }
    } catch (error) {
        console.log(error)
        res.send({ status: 'error', message: error.message })
    }
})


router.post('/aqar/saveAQARMatter', (req, res) => {
    try {
        const { formData } = req.body
        const filter = { academicYear: formData.academicYear, userType: formData.userType, matterType: formData.matterType }

        AQARMatter.findOneAndUpdate(filter, formData, { upsert: true, new: true }, (err, updatedDocument) => {
            if (err) {
                res.send({ status: 'error', message: err })
            } else {
                res.send({ status: 'success' })
            }
        })

    } catch (error) {
        console.log(error)
        res.send({ status: 'error', message: error.message })

    }
})

module.exports = router