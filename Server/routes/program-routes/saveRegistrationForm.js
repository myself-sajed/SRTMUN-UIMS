const RegistrationResponse = require('../../models/program-models/registrationResponses');
const ProgramModel = require('../../models/program-models/program');

async function registrationForm(app) {
    app.post('/program/registration', async (req, res) => {
        const { formData, programId } = req.body;

        try {
            // Check if the program exists
            const program = await ProgramModel.findById(programId);
            if (!program) {
                return res.send({ status: 'error', message: "Could not found the program, it doest not exist at the moment." });
            }

            // Create a new registration response
            const response = new RegistrationResponse({
                response: JSON.stringify(formData),
                program: programId,
            });

            // Save the registration response
            const savedResponse = await response.save();
            console.log('savedResponse:', savedResponse);

            // Update the program's registrationResponse array
            program.registrationResponse.push(savedResponse._id);
            await program.save();

            return res.send({ status: 'success', message: 'Registration response saved successfully' });
        } catch (error) {
            console.error('Error:', error);
            return res.send({ status: 'error', message: `Server Error: ${error} ` });
        }
    });

    app.post('/programs/getRegistrations', async (req, res) => {
        try {
            const { filter } = req.body;
            let data = await RegistrationResponse.find({ filter }).lean().sort({ createdAt: -1 })
            res.send({ status: 'success', data })
        } catch (error) {
            res.send({ status: 'error', error })
        }
    })
}

module.exports = registrationForm;
