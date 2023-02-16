import { toast } from "react-hot-toast";
import Axios from "axios"

function editProfile (dispatch, setState, data, filter, modelName){

    
    // check the backend in faculty-routes/services
    Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/edit-profile/${modelName}/${JSON.stringify(filter)}`, data).then(function (response) {
        if (response.data.status === 'edited') {
            dispatch(setState(response.data.data))
            toast.success('Profile Updated Successfully')
        }
        else {
            toast.error('Could not edit profile, try again...');
            return
        }
    }).catch(function (err) {
        toast.error('Something went wrong');
        return
    })
}

export default editProfile