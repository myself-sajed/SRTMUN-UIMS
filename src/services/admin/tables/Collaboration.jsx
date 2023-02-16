import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const Collaboration = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('Collaboration', setData)
    }, [academicYear])



    return (

        <AdminPrototype model="Collaboration" title="Collaborations">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-52">Full Name</div></th>
                        <th scope="col"><div className="w-52">Title of the collaborative activity</div></th>
                        <th scope="col"><div className="w-52">Name of the collaborating agency with contact details</div></th>
                        <th scope="col">Participant Name</th>
                        <th scope="col">Year of Collaboration</th>
                        <th scope="col">Duration</th>
                        <th scope="col"><div className="w-24">Nature of the activity</div></th>
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


                                    <td>{item.collabTitle}</td>
                                    <td>{item.agencyName}</td>
                                    <td>{item.participantName}</td>
                                    <td>{item.collabYear}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.activityNature}</td>
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

export default Collaboration