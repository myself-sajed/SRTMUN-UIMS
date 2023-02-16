import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const Lectures = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('Lectures', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="Lectures" title="Lectures, Seminars, Tutorials and Practicals">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-96">Full Name</div></th>

                        <th scope="col">Course/Paper</th>
                        <th scope="col">Level</th>
                        <th scope="col">Teaching Mode</th>
                        <th scope="col"><div className="w-56">No of classes alloted per week</div></th>
                        <th scope="col"><div className="w-56">% of classes taken as per documented record</div></th>
                        <th scope="col"><div className="w-20">Year</div></th>


                        <th scope="col">Uploaded Proof</th>

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

                                    <td>{item.course}</td>
                                    <td>{item.level}</td>
                                    <td>{item.teachingMode}</td>
                                    <td>{item.noOfClasses}</td>
                                    <td>{item.percentageOfClasses}</td>
                                    <td>{item.year}</td>

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

export default Lectures