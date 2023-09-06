import React, { useEffect, useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { CircularProgress, IconButton } from '@mui/material';
import { useQuery } from 'react-query';
import GetReq from '../components/requestComponents/getReq';

const Test = ({model, module, filter, tableObj }) => {

  const params = { model, id: '', module, filter };
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => GetReq(params))
    let emptyfilds = {};
    useEffect(()=>{
        Object.keys(tableObj).forEach(key => {
          emptyfilds[key] = "";
        });

    },[])
    const [Data, setData] = useState(data?.data);
    const [editMode, setEditMode] = useState(true); // State to track edit mode
    const [editedIndex, setEditedIndex] = useState(0); // Index of the row being edited

    console.log('Data:', Data)

    const handleAddRow = () => {
        setData([...Data, emptyfilds]);
        handleEditRow(Data.length);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedData = [...Data];
        updatedData[index][name] = value;
        setData(updatedData);
    };

    const handleEditRow = (index) => {
        setEditMode(true);
        setEditedIndex(index);
    };

    const handleSaveRow = () => {
        setEditMode(false);
        setEditedIndex(-1);
    };

    const handleDeleteRow = (index) => {
        const updatedData = [...Data];
        updatedData.splice(index, 1);
        setData(updatedData);
    };

    return (
        <div>
            {
            isLoading? 
            <CircularProgress size={23}/>:<>
            <table className="table mt-5 table-bordered">
                <thead className="bg-primary text-light">
                    <tr>
                        {
                            Object.values(tableObj).map((e,i)=>{
                                return(<th key={e+i}>{e}</th>)
                            })
                        }
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Data?.map((element, index) => (
                        <tr key={index}>
                            {
                                Object.keys(tableObj).map((tds)=>{
                                    // console.log(element[tds]);
                                    return(
                                        <td key={tds+index}>
                                {editMode && editedIndex === index ? (
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        name={tds}
                                        value={element[tds]}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    element[tds]
                                )}
                            </td>
                                    )
                                })
                            }
                            <td>
                                {editMode && editedIndex === index ? (
                                    <SaveButton handleSaveRow={handleSaveRow} />
                                ) : (
                                    <Actions index={index} handleDeleteRow={handleDeleteRow} handleEditRow={handleEditRow} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleAddRow} type="button" class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                <AddRoundedIcon />
                Add Row
            </button></>
            }
        </div>
    );
};

export default Test;

const Actions = ({ index, handleEditRow, handleDeleteRow }) => {
    return <div className="flex items-center gap-2">

        <IconButton onClick={() => handleEditRow(index)}>
            <EditRoundedIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteRow(index)}>
            <DeleteRoundedIcon />
        </IconButton>
    </div>
}

const SaveButton = ({ handleSaveRow }) => {
    return <button onClick={handleSaveRow} type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white gap-2 bg-blue-700 rounded-lg hover:bg-blue-800 ">
        <SaveRoundedIcon />
        Save Details
    </button>
}