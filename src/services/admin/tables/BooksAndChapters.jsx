import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'


const BooksAndChapters = () => {

    const [data, setData] = useState(null)
    const academicYear = useSelector(state => state.academicYear.academicYear)

    // get all teacher
    useEffect(() => {
        refresh('BookAndChapter', setData, academicYear)
    }, [academicYear])



    return (

        <AdminPrototype model="BookAndChapter" title="Books and Chapters published and papers in national/international conference proceedings">

            <>

                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col"><div className="w-96">Full Name</div></th>
                        <th scope="col"><div className="w-32">Title of Published Book</div></th>
                        <th scope="col">Paper Title</th>
                        <th scope="col"><div className="w-40">Title of proceedings of the conference</div></th>
                        <th scope="col">Conference Name</th>
                        <th scope="col">National/Internal</th>
                        <th scope="col">Year of Publication</th>
                        <th scope="col"><div className="w-40">ISBN/ISSN number of proceeding</div></th>
                        <th scope="col"><div className="w-48">Affiliation Institute at the time of publication</div></th>
                        <th scope="col">Publisher Name</th>
                        <th scope="col">School Name</th>
                        <th scope="col"><div className="w-24">Year</div></th>
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

                                    <td>{item.titleOfBook}</td>
                                    <td>{item.paperTitle}</td>
                                    <td>{item.titleOfProceeding}</td>
                                    <td>{item.conName}</td>
                                    <td>{item.isNat}</td>
                                    <td>{item.publicationYear}</td>
                                    <td>{item.issnNumber}</td>
                                    <td>{item.aff}</td>
                                    <td>{item.publisherName}</td>
                                    <td>{item.schoolName}</td>
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

export default BooksAndChapters