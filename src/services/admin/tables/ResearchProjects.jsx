import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const ResearchProjects = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('ResearchProject', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="ResearchProject" title="Research Projects">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-96">Full Name</div></th>

                        <th scope="col"><div className='w-44'>Scheme/Project Name</div></th>
                        <th scope="col"><div className='w-44'>Program Title</div></th>
                        <th scope="col"><div className='w-44'>Principal Invigilator Name</div></th>
                        <th scope="col"><div className='w-44'>Funding Agency Name</div></th>
                        <th scope="col">Government/Non-Government</th>
                        <th scope="col">Department</th>
                        <th scope="col">Award Year</th>
                        <th scope="col"><div className='w-44'>Provided Funds (INR)</div></th>
                        <th scope="col">Project Duration</th>


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


                                    <td>{item.schemeName}</td>
                                    <td>{item.programTitle}</td>
                                    <td>{item.principalName}</td>
                                    <td>{item.fundingName}</td>
                                    <td>{item.isGov}</td>
                                    <td>{item.department}</td>
                                    <td>{item.awardYear}</td>
                                    <td>{item.providedFunds}</td>
                                    <td>{item.projectDuration}</td>


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

export default ResearchProjects