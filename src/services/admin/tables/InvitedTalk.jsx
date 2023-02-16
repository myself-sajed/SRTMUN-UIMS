import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const InvitedTalk = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('InvitedTalk', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="InvitedTalk" title="Invited Talk / Resource Person">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-52">Full Name</div></th>

                        <th scope="col">Title of Lecture/Academic Session</th>
                        <th scope="col">Title of Seminar, etc.</th>
                        <th scope="col">Organized by </th>
                        <th scope="col">National or International</th>

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


                                    <td>{item.lectureTitle}</td>
                                    <td>{item.seminarTitle}</td>
                                    <td>{item.organizedBy}</td>
                                    <td>{item.isNational}</td>
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

export default InvitedTalk