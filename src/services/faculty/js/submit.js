import Axios from 'axios';
import toast from 'react-hot-toast';


const submit = async (data, url, setState, setLoading, setModal, setIsFormOpen) => {
    // req to server
    const res = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/add/${url}`, { data });

    // handleling respose
    if (res.data.status === 'added') {
        setState(res.data.data);
        toast.success('Data added successfully');
        setLoading(false)
        setModal(false)
        setIsFormOpen(false)
    }
    else if (res.data.status === 'error') {
        toast.error('Failed to add data');
        setLoading(false)
        setModal(false)
        setIsFormOpen(false)
    }
}

const submitWithFile = async (data, url, setState, setLoading, setModal, setIsFormOpen) => {
    console.log(...data, url)

    // req to server
    const res = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/add/${url}`, data);

    // handleling respose
    if (res.data.status === 'added') {
        console.log("I am called with " + res.data.data)
        setState();
        toast.success('Data added successfully');
        console.log('Stopped')
        setLoading(false)
        setModal(false)
        setIsFormOpen(false)
    }
    else if (res.data.status === 'error') {
        toast.error('Failed to add data');
        setLoading(false)
        setModal(false)
        setIsFormOpen(false)

    }
}


export { submitWithFile }

export default submit
