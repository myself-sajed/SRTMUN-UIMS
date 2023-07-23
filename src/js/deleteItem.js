import Axios from 'axios'
import { toast } from 'react-hot-toast'

async function deleteItem(itemToDelete, callback, setLoading) {
    setLoading(true)

    const url = `${process.env.REACT_APP_MAIN_URL}/api/deleteFile`
    Axios.post(url, { fileName: itemToDelete.fileName, path: itemToDelete.path })
        .then((res) => {
            if (res.data.status === 'deleted') {
                callback()
                toast.success('File deleted successfully')
                setLoading(false)
            } else {
                setLoading(false)
                console.log('Could delete the item, because file not found')
            }
        })


}

export { deleteItem }