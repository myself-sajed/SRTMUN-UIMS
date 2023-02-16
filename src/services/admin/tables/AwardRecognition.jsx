import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'

const AwardRecognition = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('AwardRecognition', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="AwardRecognition" title="Awards and Recognition">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>

                        <th scope="col"><div className="w-96">Name of full-time teachers receiving award from State, National or International levels</div></th>
                        <th scope="col">Award Year</th>
                        <th scope="col">PAN</th>
                        <th scope="col">Designation</th>
                        <th scope="col"><div className='w-60'>Name of the Award, Fellowship, received from Government</div></th>
                        <th scope="col"><div className="w-32">Award Agency Name</div></th>
                        <th scope="col"><div className='w-96'>Incentives/Type of incentive given by the HEI in recognition of the award</div></th>
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

                                    <td>{item.awardYear}</td>
                                    <td>{item.pan}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.awardName}</td>
                                    <td>{item.agencyName}</td>
                                    <td>{item.incentive}</td>
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

export default AwardRecognition