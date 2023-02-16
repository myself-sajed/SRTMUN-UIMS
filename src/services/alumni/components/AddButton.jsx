import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

export default function AddButton(props) {
    const [data, setData] = useState(null);
    const clickd = (e) => {
        props.onclick(true)
    }
    return (
        <div style={{ display: "flex", width: "100%", background: "transparent", borderRadius: "10px", margin: "auto" }} >

            <div style={{
                display: 'flex', justifyContent: "space-between", width: "100%", margin: "2px 0", background: "#efeffa", padding: "8px 4px",
                borderRadius: "10px"
            }}>
                <p style={{ display: "flex", alignItems: "center", paddingLeft: "20px", fontSize: "20px", fontWeight: "600", color: "#5e8960" }}></p>
                <Button onClick={clickd} startIcon={<AddIcon />} size="large" variant="contained" color="success" style={{ height: 40, backgroundColor: "#759b77", marginRight: 20 }}>Add</Button>
            </div>
        </div>
    )
}