const YFGeneralInfo = require('../../models/youth-festival/yfGeneralInfo')

function youthRoutes(app) {

    app.post('/youth/saveInfo', (req, res) => {
        const { info, academicYear } = req.body;
        const filter = { academicYear }

        YFGeneralInfo.findOneAndUpdate(filter, { info, academicYear }, { upsert: true, new: true }, (err, updatedDocument) => {
            if (err) {
                res.send({ status: 'error', message: err })
            } else {
                res.send({ status: 'success' })
            }
        })
    })

    app.post('/youth/fetchInfo', async function (req, res) {
        try {
            const { filter } = req.body
            const doc = await YFGeneralInfo.findOne(filter)
            if (doc) {
                console.log(doc)
                res.send({ status: 'success', data: doc })
            } else {
                res.send({ status: 'notfound' })
            }
        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: error.message })
        }
    })
}

module.exports = youthRoutes