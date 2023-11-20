import Axios from 'axios'
import toast from 'react-hot-toast'

// route available in krc-routes.js
const uploadSupportingDocument = (formData, refetch) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/uploadSupportingProof`
    Axios.post(link, formData).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed uploading file...')
            refetch()
        }
    }).catch((err) => {
        console.log('Error in supporting document upload', err)
        refetch()
    })
}


const fetchSupportingDocuments = (filter) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/fetchSupportingProof`
    return Axios.post(link, { filter })
}

export default uploadSupportingDocument
export { fetchSupportingDocuments }