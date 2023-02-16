import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const ResearchGuidance = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('ResearchGuidance', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="ResearchGuidance" title="Research Guidance">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-96">Full Name</div></th>


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

export default ResearchGuidance