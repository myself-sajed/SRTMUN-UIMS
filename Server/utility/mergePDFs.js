const { PDFDocument } = require('pdf-lib');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const fetchDataForCAS = require('../routes/data-fetcher/forCAS');
const CASModel = require('../models/faculty-models/casModel');

async function mergePDFs(files, outputPath) {
    async function convertJpgToPng(jpgBuffer) {
        const pngBuffer = await sharp(jpgBuffer).toFormat('png').toBuffer();
        return pngBuffer;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        if (file.includes('.pdf')) {
            const pdfBytes = await axios.get(file, { responseType: 'arraybuffer' });
            const pdfDoc = await PDFDocument.load(pdfBytes.data);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        } else if (file.includes('.jpg') || file.includes('.jpeg') || file.includes('.png')) {
            try {
                const imageBytes = await axios.get(file, { responseType: 'arraybuffer' });

                if (file.includes('.jpeg') || file.includes('.jpg')) {
                    const pngBytes = await convertJpgToPng(imageBytes.data);
                    const pngImage = await mergedPdf.embedPng(pngBytes);
                    const page = mergedPdf.addPage();
                    page.drawImage(pngImage, {
                        x: 0,
                        y: 0,
                        width: page.getWidth(),
                        height: page.getHeight(),
                    });
                } else if (file.includes('.png')) {
                    const pngImage = await mergedPdf.embedPng(imageBytes.data);
                    const page = mergedPdf.addPage();
                    page.drawImage(pngImage, {
                        x: 0,
                        y: 0,
                        width: page.getWidth(),
                        height: page.getHeight(),
                    });
                }
            } catch (error) {
                console.log(`Error processing image file: ${file}`, error);
            }
        } else {
            console.log(`Unsupported file type: ${file}`);
        }
    }

    const mergedPdfBytes = await mergedPdf.save();

    fs.writeFileSync(outputPath, mergedPdfBytes);
    return outputPath; // Return the outputPath after saving the merged PDF
}

async function casFilesGenerator(selectedYear, userId) {

    let casDataSpecifier = [
        {
            model: 'ResearchPaper',
            casName: 'researchPaper'
        },
        {
            model: 'BookAndChapter',
            casName: 'publicationData'
        },
        {
            model: 'PhdAwarded',
            casName: 'researchGuide',
        },
        {
            model: 'ResearchProject',
            casName: 'researchProjects',
        },
        {
            model: 'ConsultancyServices',
            casName: 'consultancy',
        },
        {
            model: 'Patent',
            casName: 'patents',
        },
        {
            model: 'AwardRecognition',
            casName: 'awards',
        },
        {
            model: 'Fellowship',
            casName: 'fellow',
        },
        {
            model: 'InvitedTalk',
            casName: 'invitedTalks',
        },
        {
            model: 'BookAndChapter',
            casName: 'conference',
        },
    ]

    let fetchYears;
    let casArray;

    const casData = await CASModel.findOne({ userId: userId })
    if (casData) {
        if (casData) {
            let oldCasArray = [];
            casData.casData.forEach(cas => {
                oldCasArray.push(JSON.parse(cas))
            });

            // keep those element in array whose casYear is equal to selectedYear array
            let newCasArray = []
            let years = []
            selectedYear.forEach(year => {
                oldCasArray.forEach(item => {
                    if (item.casYear === year) {
                        newCasArray.push(item)
                        years.push(...item.fetchYears)
                    }
                }
                )
            })

            fetchYears = [...new Set(years)]

            // sort the array based on casYear field in ascending order
            newCasArray.sort((a, b) => {
                return parseInt(a.casYear.slice(0, 4)) - parseInt(b.casYear.slice(0, 4));
            })

            casArray = newCasArray
        }
    }

    // console.log('Fetch years :', [...fetchYears])
    // console.log('cas data :', casArray)



    try {

        let response = await fetchDataForCAS(fetchYears, userId)
        // console.log(response)
        let filteredResponse = []
        let mainDataMap = {}

        casDataSpecifier.forEach((casSpecifier) => {
            casArray.forEach((casItem) => {
                const dataMap = casItem.academicData[casSpecifier.casName]?.dataMap || [];

                mainDataMap = {
                    ...mainDataMap,
                    [casSpecifier.casName === 'conference'
                        ? 'ConferenceBookAndChapter'
                        : casSpecifier.casName === 'publicationData'
                            ? 'MainBookAndChapter'
                            : casSpecifier.model]: [...mainDataMap.casModel || [], ...dataMap],
                };
            });
        });


        casDataSpecifier.forEach((casSpecifier) => {
            let filteredItems = response[casSpecifier.model].filter((item) => {
                return mainDataMap[[casSpecifier.casName === 'conference' ? "ConferenceBookAndChapter" : casSpecifier.casName === "publicationData" ? "MainBookAndChapter" : casSpecifier.model]].includes(item._id.toHexString())


            })
            filteredResponse.push(filteredItems)
        })


        // keep only those item in the files which are present in the dataMap of respective model

        const files = filteredResponse.flatMap((array) =>
            array.map((obj) => `${process.env.REACT_APP_MAIN_URL}/showFile/${obj.proof}/faculty`)
        );

        const fileName = `MergedPDF-${new Date().getTime()}.pdf`;
        const outputPath = `pdfs/${fileName}`;

        mergePDFs(files, outputPath);

        console.log('PDFs merged and saved successfully!');
        return { fileName, status: 'success' }; // Return the outputPath and success status
    } catch (error) {
        console.log('Error:', error);
        return { status: 'failure', error }; // Return the failure status and error
    }
}

// casFilesGenerator(["2019-20",], "62b0a06942f8174e43cd9a26")


module.exports = { casFilesGenerator, mergePDFs };
