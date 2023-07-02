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
        setIsFormOpen && setIsFormOpen(false)
    }
    else if (res.data.status === 'error') {
        toast.error('Failed to add data');
        setLoading(false)
        setModal(false)
        setIsFormOpen && setIsFormOpen(false)
    }
}

const submitWithFile = async (data, url, setState, setLoading, setModal, setIsFormOpen) => {

    // req to server
    const res = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/add/${url}`, data);

    // handleling respose
    if (res.data.status === 'added') {
        setState();
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
        setState();

    }
}


export { submitWithFile }

export default submit
