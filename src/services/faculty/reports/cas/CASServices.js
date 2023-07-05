import Axios from "axios"
import { toast } from 'react-hot-toast'

const generateCASReport = (userData, selectedYear, setReportLoading, forPrintOut) => {
    try {

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/generateCASReport`, { userData, selectedYear, forPrintOut })
            .then(function (res) {
                if (res.data.status === 'generated') {
                    setReportLoading(false)
                    toast.success('Report generated successfully');
                    window.open(`${process.env.REACT_APP_MAIN_URL}/downloadPdf/${res.data.fileName}`, '_blank');
                }
                else if (res.data.status === 'error') {
                    setReportLoading(false)
                    toast.error(res.data.message);
                }
            })
            .catch(function (err) {
                setReportLoading(false)
                toast.error('Something went wrong');
            })

    } catch (error) {
        alert('Internal Server error');
        setReportLoading(false)

    }


}

const getProofs = (userData, selectedYear, setReportLoading, reportType) => {
    try {

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/getProofs`, { userData, selectedYear, reportType })
            .then(function (res) {
                if (res.data.status === 'generated') {
                    setReportLoading(false)
                    toast.success('Proofs fetched successfully');
                    window.open(`${process.env.REACT_APP_MAIN_URL}/downloadPdf/${res.data.fileName}`, '_blank');
                }
                else if (res.data.status === 'error') {
                    setReportLoading(false)
                    toast.error(res.data.message);
                }
            })
            .catch(function (err) {
                setReportLoading(false)
                toast.error('Something went wrong');
            })

    } catch (error) {
        alert('Internal Server error');
    }


}

const saveCASDetails = (casData, userId, setSaveLoader) => {
    try {

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/saveCASDetails`, { casData, userId })
            .then((firstResponse) => {
                if (firstResponse.data) {
                    toast.success('CAS details saved successfully');
                    // window.location = '/home'
                    // navigate('/home')
                    setSaveLoader(false)
                }
                else {
                    toast.error('CAS details saving failed');
                    setSaveLoader(false)
                }
            }).catch((err) => {
                toast.error('CAS details saving failed due to server error');
                setSaveLoader(false)
            })

    } catch (error) {
        alert('Internal Server error');
        setSaveLoader(false)
    }
}

const getCASData = (userId, setData, setError, sortByYear = false, casYear = null, setCasDuration = false, setShouldProceed) => {
    if (setShouldProceed) {
        setShouldProceed(false)
    }
    try {
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/getCASData`, { userId })
            .then((firstResponse) => {
                if (firstResponse.data.status === 'success') {

                    if (setCasDuration) {
                        if (firstResponse.data.data?.casDuration) {
                            setCasDuration(() => JSON.parse(firstResponse.data.data?.casDuration))
                        }
                    }


                    if (sortByYear) {
                        firstResponse.data.data.casData.forEach((cas) => {
                            if (JSON.parse(cas).casYear === casYear) {
                                setData(() => JSON.parse(cas));
                                if (setShouldProceed) {
                                    setShouldProceed(true)
                                }
                            } else {
                                if (setShouldProceed) {
                                    setShouldProceed(true)
                                }
                            }
                        })
                    }
                    else {
                        setData(() => firstResponse.data.data);
                        if (setShouldProceed) {
                            setShouldProceed(true)
                        }
                    }
                }
                else {
                    setData(null)
                    if (setShouldProceed) {
                        setShouldProceed(true)
                    }
                    setError({ error: true, message: 'CAS Data Not Found. Please fill CAS Form to generate report!' })
                }
            }).catch((err) => {
                toast.error('Failed fetching data')
            })
    } catch (error) {
        toast.error('Internal Server error');
    }
}

const getTotalCASData = (setData, setError) => {
    try {
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/getTotalCASData`,)
            .then((firstResponse) => {
                if (firstResponse.data.status === 'success') {
                    setData(firstResponse.data.data);
                }
                else {
                    setData(null)
                    setError({ error: true, message: 'CAS Data Not Found. Please fill CAS Form to generate report!' })
                }
            }).catch((err) => {
                toast.error('Failed fetching data')
            })
    } catch (error) {
        toast.error('Internal Server error');
    }
}

const saveEligibilityData = (stageNumber, userId, eligibilityData) => {
    try {

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/saveEligibilityData`, { stageNumber, userId, eligibilityData })
            .then((firstResponse) => {
                if (firstResponse.data) {
                    toast.success('CAS details saved successfully');
                }
                else {
                    toast.error('CAS details saving failed');
                }
            }).catch((err) => {
                toast.error('CAS details saving failed due to server error');
            })

    } catch (error) {
        alert('Internal Server error');
    }
}


export { saveCASDetails, generateCASReport, getCASData, saveEligibilityData, getTotalCASData, getProofs }
