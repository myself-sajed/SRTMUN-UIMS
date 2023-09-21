import toast from "react-hot-toast"
import Axios from 'axios'

function editYFProfile(data, user, setData, setOpen) {
    const link = `${process.env.REACT_APP_MAIN_URL}/youthfestival/editProfile`
    Axios.post(link, { data, user }).then((res) => {
        if (res.data.status === 'success') {
            setData(res.data.data)
            toast.success('Successfully Updated college details')
            setOpen(false);
        } else {
            toast.error('Failed updating...')
            setOpen(false);
        }
    }).catch((err) => {
        setOpen(false);
        console.log('Something went wrong')
    })
}

export default editYFProfile