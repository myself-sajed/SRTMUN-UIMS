import Axios from 'axios'
import toast from 'react-hot-toast'

function handleEditWithFile(data, model, setModal, refresh, setLoading, setFormOpen, isCAS = false) {

    toast.success('Updating... Please wait.')

    console.log('Data :', [...data])

    const url = `${process.env.REACT_APP_MAIN_URL}/api/edit/${model}`

    Axios.post(url, data).then((res) => {
        if (res.data.status === 'deleted') {
            toast.success('Item edited successfully')
            setLoading(false)
            setModal(false)
            if (!isCAS) {
                setFormOpen(false)
            }
            refresh()
        }
        else {
            setLoading(false)
            if (!isCAS) {
                setFormOpen(false)
            }
            setModal(false)
            refresh()
        }
    }).catch((err) => {
        console.log('err', err)
        if (!isCAS) {
            setFormOpen(false)
        }
        setLoading(false)
        setModal(false)
        toast.error('Server error')
        refresh()

    })

}

export default handleEditWithFile