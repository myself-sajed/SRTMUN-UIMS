import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const Conference = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('ConferenceOrganized', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="ConferenceOrganized" title="Conference Organized / Workshops / Seminar Organized">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-52">Full Name</div></th>

                        <th scope="col">Program Title</th>
                        <th scope="col">School Name</th>
                        <th scope="col">Funded By</th>
                        <th scope="col">National or International</th>
                        <th scope="col">No of Participants</th>

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


                                    <td>{item.programTitle}</td>
                                    <td>{item.schoolName}</td>
                                    <td>{item.fundedBy}</td>
                                    <td>{item.isNational}</td>
                                    <td>{item.noOfParticipants}</td>

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

export default Conference