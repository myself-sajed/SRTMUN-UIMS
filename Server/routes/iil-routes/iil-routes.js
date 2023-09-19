const IncubationDetails = require('../../models/iil-models/iilIncubationDetails')
const ScopusWebOfScience = require('../../models/iil-models/iilScopusWebOfScience')

function iilRoutes(app) {

    const iilModels = { IncubationDetails, ScopusWebOfScience }


    // add iil data in any iil model
    app.post('/iil/addData', async (req, res) => {
        try {
            const { model, dataToAppend, filter } = req.body;
            await iilModels[model].findOneAndUpdate(filter, dataToAppend, { upsert: true, new: true });
            res.send({ status: 'success' })
        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })
        }
    })

    // retrive iil data from any iil model
    app.post('/iil/getData', async (req, res) => {
        try {
            const { model, filter } = req.body;
            const data = await iilModels[model].findOne(filter).lean()
            console.log(data)
            if (data) {
                res.send({ status: 'success', data })
            } else {
                res.send({ status: 'error' })
            }
        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })

        }
    })
}

module.exports = iilRoutes;