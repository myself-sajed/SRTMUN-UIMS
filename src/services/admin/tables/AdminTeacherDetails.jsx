import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import View from '../../faculty/tables/View'
import AdminPrototype from '../components/AdminPrototype'
import refresh from '../js/refresh'
import toast from 'react-hot-toast';
import Axios from 'axios';
import { Avatar } from '@mui/material';


const AdminTeacherDetails = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    // generate report 
    function generateReport(userId) {
        setLoading(true)
        console.log('generate report')
        toast.success('Please wait...')

        // const otherOptions = { photo: true, Qualifications: true, Degree: true,  }
        let otherOptions = {
            Photo: true, PersonalInfo: true, Qualifications: true, Degree: true, AppointmentsHeldPrior: true, PostHeld: true, Lectures: true, Online: true, ResearchProject: true, ResearchPaper: true, BookAndChapter: true, ResearchGuidance: true, PhdAwarded: true, JrfSrf: true, AwardRecognition: true, Patent: true, ConsultancyServices: true, Collaboration: true, InvitedTalk: true, ConferenceOrganized: true, Fellowship: true
        }

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/generateReport`, { userId, otherOptions }).
            then(function (res) {
                if (res.data.status === 'generated') {
                    setLoading(false)

                    toast.success('Report generated successfully');
                    window.open(`${process.env.REACT_APP_MAIN_URL}/downloadPdf/${res.data.fileName}`, '_blank');
                }
                else if (res.data.status === 'error') {
                    setLoading(false)

                    toast.error(res.data.message);
                }
            })
            .catch(function (err) {
                setLoading(false)

                toast.error('Something went wrong');
            })
    }

    // get all teacher
    useEffect(() => {
        refresh('User', setData)
    }, [])



    return (

        <AdminPrototype model="User" title="Teacher Details" loading={loading}>


            <>

                <thead>
                    <tr>
                        <th scope="col">Teacher</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">University</th>
                        <th scope="col">Designation</th>
                        <th scope="col">School Of</th>
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
                                    <th><Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${item.photoURL}`} /></th>
                                    <td onClick={() => { generateReport(item._id); console.log(item._id) }} className="text-blue-500 hover:text-blue-900 ease-in-out duration-200 cursor-pointer">{item.salutation} {item.name}</td>
                                    <td>SRTMUN</td>
                                    <td>{item.designation}</td>
                                    <td>{item.department}</td>
                                </tr>

                            )
                        })
                    }


                </tbody>

            </>

        </AdminPrototype >
    )
}

export default AdminTeacherDetails