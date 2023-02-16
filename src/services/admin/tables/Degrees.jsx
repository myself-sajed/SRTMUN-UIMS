import React, { useEffect, useState } from 'react'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'

const Degrees = () => {

    const [data, setData] = useState(null)

    // get all teacher
    useEffect(() => {
        refresh('Degree', setData)
    }, [])



    return (

        <AdminPrototype model="Degree" title="Research Degrees">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Degree</th>
                        <th scope="col">Title</th>
                        <th scope="col">University</th>
                        <th scope="col">Award Year</th>
                        <th scope="col">Proof</th>
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

                                    <td>{item.degreeName}</td>
                                    <td>{item.title}</td>
                                    <td>{item.university}</td>
                                    <td>{item.awardDate}</td>

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

export default Degrees