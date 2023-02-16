import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const PhdAwarded = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('PhdAwarded', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="PhdAwarded" title="Ph.D. Awarded">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-96">Full Name</div></th>
                        <th scope="col"><div className="w-36">Department Name</div></th>
                        <th scope="col"><div className="w-36">Guide Name</div></th>
                        <th scope="col"><div className="w-36">Thesis Title</div></th>
                        <th scope="col"><div className="w-36">Year of Scholar Registration</div></th>
                        <th scope="col"><div className="w-36">Year of PhD Award</div></th>

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


                                    <td>{item.departmentName}</td>
                                    <td>{item.guideName}</td>
                                    <td>{item.thesisTitle}</td>
                                    <td>{item.yearOfScholar}</td>
                                    <td>{item.phdAwardYear}</td>
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

export default PhdAwarded