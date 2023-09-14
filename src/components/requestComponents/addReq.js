import axios from "axios";
import toast from "react-hot-toast";

const addReq = ( valuesNC, path, initialstate, values, setState, refetch, setOpen, setLoading, user, array=null ) => {
  // console.log(valuesNC);
  setLoading(true)
  let formData = new FormData();
  Object.keys(values).map((key) => {
    formData.append(key, values[key]);
  });
  Object.keys(valuesNC).map((key) => {
    formData.append(key, valuesNC[key]);
  })

  if (array !== null){
      let arrayname = Object.keys(array)[0];
    for(let i = 0; i < array[arrayname].length; i++) {
      formData.append(`${Object.keys(array)[0]}`, array[arrayname][i]);
    }
  }

  axios
    .post(`${process.env.REACT_APP_MAIN_URL}/${user}/newRecord/${path}`, formData)
    .then((res) => {
      const status = res.status;
      if (!status) {
        toast.error("Entry Faild!");
      } else if (status === 201) {
        toast.success(res.data);
        refetch();
        setState(initialstate);
        setOpen(false);
        setLoading(false);
      } else if (status === 500) {
        toast.error(res.data);
        setLoading(false);
      } else {
        toast.error("Something wrong");
      }
    })
    .catch((error) => {
    //   console.log(error);
      toast.error(error.response.statusText);
      setLoading(false);
    });
};
export default addReq;