// import necessary models here
const FacultyUser = require('../models/faculty-models/userModel')
const DirectorUser = require('../models/director-models/directorUser')
const StudentUser = require('../models/student-models/studentUserSchema')
const AlumniUser = require('../models/alumni-models/alumniUserSchema')
const PROUser = require('../models/pro-models/proUser')
const YFCollege = require('../models/youth-festival/yfColleges')

const models = { FacultyUser, DirectorUser, StudentUser, AlumniUser, PROUser, YFCollege }

const userAuthentication = (app, jwt) => {

    // faculty-user authentication handler
    app.post("/api/user/authentication", (req, res) => {

        // get data from body
        const { token, model, filterName } = req.body
        const decoded = jwt.verify(token, "SRTMUN");
        const filter = { [filterName]: decoded[filterName] }
        models[model].findOne(filter).then(function (user) {
            if (user) {
                res.send({ status: "authenticated", user: user });
            } else {
                res.send({ status: "error" });
            }
        });
    });
}


module.exports = userAuthentication