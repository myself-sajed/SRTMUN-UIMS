import React, { useEffect, useState } from 'react'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'

const PostHeldAppointment = () => {

    const [data, setData] = useState(null)

    // get all teacher
    useEffect(() => {
        refresh('PostHeld', setData)
    }, [])



    return (

        <AdminPrototype model="PostHeld" title="Posts held after appointments at this institution">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-72">Full Name</div></th>

                        <th scope="col">Designation</th>
                        <th scope="col">Department</th>
                        <th scope="col">Joining Date</th>
                        <th scope="col">Leaving Date </th>
                        <th scope="col">Appointment Order / CAS Promotion</th>
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
                                    <td>{item.department}</td>
                                    <td>{item.joiningDate}</td>
                                    <td>{item.leavingDate}</td>
                                    <View proof={item.proof} />


                                </tr>

                            )
                        })
                    }


                </tbody>

            </>

        </AdminPrototype>
    )
}

export default PostHeldAppointment