import axios from "axios";

const getReq = ({model, id, module, filter=null, filterConditios=null}) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/${module}/getData`,
      { model, id, filter, filterConditios })
}
export default getReq;