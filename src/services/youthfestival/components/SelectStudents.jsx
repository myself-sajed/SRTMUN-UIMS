import React, { useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import { StudentInfo } from './YFStudentsList'

const SelectStudents = ({ isModalOpen, setIsModalOpen, compDetails, setCompDetails, onSubmit, onCancel, students, setSelectedStudents, selectedStudents }) => {


    const handleCheckboxChange = (id) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents((prevIds) => prevIds.filter((prevId) => prevId !== id));
        } else {
            setSelectedStudents((prevIds) => [...prevIds, id]);
        }
    };


    return (
        <div>
            <DialogBox title={compDetails?.competitionName ? `${compDetails?.competitionName}साठीचे विद्यार्थी निवडा ` : ''} buttonName="Submit" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="sm">
                <div className="mb-2 p-2 border rounded-md">
                    <p>{compDetails?.competitionName}साठी निवडलेल्या विद्यार्थ्यांची संख्या : <span className="mx-1 font-bold">{selectedStudents?.length ? selectedStudents.length : 0}</span></p>
                </div>
                <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">

                    {
                        students.map((student, i) => {
                            return <li class={`w-full ${i !== students?.length - 1 && "border-b"} border-gray-200 rounded-t-lg p-2`}>
                                <div class="flex items-center gap-3">
                                    <input onChange={() => handleCheckboxChange(student?._id)} id={student?._id} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                                    <label className="cursor-pointer" htmlFor={student?._id}>
                                        <StudentInfo student={student} />
                                    </label>
                                </div>
                            </li>
                        })
                    }



                </ul>
            </DialogBox>
        </div>
    )
}

export default SelectStudents
