import React, { useState } from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Axios from 'axios'
import toast from 'react-hot-toast';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Popconfirm } from 'antd';


const Actions = ({ item, model, refreshFunction, addState, editState, pencilClick }) => {

    const [isLoading, setIsLoading] = useState(false)

    async function handelDelete() {
        setIsLoading(true)
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/service/deleteItem`, { itemToDelete: item, model })
            .then((res) => {
                !res && toast.error('Something went wrong')

                if (res.data.status === 'deleted') {
                    console.log(res.data.status)
                    toast.success('Item deleted successfully')
                    refreshFunction()
                    setIsLoading(false)
                    console.log('after refreshFunction')

                }
                else if (res.data.status === 'error') {
                    toast.error('Could not delete item. Try again later')
                    setIsLoading(false)
                }
            }).catch(() => {
                toast.error('Internal Server Error')
                setIsLoading(false)
            })
    }

    return (
        <div className>
            {/* // EDIT */}
            <button >
                <Tooltip title="Edit" placement="right">
                    <IconButton onClick={() => { editState(true); addState(false); pencilClick() }}>
                        <EditRoundedIcon />
                    </IconButton>
                </Tooltip>
            </button>


            {/* // DELETE */}
            <button >


                {
                    !isLoading ?

                        <Popconfirm
                            title="Do you want to delete this item?"
                            onConfirm={handelDelete}
                            onCancel={() => { }}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ "type": "default" }}>
                            <Tooltip title="Delete" placement="right">
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </Popconfirm>
                        :
                        <IconButton>
                            <CircularProgress color="inherit" size={25} />
                        </IconButton>

                }
            </button>
        </div>
    )
}

export default Actions