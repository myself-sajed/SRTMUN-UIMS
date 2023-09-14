const YFGeneralInfo = require('../../models/youth-festival/yfGeneralInfo');
const College = require('../../models/youth-festival/yfColleges');

const { pupetteerSetting } = require('../../utility/pupetteerSetting');

function youthRoutes(app) {

    app.post('/youthfestival/allData', async (req, res) => {
        const { collegeId, academicYear } = req.body
        const user = await College.findOne({ _id: collegeId }).lean()
        const reportData = {}
        if (user) {
            reportData.college = user;

            const info = await YFGeneralInfo.findOne({ college: collegeId, academicYear })
            if (info) {
                reportData.info = JSON.parse(info.info)
            }
            res.send({ status: 'success', data: reportData })

        } else {
            res.send({ status: 'error', message: 'College has been deleted or not found' })
        }
    })

    app.post('/youthfestival/generate-application-form', async (req, res) => {
        const { user, academicYear } = req.body;
        const linkToNavigate = `${process.env.Report_Main_URL}/youthfestival/application-form/${user._id}/${academicYear}`
        const fileName = `${user.collegeName}-${academicYear}-ApplicationForm.pdf`
        console.log(linkToNavigate)

        await pupetteerSetting({ linkToNavigate, fileName })
        res.send({ status: 'generated', fileName })
    })

    app.post('/youth/saveInfo', (req, res) => {
        const { info, academicYear, user } = req.body;
        const filter = { academicYear }
        YFGeneralInfo.findOneAndUpdate(filter, { info, academicYear, college: user?._id }, { upsert: true, new: true }, (err, updatedDocument) => {
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