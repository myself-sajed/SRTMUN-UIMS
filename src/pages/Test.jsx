import React, { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { IconButton } from '@mui/material';

const Test = () => {
    const [students, setStudents] = useState([
        { name: '', class: '', course: '', rollNo: '' },
    ]);
    const [editMode, setEditMode] = useState(true); // State to track edit mode
    const [editedIndex, setEditedIndex] = useState(-1); // Index of the row being edited

    console.log('students:', students)

    const handleAddRow = () => {
        setStudents([...students, { name: '', class: '', course: '', rollNo: '' }]);
        handleEditRow(students.length)

    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedStudents = [...students];
        updatedStudents[index][name] = value;
        setStudents(updatedStudents);
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
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
    };

    return (
        <div>
            <table className="table mt-5 table-bordered">
                <thead className="bg-primary text-light">
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Course</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>
                                {editMode && editedIndex === index ? (
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        name="name"
                                        value={student.name}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    student.name
                                )}
                            </td>
                            <td>
                                {editMode && editedIndex === index ? (
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        name="class"
                                        value={student.class}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    student.class
                                )}
                            </td>
                            <td>
                                {editMode && editedIndex === index ? (
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        name="course"
                                        value={student.course}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    student.course
                                )}
                            </td>
                            <td>
                                {editMode && editedIndex === index ? (
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        name="rollNo"
                                        value={student.rollNo}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    student.rollNo
                                )}
                            </td>
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
            </button>
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