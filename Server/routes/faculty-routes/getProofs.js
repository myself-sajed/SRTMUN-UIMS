const { AllModels } = require("./routes")
const path = require("path")
const { mergePDFs } = require("../../utility/actualFileMerge")

function getProofs(app) {

    app.post('/faculty/getProofs', async (req, res) => {

        const { model, filter } = req.body
        console.log('Model:', model, filter)
        const docs = await AllModels[model].find(filter)

        try {
            if (docs.length > 0) {

                let proofs = [...new Set(docs.map((item) => path.join(__dirname, `../../uploads/faculty-uploads/${item.proof}`)))].filter((item) => !item.includes('undefined'))

                console.log('Proofs:', proofs)

                const fileName = `${model}-ProofsPDF-${new Date().getTime()}.pdf`;
                const outputPath = `pdfs/${fileName}`;

                await mergePDFs(proofs, outputPath);

                res.send({ status: 'success', fileName })



            } else {
                res.send({ status: 'error', message: "No proofs found related to this table" })
            }
        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: "Internal Server Error" })

        }

    })


}


module.exports = getProofs