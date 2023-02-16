import React from 'react'

const AdminTeacherQualification = () => {
    return (
        <div className="dashboard mt-2 w-full">
            <p className='font-bold text-2xl text-gray-700'>Teachers Qualifications</p>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Degrees</th>
                        <th scope="col">Title</th>
                        <th scope="col">University</th>
                        <th scope="col">Award Date</th>
                        <th scope="col">Award Letter</th>
                        <th scope="col">Teacher Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Shaikh Sajed Ahmed</td>
                        <td>PhD</td>
                        <td>Pattern Recognition and Machine Learning</td>
                        <td>SRTM</td>
                        <td>10/01/2017</td>
                        <td className='text-blue-600 hover:text-blue-800 cursor-pointer'>View Letter</td>
                        <td className='text-blue-600 hover:text-blue-800 cursor-pointer'>View Details</td>
                    </tr>


                </tbody>
            </table>
        </div>
    )
}

export default AdminTeacherQualification