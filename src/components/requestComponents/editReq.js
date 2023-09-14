import axios from "axios";
import toast from "react-hot-toast";

const editReq = ( valuesNC, path, initialstate, values, setValues,refetch, setOpen, setEdit, setItemToEdit,setLoading, user, array=null ) => {

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
    .post(`${process.env.REACT_APP_MAIN_URL}/${user}/editRecord/${path}`, formData)
    .then((res) => {
      const data = res.status;
      if (!data) {
        toast.error("Entry Faild!");
      } else if (data == 200) {
        toast.success(res.data);
        setValues(initialstate);
        setOpen(false);
        setEdit(false);
        setLoading(false);
        refetch();
        setItemToEdit(null);
        
      } else {
        toast.error("Something wrong");
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.statusText);
    });
};
export default editReq;
