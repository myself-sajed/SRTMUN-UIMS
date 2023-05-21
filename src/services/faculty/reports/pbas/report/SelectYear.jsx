import React, { useEffect, useState } from 'react'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Alert, CircularProgress } from '@mui/material';
import { generateCASReport } from '../PBASServices';
import { useNavigate } from 'react-router-dom';
import ShowModal from '../../../../../components/ShowModal';

const SelectYear = ({ casYear, casData, userData, setReportLoading, error }) => {
    const [selectedYear, setSelectedYear] = useState([])
    let sortedYear = casYear && casYear.sort((a, b) => {
        return parseInt(JSON.parse(a).casYear.slice(0, 4)) - parseInt(JSON.parse(b).casYear.slice(0, 4));
    })
    const navigate = useNavigate()
    const [forPrintOut, setForPrintOut] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleGeneration = () => {
        setReportLoading(true);
        generateCASReport(casData, userData, selectedYear, setReportLoading, forPrintOut)
    }

    useEffect(() => {
        console.log('For Print out :', forPrintOut)
    }, [forPrintOut])

    return (
        <div>

            <div className='bg-blue-100 rounded-xl py-5 mt-4 sm:w-[80%] md:w-[50%] w-full sm:mx-auto'>
                {
                    sortedYear ?
                        <div>
                            <p className='text-base md:text-lg text-center'>Select Year(s) of which PBAS Report to be generated</p>
                            <p className='text-center text-blue-900 text-xs md:text-sm'>Click on the respective year to select, click again to unselect.</p>
                            <div className='flex items-center justify-center gap-3 mt-3'>

                                <SelectYearRadio sortedYear={sortedYear} setSelectedYear={setSelectedYear} selectedYear={selectedYear} />

                            </div>

                            <ShowModal okText={"Generate Report"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Choose report type" onOkFunc={handleGeneration}>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked onClick={(e) => { setForPrintOut(false) }} />
                                    <label class="form-check-label" htmlFor="flexRadioDefault1">
                                        Standard Report
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e) => { setForPrintOut(true) }} />
                                    <label class="form-check-label" htmlFor="flexRadioDefault2">
                                        Printable Report (Specially designed for printing purposes)
                                    </label>
                                </div>
                            </ShowModal>

                            {selectedYear.length > 0 && <button className='flex items-center justify-center mx-auto gap-2 mt-5 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { setIsModalOpen(true); setForPrintOut(false) }}>
                                <EngineeringRoundedIcon /> Generate PBAS Report
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
                                    <button className='flex items-center justify-center mx-auto gap-2 mt-5 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { navigate('/service/pbas-report') }}>
                                        Fill PBAS Form
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
                        <input className="form-check-input text-lg" type="checkbox" value="" id={JSON.parse(item).casYear}
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

