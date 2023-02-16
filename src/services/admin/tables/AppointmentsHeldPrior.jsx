import React, { useEffect, useState } from 'react'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'

const AppointmentsHeldPrior = () => {

    const [data, setData] = useState(null)

    // get all teacher
    useEffect(() => {
        refresh('AppointmentsHeldPrior', setData)
    }, [])



    return (

        <AdminPrototype model="AppointmentsHeldPrior" title="Appointments held prior to joining this institute">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-72">Full Name</div></th>

                        <th scope="col">Designation</th>
                        <th scope="col">Employer Name</th>
                        <th scope="col">Joining Date</th>
                        <th scope="col">Leaving Date </th>
                        <th scope="col">Salary with Grade</th>
                        <th scope="col">Leaving Reason</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.sort(function (a, b) {
                            var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                            return dateB - dateA;
                        }).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.userId.salutation} {item.userId.name}</td>

                                    <td>{item.designation}</td>
                                    <td>{item.employerName}</td>
                                    <td>{item.joiningDate}</td>
                                    <td>{item.leavingDate}</td>
                                    <td>{item.salaryWithGrade}</td>
                                    <td>{item.leavingReason}</td>


                                </tr>

                            )
                        })
                    }


                </tbody>

            </>

        </AdminPrototype>
    )
}

export default AppointmentsHeldPrior