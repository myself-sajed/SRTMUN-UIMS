import React from 'react'
import { useState } from 'react';

const UploadFile = ({ className = "col-md-6", id, label, setState, required = true , accept= null}) => {
   const HandleChange = (e) => {
    const value = e.target.files[0];
    setState((pri) => {
      return {
        ...pri, [id]: value
      }
    })
  }
  return (
    <div className={`col-12 p-1 ${className}`}>
      <label for="formFile" className="form-label">{label}</label>
      <input className="form-control" accept={accept} required={required} onChange={HandleChange} type="file" id={id} />
    </div>
  )
}

export default UploadFile