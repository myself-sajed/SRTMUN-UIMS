import axios from 'axios';
import toast from 'react-hot-toast';

// route available in naac-aqar.js
function fetchAQARTextInfo(filter, isMultiple) {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/fetchAQARTextInfo`
    return axios.post(link, { filter, isMultiple })
}

const saveAQARTextInfo = (formData, refetch) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/saveAQARTextInfo`
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


export { fetchAQARTextInfo, saveAQARTextInfo }