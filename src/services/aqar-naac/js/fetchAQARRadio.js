import axios from 'axios';
import toast from 'react-hot-toast';

// route available in naac-aqar.js
function fetchAQARRadioInfo(filter, isMultiple) {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/fetchAQARRadioInfo`
    return axios.post(link, { filter, isMultiple })
}

const saveAQARRadioInfo = (formData, refetch) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/saveAQARRadioInfo`
    axios.post(link, { formData }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed saving data...')
            refetch()
        }
    }).catch((err) => {
        console.log('Error saving in data', err)
    })
}


export { saveAQARRadioInfo, fetchAQARRadioInfo }