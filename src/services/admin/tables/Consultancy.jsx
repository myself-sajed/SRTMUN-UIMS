import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const Consultancy = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('ConsultancyServices', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="ConsultancyServices" title="Consultancy Services">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Consultant Name</th>
                        <th scope="col">Consultancy Project Name</th>
                        <th scope="col">Consulting / Sponsoring Agency with contact</th>
                        <th scope="col">Consultancy Year</th>
                        <th scope="col">Revenue Generated(INR)</th>
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


                                    <td>{item.cProjectName}</td>
                                    <td>{item.cAgency}</td>
                                    <td>{item.cYear}</td>
                                    <td>{item.revenue}</td>
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

export default Consultancy