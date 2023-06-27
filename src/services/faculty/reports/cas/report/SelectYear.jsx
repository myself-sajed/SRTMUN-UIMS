import React, { useEffect, useState } from 'react'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Alert, CircularProgress } from '@mui/material';
import { generateCASReport } from '../CASServices';
import { useNavigate } from 'react-router-dom';
import siteLinks from '../../../../../components/siteLinks';
import ShowModal from '../../../../../components/ShowModal';

const SelectYear = ({ casYear, casData, userData, setReportLoading, error }) => {

    const [selectedYear, setSelectedYear] = useState([])
    let sortedYear = null;


    if (casYear) {

        const filteredYear = casYear.filter((item) => JSON.parse(item).casYear !== null);

        console.log('filteredYear :', filteredYear)
        // Sort the array in ascending order
        sortedYear = filteredYear.sort((a, b) => {
            const yearA = JSON.parse(a).casYear;
            const yearB = JSON.parse(b).casYear;

            if (yearA < yearB) {
                return -1;
            }
            if (yearA > yearB) {
                return 1;
            }
            return 0;
        });
    }

    console.log("sortedYear :", sortedYear)

    const navigate = useNavigate()
    const [forPrintOut, setForPrintOut] = useState(false)
    const [withProofs, setWithProofs] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleGeneration = () => {
        setReportLoading(true);
        generateCASReport(userData, selectedYear, setReportLoading, forPrintOut, withProofs)
    }

    return (
        <div>

            <div className='bg-blue-100 rounded-xl py-5 mt-4 sm:w-[80%] md:w-[50%] w-full sm:mx-auto'>
                {
                    sortedYear ?
                        <div>
                            <p className='text-base md:text-lg text-center'>Select Year(s) of which CAS Report to be generated</p>
                            <p className='text-center text-blue-900 text-xs md:text-sm'>Click on the respective year to select, click again to unselect.</p>
                            <div className='flex items-center justify-center gap-3 mt-3'>

                                <SelectYearRadio sortedYear={sortedYear} setSelectedYear={setSelectedYear} selectedYear={selectedYear} />

                            </div>

                            <ShowModal okText={"Generate Report"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Choose report type" onOkFunc={handleGeneration}>
                                <div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="printableOrNot" id="standard" checked onChange={(e) => { setForPrintOut(false) }} />
                                        <label class="form-check-label" htmlFor="standard">
                                            Standard Report
                                        </label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="printableOrNot" id="printable" onChange={(e) => { setForPrintOut(true) }} />
                                        <label class="form-check-label" htmlFor="printable">
                                            Printable Report (Specially designed for printing purposes)
                                        </label>
                                    </div>

                                    <hr />
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="radio" name="withOrWithoutProof" id="withoutProof" checked onChange={(e) => { setWithProofs(false) }} />
                                        <label class="form-check-label" htmlFor="withoutProof">
                                            Report without Proofs
                                        </label>
                                    </div>
                                    <div class="form-check pb-5">
                                        <input class="form-check-input" type="radio" name="withOrWithoutProof" id="withProof" onChange={(e) => { setWithProofs(true) }} />
                                        <label class="form-check-label" htmlFor="withProof">
                                            Report with Proofs (All related proofs attached at the end of the report)
                                        </label>
                                    </div>
                                </div>
                            </ShowModal>

                            {selectedYear.length > 0 && <button className='flex items-center justify-center mx-auto gap-2 mt-5 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { setIsModalOpen(true); setForPrintOut(false) }}>
                                <EngineeringRoundedIcon /> Generate CAS Report
                            </button>}
                        </div>
                        :
                        <div className='flex flex-col items-center justify-center mt-3'>
                            {
                                error === null && <CircularProgress />
                            }
                            {
                                error !== null &&
                                <div className='flex flex-col gap-1 items-center justify-center'>
                                    <Alert severity="error"><span className='text-red-600'>{error.message}</span></Alert>
                                    <button className='flex items-center justify-center mx-auto gap-2 mt-5 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { navigate(siteLinks.casReport) }}>
                                        Fill CAS Form
                                    </button>
                                </div>
                            }

                        </div>
                }
            </div>
        </div>
    )
}

export default SelectYear



const SelectYearRadio = ({ sortedYear, selectedYear, setSelectedYear }) => {

    const selectCheckBox = (year) => {


        // Check if the checkbox is checked 
        if (document.getElementById(year).checked) {
            setSelectedYear([...selectedYear, year])
        }
        else {
            setSelectedYear(selectedYear.filter(y => y !== year))
        }


    }
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center mt-2  flex-wrap">
            {sortedYear && sortedYear.map((item) => {

                return (

                    <div className="form-check sm:px-8 py-2" key={JSON.parse(item).casYear}>
                        <input className="form-check-input text-lg border-2 border-blue-500" type="checkbox" value="" id={JSON.parse(item).casYear}
                            onChange={(e) => { selectCheckBox(e.target.id) }} />
                        <label className="form-check-label text-lg text-blue-900 font-bold" htmlFor={JSON.parse(item).casYear}>
                            {JSON.parse(item).casYear}
                        </label>
                    </div>
                )

            })}

        </div >
    )
}

