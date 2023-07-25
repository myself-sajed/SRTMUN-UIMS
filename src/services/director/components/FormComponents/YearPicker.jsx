import { useEffect,useState } from "react";

 function YearPicker() {

    const [YearPicker, setYearPicker] = useState([])
  
    useEffect(() => {
        let year = new Date().getFullYear()
        let ly = year - 25;
        let i= 1
        let arr = []
        for (year; year >= ly; year--) {
            const obj = {
                id: [i],
                value: year
            }
            arr.push(obj)
            i++
        }
        setYearPicker(arr)
    },[])
    return YearPicker;
}
export default YearPicker