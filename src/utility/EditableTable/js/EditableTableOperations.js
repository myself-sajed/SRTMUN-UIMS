import Axios from 'axios'
import toast from 'react-hot-toast'

const upsertRecord = async (data, refetch) => {

    try {
        const link = `${process.env.REACT_APP_MAIN_URL}/api/upsertRecord`
        const res = await Axios.post(link, data)
        if (res.data.status === 'success') {
            toast.success(res.data.message)
            refetch()
            return 200
        } else {
            toast.error('Record insertion failed')
            return 500
        }
    } catch (error) {
        toast.error('Something went wrong')
        return 500
    }
}

const deleteRecord = async (item, model, refreshFunction, setIsLoading = () => { }) => {
    try {
        const res = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/service/deleteItem`, { itemToDelete: item, model })


        if (res.data.status === 'deleted') {
            toast.success('Item deleted successfully')
            if (refreshFunction) {
                refreshFunction()
            }
            setIsLoading(false)
        }
        else if (res.data.status === 'error') {
            toast.error('Could not delete item')
            if (refreshFunction) {
                refreshFunction()
            }
            setIsLoading(false)
        }

    } catch (error) {
        setIsLoading(false)
        toast.error('Internal Server error')
        console.log(error)
    }
}

export { upsertRecord, deleteRecord }