const fs = require('fs');
const express = require('express');
const router = express.Router();
// const YfCompitition = requre('../../models/youth-festival/yfCompetitionSchema.js')
const YfStudents = require('../../models/youth-festival/yfStudentSchema')

router.post('/youthfestival/competition/:action', async(req,res)=>{
    const action = req.params.action
    const { college, selectedStudents, competitionName, academicYear, isGroup } = req.body
    
})

module.exports = router