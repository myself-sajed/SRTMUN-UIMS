const YFGeneralInfo = require('../../models/youth-festival/yfGeneralInfo');
const College = require('../../models/youth-festival/yfColleges');
const path = require('path');
const fs = require('fs');
const multerConfig = require('../../utility/multerConfig').multerConfig
const YfTable1 = require('../../models/youth-festival/yfTable1Schema')
const YfTable2 = require('../../models/youth-festival/yfTable2Schema')
const YfGroup = require('../../models/youth-festival/yfGroupSchema')

const models = { YfTable1, YfTable2, YfGroup }

const youthUpload = multerConfig(`../uploads/youth-uploads/`)

const { pupetteerSetting } = require('../../utility/pupetteerSetting');

function youthRoutes(app) {

    //get
    app.post('/youth/getData', async (req, res) => {
        const { model, filter } = req.body
        try {
            const fetch = await models[model].find(filter);
            res.status(200).send(fetch);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    })

    //set
    app.post("/youth/newRecord/:model", youthUpload.single("photoURL"), async (req, res) => {
        try {
            const model = req.params.model
            console.log(model)
            const data = JSON.parse(JSON.stringify(req.body));
            let SendData = null;
            // const { } = data
            const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }
            SendData = data

            if (up) {
                var withUpData = Object.assign(SendData, { photoURL: up })
            } else {
                var withUpData = SendData
            }
            const obj = new models[model](withUpData);
            await obj.save();
            res.status(201).send("Entry Succeed")
        }
        catch (err) {
            console.log(err)
            res.status(500).send()
        }
    });

    //reset
    app.post('/youth/editRecord/:model', youthUpload.single('photoURL'), async (req, res) => {
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        const { id } = data
        const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }
        SendData = data

        var alldata = null
        if (up) {
            alldata = Object.assign(SendData, { photoURL: up })
        }
        else {
            alldata = SendData
        }
        await models[model].findOneAndUpdate({ _id: id }, alldata)
        res.status(200).send("Edited Successfully")
    })

    //remove
    app.post('/youth/deleteRecord', async (req, res) => {
        const { model, id } = req.body

        try {
            const Record = await models[model].findOne({ _id: id });
            await models[model].deleteOne({ _id: id })
            const Filename = Record.photoURL;
            const link = path.join(__dirname, `../../uploads/youth-uploads/${Filename}`);
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

    app.post('/youthfestival/allData', async (req, res) => {
        const { collegeId, academicYear } = req.body
        const user = await College.findOne({ _id: collegeId }).lean()
        const reportData = {}
        const filter = { college: collegeId, academicYear }
        if (user) {
            reportData.college = user;

            const info = await YFGeneralInfo.findOne(filter)
            if (info) {
                reportData.info = JSON.parse(info.info)

                const Table1Students = await YfTable1.find(filter).lean()
                const Table2Students = await YfTable2.find(filter).lean()

                reportData.Table1Students = Table1Students
                reportData.Table2Students = Table2Students

                const totalStudents = [...Table1Students || [], ...Table2Students || []]
                let male = 0;
                let female = 0;
                let other = 0;

                totalStudents.forEach((item) => {
                    if (item?.gender === "Male") {
                        male += 1;
                    } else if (item?.gender === "Female") {
                        female += 1;
                    } else {
                        other += 1;
                    }
                })

                let totalCount = male + female + other
                reportData.male = male;
                reportData.female = female;
                reportData.other = other;
                reportData.total = totalCount;
                reportData.totalStudents = totalStudents;

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
