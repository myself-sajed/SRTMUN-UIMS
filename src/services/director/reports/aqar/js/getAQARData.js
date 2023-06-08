import Axios from 'axios'
import { toast } from 'react-hot-toast';

const getAQARData = (setData, getByYear, filter, aqarYear, userType = 'faculty') => {
    console.log('getting...')
    const link = `${process.env.REACT_APP_MAIN_URL}/service/${userType}/report/aqar/getData`;

    Axios.post(link, { filter })
        .then((res) => {
            if (res.data.status === 'success') {
                if (getByYear) {
                    res.data.data.aqarData.forEach((aqar) => {
                        if (JSON.parse(aqar).aqarYear === aqarYear) {
                            setData(JSON.parse(aqar));
                        }
                    })
                }
                else {
                    setData(res.data.data);
                }
            }
            else {
                setData(null)
            }
        }).catch((err) => {
            toast.error('Failed fetching data')
        })
}


export default getAQARData

