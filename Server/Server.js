// all imports
const cron = require('node-cron');
const { Delete_Pdfs, DB_Backups, Delete_Excels, Network_Connect } = require('./utility/cronFunction');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv')
const mixpanel = require('mixpanel')
dotenv.config()
const { json } = require("express");
const jwt = require("jsonwebtoken");
app.use(json());
const mongoose = require("mongoose");
const PORT = 4000;
app.use(cors());
const path = require("path");
var fs = require("fs");
var pdf = require("html-pdf");
const multer = require("multer");
const Excel = require("exceljs");
var options = { format: "A4" };


// crons Backup_DB/Delete_Pdf_Excels
cron.schedule('45 0 * * *', () => {
  Delete_Excels();
  Delete_Pdfs();
});
cron.schedule('30 0 * * *', () => DB_Backups());

//netwok connection
cron.schedule('0 0 * * 1,4', () => Network_Connect());


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json({ limit: '10mb' })); // Adjust the limit as per your requirements

app.use(cookieParser());


// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `./uploads/faculty-uploads/`));
    console.log('Link :', path.join(__dirname, `./uploads/faculty-uploads/`))
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;


//routes
require("./routes/faculty-routes/routes.js")(app);
require("./routes/faculty-routes/excelReport.js")(app);
require("./routes/faculty-routes/editRoutes.js")(app);
require("./routes/faculty-routes/casRoutes.js")(app);
require("./routes/faculty-routes/pbasRoutes.js")(app);
require("./routes/faculty-routes/teacherReport.js")(app);
require("./routes/faculty-routes/services.js").services(app)
require("./routes/faculty-routes/authRoutes.js")(app, upload, jwt);

/// director routes
app.use(require('./routes/director-routes/director-routes'));
app.use(require('./routes/director-routes/academic-audit-routes/routes'));
require('./routes/director-routes/directorAuth')(app, jwt)

//admin routes
app.use(require('./routes/admin-routes/admin-routes'));

//alumni routes
app.use(require('./routes/alumni-routes/alumni-routes'));

//student routes
app.use(require('./routes/student-routes/student-routes'))
app.use(require('./routes/student-routes/student-auth'));

//developer routes
app.use(require('./routes/developer-routes/developer-routes'))

// utility routes
require('./utility/feedback')(app)
require('./utility/dashboard')(app)
require('./utility/userAuthentication')(app, jwt)
app.use(require('./utility/forgotPassword'));
app.use(require('./utility/verifyOTP'));

// pro (news) routes
require('./routes/pro-routes/auth')(app, jwt)
require('./routes/pro-routes/newsOperations')(app)

// visitor routes
require('./utility/visitorCount')(app)

// photo gallery routes
require('./routes/photogallery-routes/event')(app)


// Database Configuration
// const URL = `mongodb://${process.env.DB_User}:${process.env.DB_Pass}@localhost:27017/${process.env.DB_Name}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;

const URL = `mongodb://localhost:27017/srtmun`


mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => console.log("Database connection failed"));


// FILE MANAGEMENT SECTION

// 1. File Deletion function
async function deleteFile(fileName, desiredPath, callback) {
  let paths = {
    faculty: path.join(__dirname, `./uploads/faculty-uploads/${fileName}`),
    CAS: path.join(__dirname, `./uploads/faculty-uploads/CAS-uploads/${fileName}`),
    PBAS: path.join(__dirname, `./uploads/faculty-uploads/PBAS-uploads/${fileName}`)
  }
  fs.unlink(paths[desiredPath], callback)
}


app.get("/downloadPdf/:fileName", (req, res) => {
  const fileName = req.params.fileName

  const link = path.join(__dirname, `../pdfs/${fileName}`);
  res.download(link)
});

app.get("/downloadExcel/:filename", (req, res) => {
  const filename = req.params.filename;

  const link = path.join(__dirname, `../excels/${filename}`);
  res.download(link)
});

app.get("/downloadSampleExcel/:filename", (req, res) => {
  const filename = req.params.filename;

  const link = path.resolve(`./sampleExcels/${filename}`);
  res.download(link)
})

app.get("/getFile/:filename", function (req, res) {
  const link = path.join(__dirname, `./uploads/faculty-uploads/${req.params.filename}`);
  res.download(link);
});

app.get("/showFile/:filename/:userType", function (req, res) {

  let { userType, filename } = req.params
  if (!userType) {
    userType = 'faculty'
  }

  const uploadPaths = {
    faculty: `./uploads/faculty-uploads/${filename}`,
    CAS: `./uploads/faculty-uploads/CAS-uploads/${filename}`,
    PBAS: `./uploads/faculty-uploads/PBAS-uploads/${filename}`,
    director: `./uploads/director-uploads/${filename}`,
    AAA: `./uploads/director-uploads/AAA-uploads/${filename}`,
    student: `./uploads/student-uploads/${filename}`,
    alumni: `./uploads/director-uploads/${filename}`,
    news: `./uploads/news-uploads/${filename}`,
    event: `./uploads/event-uploads/${filename}`,
    school: `./uploads/school-uploads/${filename}`,
    admin: `./uploads/admin-uploads/${filename}`,
  }

  const link = path.join(__dirname, uploadPaths[userType]);
  res.sendFile(link);
});


app.post("/api/deleteFile", (req, res) => {
  const { fileName, path } = req.body
  deleteFile(fileName, path, (err) => {
    try {
      if (err) {
        throw 'File not found'
      }
      res.send({ status: 'deleted' });
    } catch (error) {
      console.log('The error is :', error)
      res.send({ status: 'error' });
    }
  })
})




// SERVING SECTION


// making build folder as static folder
app.use(express.static(path.join(__dirname, "build")));

// for all routes server will serve index.html from build folder

// 1. for going live 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

// 2. for showing maintenance page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "maintenance-build", "index.html"));
})


app.listen(PORT, function () {
  console.log(`Server started successfully at ${PORT}.`);
});
