const CASModel = require('../../models/faculty-models/casModel')
const PBASModel = require('../../models/faculty-models/pbasModel')
const AAAModel = require('../../models/director-models/academic-audit-models/academicAuditModel')
const FacultyAQARModel = require('../../models/aqar-models/facultyAqarModel')
const DirectorAQARModel = require('../../models/aqar-models/directorAqarModel')

const modelsInfo = {
    CASModel: {
        model: CASModel,
        title: 'CAS'
    },
    PBASModel: {
        model: PBASModel,
        title: 'PBAS'
    },
    AAAModel: {
        model: AAAModel,
        title: 'AAA'
    },
    FacultyAQARModel: {
        model: FacultyAQARModel,
        title: 'Faculty AQAR'
    },
    DirectorAQARModel: {
        model: DirectorAQARModel,
        title: 'Director AQAR'
    }
}


function submitReportForm(app) {
    app.post('/services/submitForm', (req, res) => {
        const { filter, year, model } = req.body;

        modelsInfo[model].model.findOne(filter, (err, item) => {
            if (err) {
                console.log(err);
                return res.send({ status: "error", message: `Could not find the ${modelsInfo[model].title} account with this user.` });
            }

            if (item) {
                item.submitted = [...new Set([...item.submitted, year])]?.sort((a, b) => {
                    const numA = Number(a.replace('-', ''));
                    const numB = Number(b.replace('-', ''));
                    if (numA > numB) {
                        return -1;
                    } else if (numA < numB) {
                        return 1;
                    }
                    return 0;
                });;

                item.save((err, updatedItem) => {
                    if (err) {
                        console.log(err);
                        return res.send({ status: "error", message: "Error saving data." });
                    }
                    res.send({ status: 'success', data: updatedItem });
                });
            } else {
                console.log('COuld not find matching doc', filter)
                res.send({ status: 'error', message: `Could not find the ${modelsInfo[model].title} account with this user.` });
            }
        });
    });


    // get total cas data
    app.post("/services/getTotalReportData", (req, res) => {


        const { model, userType } = req.body


        if (userType === 'faculty') {
            modelsInfo[model].model.find({}).lean().populate("userId").select("submitted userId").exec().then((items, err) => {
                if (err) {
                    console.log(err)
                    res.send({ status: "error", message: "Internal server error" })
                }
                else {
                    if (items) {
                        res.send({ status: 'success', data: items });
                    }
                    else {
                        res.send({ status: 'error', message: "No data found" });
                    }
                }
            }


            )
        } else if (userType === 'director') {
            modelsInfo[model].model.find({}).lean().select("submitted schoolName").then((items, err) => {
                if (err) {
                    console.log(err)
                    res.send({ status: "error", message: "Internal server error" })
                }
                else {
                    if (items) {
                        res.send({ status: 'success', data: items });
                    }
                    else {
                        res.send({ status: 'error', message: "No data found" });
                    }
                }
            }

            )
        }
    })

}


module.exports = submitReportForm;