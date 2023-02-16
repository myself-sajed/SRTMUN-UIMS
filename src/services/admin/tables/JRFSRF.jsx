import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const JRFSRF = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('JrfSrf', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="JrfSrf" title="JRF, SRF, Post Doctoral Fellows, Research Associates">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-72">Full Name</div></th>
                        <th scope="col"><div className="w-32">Enrolment Year</div></th>
                        <th scope="col">Fellowship Duration</th>
                        <th scope="col">Fellowship Type</th>
                        <th scope="col"><div className="w-54">Granting Agency</div></th>
                        <th scope="col"><div className="w-28">Qualifying Exam (if any)</div></th>
                        <th scope="col"><div className="w-28">Year</div></th>



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


                                    <td>{item.enrolmentYear}</td>
                                    <td>{item.fellowshipDuration}</td>
                                    <td>{item.fellowshipType}</td>
                                    <td>{item.grantingAgency}</td>
                                    <td>{item.qualifyingExam}</td>
                                    <td>{item.year}</td>
                                    <View proof={item.proof} />



                                </tr>

                            )
                        })
                    }


                </tbody>

            </>

        </AdminPrototype >
    )
}

export default JRFSRF