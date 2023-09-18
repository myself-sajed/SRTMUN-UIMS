import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import { TableCell, IconButton } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function TblEditDelete(Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  //--------------Delete Record-----------------
  const deleteRecord = async (id, model) => {
    if (Props.customDelete) {
      Props.customDelete(id, Props.fatchdata);
    } else {
      setIsDeleting(true)
      axios.post(`${process.env.REACT_APP_MAIN_URL}/${Props?.module}/deleteRecord`, { model, id }).then(response => {
        if (!response) {
          toast.error("Something wrong!")
        } else {
          toast.success(response.data)
          Props.fatchdata()
          setIsDeleting(false)
        }
      }).catch(err => {
        console.log(err);
        setIsDeleting(false)
      });
    }
  }

  const chackHandler = (e) => {
    if (e.target.checked === true) {
      Props.setCheckedData(pri => [...pri, e.target.value])
    }
    else if (e.target.checked === false) {
      Props.setCheckedData(Props.checkedData.filter(value => value !== e.target.value))
    }
  }

  return (
    <TableCell sx={{ fontSize: "12px" }}>
      {
        Props.CheckBox == true ? <input className='form-check-input' style={{ margin: '5px' }} type="checkbox" checked={Props.checkedData.includes(Props.val) ? true : false} onChange={(e) => { chackHandler(e) }} value={Props.val} /> : ""
      }
      {
        Props.EditDisabled == true ? "" : <IconButton onClick={() => Props.setItemToEdit(Props.val)} sx={{ color: "primary" }}>
          {Props?.editIcon == "Active" ? <CheckCircleOutlineIcon sx={{ color: "#33a733" }} /> : Props?.editIcon == "InActive" ? <CancelOutlinedIcon sx={{ color: "#c75d5d" }} /> : <EditIcon />}
        </IconButton>
      }
      {
        Props.deleteDisabled == true ? "" : <Popconfirm placement="topRight" title={"Do you want to delete this record?"} onConfirm={() => deleteRecord(Props.val, Props.loc)} okText="Yes, Delete" cancelText="Cancel" okButtonProps={{ "type": "default" }}>
          <IconButton>{isDeleting ? <DeleteOutlineIcon sx={{ color: "gray" }} /> : <DeleteOutlineIcon sx={{ color: "#c75d5d" }} />}</IconButton>
        </Popconfirm>
      }
    </TableCell>
  )
}


