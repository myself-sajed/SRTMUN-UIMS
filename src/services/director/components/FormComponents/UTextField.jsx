import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormHelperText from '@mui/material/FormHelperText';


function UTextField(props) {
   const [fileName, setFileName] = useState("");
   const HandleChange = (e) => {
      const filename = e.target.files[0];
      const value = filename
      const id = props.id
      props.onch((pri) => {
         return {
           ...pri, [id]: value
         }
       })
      setFileName(e.target.files[0].name)
   }

   return (
      <>
         <Grid item p={2} style={{ display:"flex", flexDirection:"column"}}>
            <Button
               variant="contained"
               component="label"
               disabled={props.dis}
               startIcon={<CloudUploadIcon />}
               sx={{ width: 290, fontSize: 14, backgroundColor: "#5591cc" }}>
               {props.label}
               <TextField
                  hidden
                  id={props.id}
                  label={props.label}
                  type="file"
                  required={props.required}
                  size="large"
                  variant="standard"
                  onChange={HandleChange} />
            </Button><p style={{display:"flex",justifyContent:"center"}}>{fileName}</p>
            <FormHelperText sx={{color:"#375a39"}}>{ !props.required ? "If you want to change old file select a file else leave" : "" }</FormHelperText>
         </Grid>
      </>
   )
}
export default UTextField;
