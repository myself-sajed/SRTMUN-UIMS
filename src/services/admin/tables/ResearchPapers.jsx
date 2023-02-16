import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const ResearchPaper = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('ResearchPaper', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="ResearchPaper" title="Research Papers">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-96">Full Name</div></th>

                        <th scope="col">Paper Title</th>
                        <th scope="col">Teacher Department</th>
                        <th scope="col">Journal Name</th>
                        <th scope="col">Publication Year</th>
                        <th scope="col">ISSN Number</th>
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


                                    <td>{item.paperTitle}</td>
                                    <td>{item.teacherDepartment}</td>
                                    <td>{item.journalName}</td>
                                    <td>{item.publicationYear}</td>
                                    <td>{item.issnNumber}</td>


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

export default ResearchPaper