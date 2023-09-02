import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import ProgramTitle from '../components/ProgramTitle'
import { fetchRegistrations } from '../js/fetchRegistrations';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPrograms } from '../js/fetchPrograms';
import { useQuery } from 'react-query';
import siteLinks from '../../../components/siteLinks';
import title from '../../../js/title';
import Footer from '../../../components/Footer';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import UserLoading from '../../../pages/UserLoading';
import { Empty } from 'antd';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';


const RegistrationDetails = () => {

    const navigate = useNavigate();

    const { programId } = useParams();
    const [program, setProgram] = useState(null);

    const params = { filter: { _id: programId }, singleItem: true, shouldPopulate: true };
    const { data, isLoading } = useQuery(['SingleProgram', programId], () => fetchPrograms(params));


    useEffect(() => {
        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link);
        } else {
            setProgram(data?.data?.data);
        }

    }, [data]);

    let bredLinks = [siteLinks.welcome, siteLinks.programs, { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program...', link: `/program/${programId}` }, { title: "Program Registration Details", url: '' }];

    title("Program Registration Details")

    const downloadDataToExcel = () => {
        // excel logic
    }


    return (
        <div>
            <GoBack pageTitle="Program Registration Details" bredLinks={bredLinks} />
            <div className="h-screen animate-fade-up animate-once">
                {
                    isLoading ?
                        <UserLoading title="Getting Program title" />
                        :
                        <div className="mt-4 animate-fade-up animate-once">
                            <ProgramTitle program={program} />

                            <div className="mt-4 h-screen">
                                <div className="animate-fade-up animate-once bg-gray-50 rounded-md p-2">
                                    <div className='flex items-start justify-between'>
                                        <p className="flex items-center gap-2 text-xl"><GroupsRoundedIcon sx={{ fontSize: '35px' }} />
                                            <span className="ml-3 tracking-tight">Registrations {`(${program?.registrationResponse?.length})`} </span>
                                        </p>

                                        <button onClick={downloadDataToExcel} className='flex items-center justify-start gap-2 rounded-md hover:bg-green-800 p-2 bg-green-700 text-white'>
                                            <TextSnippetRoundedIcon /> Export Responses in Excel
                                        </button>

                                    </div>

                                    <div className="mt-3">
                                        <div className='h-3/5 '>
                                            <div className="mt-2 table-responsive">

                                                {
                                                    program?.registrationResponse?.length > 0 ?
                                                        <table className="table table-bordered">
                                                            <thead className="bg-primary text-light">
                                                                <tr>
                                                                    <th>Sr.No.</th>
                                                                    {
                                                                        Object.keys(JSON.parse(program?.registrationResponse?.[0]?.response)).map((cells) => {
                                                                            return <th>{cells} </th>
                                                                        })
                                                                    }

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    program?.registrationResponse?.map((item, index) => {
                                                                        let cells = Object.keys(JSON.parse(program?.registrationResponse?.[0]?.response))

                                                                        let itemData = JSON.parse(program?.registrationResponse?.[index]?.response)


                                                                        return <tr>
                                                                            <th>{index + 1}</th>
                                                                            {
                                                                                cells?.map((cell) => {
                                                                                    return <td>{itemData[cell]} </td>
                                                                                })
                                                                            }
                                                                        </tr>
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table> :
                                                        <div className='mt-5 flex items-center justify-center'>
                                                            <Empty description="No Program Registration made so far..." />
                                                        </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                }

            </div>
            <Footer />
        </div>
    )
}

export default RegistrationDetails
