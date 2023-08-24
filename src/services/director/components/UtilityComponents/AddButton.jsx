import React, { useEffect, useState } from 'react'
import navcom from './navcom'
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import TableTitle from './TableTitle';
import AcadmicYearSelect from '../../../admin/components/AcadmicYearSelect';

export default function AddButton({ title, onclick, exceldialog, yearFilter, setState, filterByAcademicYear, customName = false }) {
    const DirectorActive = useSelector(state => state.directorActive.directorActive)
    const clickd = () => {
        onclick(true)
    }
    const excelClicked = () => {
        exceldialog(true)
    }
    const [data, setData] = useState(null)

    useEffect(() => {
        if (window.location.pathname === '/director/sdm') {
            navcom.forEach((item) => {
                if (item.name === DirectorActive) {
                    setData(item)
                }
            })
        }
    }, [DirectorActive])


    return (

        <div>
            <div>
                <TableTitle title={title} excelClicked={excelClicked} clickd={clickd} customName={customName} />
            </div>
            <div style={{ display: "flex", width: "100%", background: `${data?.instruction.length > 0 ? '#ebebeb' : 'white'}`, borderRadius: "10px", margin: "auto" }} >
                <div className={`${data?.instruction.length > 0 ? 'text-gray-800 p-2 rounded-md ' : 'white'}`} style={{ width: "70%" }}>
                    {data?.instruction === [] ? null : data?.instruction.map((e, index) => {
                        return <p key={index} className='md:text-sm text-xs'>{e}</p>
                    })}
                </div>
            </div>
            {
                !filterByAcademicYear && <div className='text-sm' style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                    <AcadmicYearSelect className="col-md-3 col-lg-3 col-12" value={yearFilter} setState={setState} id="yearFilter" label="Filter by Academic Year" />
                </div>
            }

        </div>

    )
}