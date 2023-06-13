import React from 'react'
import SchoolsProgram from '../../../components/SchoolsProgram'

const SchoolList = ({ school, setSchool }) => {
    return (
        <div className="p-3 rounded-xl w-1/2">
            <ul className="list-group">
                {
                    Object.keys(SchoolsProgram).map((schoolName, index) => {
                        return <li onClick={() => setSchool(schoolName)} className={`text-blue-600 hover:text-blue-800 cursor-pointer list-group-item d-flex justify-content-between align-items-center ${schoolName === school && 'bg-blue-50'}`}>
                            {schoolName}
                        </li>
                    })
                }

            </ul>
        </div>
    )
}

export default SchoolList
