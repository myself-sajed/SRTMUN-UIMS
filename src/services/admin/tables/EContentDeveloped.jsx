import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'

const EContentDeveloped = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('EContentDeveloped', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="EContentDeveloped" title="E-Content Developed">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-72">Full Name</div></th>
                        <th scope="col">Name of the Module / Course developed</th>
                        <th scope="col">Platform on which the module was developed</th>
                        <th scope="col">Year</th>
                        <th scope="col">Link to the content</th>
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

                                    <td>{item.moduleName}</td>
                                    <td>{item.platform}</td>
                                    <td>{item.year}</td>
                                    <td><a href={item.link} className="text-blue-700">Go to Link</a></td>


                                </tr>

                            )
                        })
                    }


                </tbody>

            </>

        </AdminPrototype>
    )
}

export default EContentDeveloped