const { models } = require("../routes/faculty-routes/routes")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Get the dynamic destination folder from req.body
        const uploadPath = JSON.parse(JSON.stringify(req.body)).uploadFilePath
        const dynamicDestination = path.join(__dirname, `../uploads/faculty-uploads/`);
        callback(null, dynamicDestination);
    },
    filename: (req, file, callback) => {
        // Generate a unique filename or use the original filename.
        callback(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

function editableTableOperations(app) {


    app.post('/api/upsertRecord', upload.single('file'), async (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body))

        try {
            if (Boolean(data?.isNew) && data?.isNew !== 'undefined') {
                const { _id, ...dataWithoutId } = data;
                await new models.InvitedTalk({ ...dataWithoutId, proof: req.file.filename }).save();
                res.send({ status: 'success', message: 'Record added successfully' })
            } else {
                await models.InvitedTalk.findOneAndUpdate({ _id: data?._id }, { ...data, proof: req.file ? req.file.filename : data.proof })
                res.send({ status: 'success', message: 'Record updated successfully' })
            }

        } catch (error) {
            res.send({ status: 'error' })
        }

    })


}

module.exports = editableTableOperations