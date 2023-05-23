import React from 'react'
import { ImageResizer } from '../components/ProfileCroper';
import { toast } from 'react-hot-toast';

const File = ({ setState, title, space }) => {

    const HandleChange = async (e) => {

        const file = e.target.files[0];
        let value = null;
        if (file.size < 1048576) {
          setState(file);
        } else {
          if (
            file.type === "image/jpeg" ||
            file.type === "image/png"
          ) {
            value = await ImageResizer(file);
            if (value === null) {
                toast.error("Unfortunately, the sizereducer is unable to reduce the size of this file. May be it will break the file.");
            }
            console.log(value);
            setState(value);
          } else {
            toast.error("pdf must be less than 1MB");
            setState(null);
          }
        }
      };

    return (
        <div className={space}>
            <label htmlFor="inputGroupFile01" className="form-label">{title}</label>
            <input type="file" name="file" onChange={HandleChange} className="form-control" id="inputGroupFile01" accept="application/pdf,image/jpg,image/png,image/jpeg," />
        </div>
    )
}

export default File