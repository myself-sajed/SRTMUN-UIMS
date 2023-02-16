const {spawn} = require('child_process');
const exec = require('child_process').exec;
const path = require("path");
const C_Date = new Date();

function Delete_Excels() {
    
  const EXCEL_Path = path.join(__dirname, "../../excels/*")
  console.log(EXCEL_Path);

  exec('rm '+ EXCEL_Path, function(err,stdout,stderr){     
    if(err)
       console.log('Directory Empty', err);
    else
       console.log("Files Deleted");
  });

}

function Delete_Pdfs() {
    const PDF_Path = path.join(__dirname, "../../pdfs/*")
    console.log(PDF_Path);
    exec('rm '+ PDF_Path, function(err,stdout,stderr){     
      if(err)
         console.log('Directory Empty', err);
      else
         console.log("Files Deleted");
    });
    
}

// DB Backups configurations

//mongodump --host localhost --port 27017 --db srtmun --gzip --archive /home/sms2019/react-workspace/DB_Backups/srtmun2022-12-04.gzip --authenticationDatabase srtmun --username '***' --password *** 

function DB_Backups(){
    let ARCHIVE_Path = path.join(__dirname, "../../../DB_Backups", `${process.env.DB_Name}${C_Date.getDate()}-${C_Date.getMonth()+1}-${C_Date.getFullYear()}.gzip`);
    console.log(process.env.DB_Name);
    const child = spawn( 'mongodump',[`--uri=mongodb://${process.env.DB_User}:${process.env.DB_Pass}@localhost:27017/${process.env.DB_Name}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`,
  '--gzip',
  `--archive=${ARCHIVE_Path}`,
]);
  
  child.stdout.on("data", (data)=>console.log('stdout:\n', Buffer.from(data).toString()));
  child.stderr.on("data", (data)=>console.log('stderr:\n', Buffer.from(data).toString()));
  child.on("error", (error)=>console.log('error:\n', error));
  child.on("exit", (code,signal)=>{
    if(code) console.log('process exited with code: ' + code);
    else if(signal) console.log('process exited with signal: ' + signal);
    else console.log("Backup is successful")
  })
}
module.exports = {Delete_Pdfs , DB_Backups, Delete_Excels}
