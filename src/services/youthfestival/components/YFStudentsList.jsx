import React from 'react'

const YFStudentsList = ({ students }) => {
    return (
        <div className='border rounded-md p-3'>
            <p className="text-muted text-sm">सर्व विद्यार्थी</p>
            <ul className="max-w-md mt-3">
                {
                    students.map((student) => {
                        return <li className="p-2 m-2 sm:pb-4 bg-blue-50 rounded-md">
                            <StudentInfo student={student} />
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default YFStudentsList


const StudentInfo = ({ student }) => {
    return <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={student?.photoURL} alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
                {student?.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
                <span className="text-medium"><b>{student?.counter}</b> मध्ये भाग घेतला</span>
            </p>
        </div>
    </div>
}


export { StudentInfo }