import React, { useEffect, useState } from 'react';
import GoBack from '../../../components/GoBack';
import siteLinks from '../../../components/siteLinks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPrograms } from '../js/fetchPrograms';
import { useQuery } from 'react-query';
import UserLoading from '../../../pages/UserLoading';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import QRCode from 'react-qr-code';
import Footer from '../../../components/Footer';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import serverLinks from '../../../js/serverLinks';

const SingleProgram = () => {
    const navigate = useNavigate();
    const { programId } = useParams();
    const [program, setProgram] = useState(null);

    const params = { filter: { _id: programId }, singleItem: true };
    const { data, isLoading } = useQuery(['SingleProgram', programId], () => fetchPrograms(params), {
        staleTime: 60000,
        cacheTime: 60000,
    });

    useEffect(() => {
        console.log('Data:', data?.data?.data);

        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link);
        } else {
            setProgram(data?.data?.data);
        }
    }, [data]);

    let bredLinks = [siteLinks.welcome, siteLinks.programs, { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program', url: "" }];


    return (
        <div>
            <GoBack backUrl={-1} pageTitle="Program Details" bredLinks={bredLinks} />
            <div className="animate-fade-up animate-once">
                {isLoading ? (
                    <UserLoading title="Fetching Program Details" />
                ) : (
                    <section>
                        <div className="pt-3 mt-3 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative dashboard-gradient-blue">
                            <div className="md:inline-flex justify-between gap-3 items-center py-2 md:py-1 px-2 text-sm text-blue-700 bg-blue-100 rounded-full mb-7">
                                <p className="text-sm font-medium hidden sm:block">Final Date for Registration to the program is <b> {program?.finalRegistrationDate}</b>. </p>
                                <button
                                    onClick={() => navigate(`/program/${programId}/registration-form`)}
                                    className="inline-flex justify-center items-center py-2 px-5 text-base text-center text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                                >
                                    Register Now
                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button>
                            </div>

                            <h1 className="mb-5 text-xl font-semibold sm:font-extrabold sm:tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl ">{program?.title}</h1>


                            <div className="grid sm:grid-cols-2 gap-2 mt-5">
                                <Info color="red">
                                    <div>
                                        <p className="text-lg">Resource Person</p>
                                        <div className="grid md:grid-cols-3 gap-3 mt-3">
                                            <img className="md:w-36 md:h-36 w-14 h-14 rounded object-cover"
                                                src={serverLinks.showFile(program?.pPhotoURL, "program")}
                                                alt="Large avatar"></img>
                                            <div className="col-span-2 text-left">
                                                <p className="text-lg">{program?.pName}</p>
                                                <p>{program?.pDesignation}</p>
                                                <p>{program?.pAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Info>
                                <div className="md:grid grid-cols-2 gap-2">
                                    <Info color="blue">
                                        <p>Organized by: </p><b>{program?.arrangedBy}</b>
                                    </Info>
                                    <Info color="red" >
                                        <p>Date of Program:</p><b>{program?.duration}</b>
                                    </Info>
                                    <Info color="green" >
                                        <div>
                                            <p>Last date of Registration:</p> <b>{program?.arrangedBy}</b>
                                            <p className="text-blue-600"><Link to="/register" >Register Now</Link></p>
                                        </div>
                                    </Info>
                                    <Info color="yellow" >
                                        <p>Program Duration:</p><b>{program?.duration}</b>
                                    </Info>
                                </div>
                            </div>

                            <div className="mt-5">
                                <br />
                                <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
                                    <Cards id="About" title="About the Program" text={program?.summary} />
                                    {/* <Cards id="Details" title="Program Details" /> */}
                                    <Cards id="Reg" title="Registration Details" programId={programId} />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <div>
                                        <div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border-2 border-blue-800 rounded-lg bg-blue-50 " role="alert">
                                            <div class="flex items-center">
                                                <ContactMailRoundedIcon />
                                                <span class="sr-only">Info</span>
                                                <h3 class="text-lg font-medium ml-3">Contact Details</h3>
                                            </div>
                                            <div class="mt-2 mb-4 text-sm text-left">
                                                <div>
                                                    <div class="sm:items-center p-3 flex flex-col sm:flex-row gap-5">

                                                        {
                                                            program?.cName0 && <div class="text-gray-800">
                                                                <div class="text-base font-normal">{program?.cName0}</div>
                                                                <div class="text-sm font-normal">{program?.cPosition0}</div>
                                                                <div class="text-sm font-normal">Email: {program?.cEmail0}</div>
                                                                <div class="text-sm font-normal">Phone: {program?.cPhone0}</div>
                                                            </div>
                                                        }
                                                        {
                                                            program?.cName1 && <div class="text-gray-800">
                                                                <div class="text-base font-normal">{program?.cName1}</div>
                                                                <div class="text-sm font-normal">{program?.cPosition1}</div>
                                                                <div class="text-sm font-normal">Email: {program?.cEmail1}</div>
                                                                <div class="text-sm font-normal">Phone: {program?.cPhone1}</div>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>
                )}
            </div>
            <div className="mt-5">
                <Footer />
            </div>
        </div>
    );
};

export default SingleProgram;

const Info = ({ color, children }) => {
    return <div id="alert-border-1" className={`rounded-md text-center p-4 mb-4 text-${color}-800 border-x border-t-4 border-b border-${color}-300 bg-${color}-50`} role="alert">

        <div className="text-sm font-medium">
            {children}
        </div>
    </div>
}

const Cards = ({ id, title, programId }) => {

    const icons = {
        About: <InfoRoundedIcon />,
        Details: <SubjectRoundedIcon />,
        Reg: <HowToRegRoundedIcon />,
    }

    const navigate = useNavigate();


    return <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border-l-2 border-r-2 border-b-2 border-t-4 border-blue-900 rounded-lg bg-[#ddebfd80] dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
        <div className="flex items-center">
            {icons[id]}
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-bold ml-3">{title}</h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-left">
            {
                id === "Reg" ?
                    <div className="flex items-center flex-col justify-center text-center">
                        <div>
                            <p className='mb-2'>Scan to go to Registration Page</p>
                            <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md m-4 max-w-md mx-auto">
                                <div className="relative">
                                    <QRCode value={`https://srtmun-uims.org/program/${programId}/registration-form`} size={150} level="L" />

                                    {/* Absolute centering for the icon */}
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <img src="/assets/logo.jpg" className='rounded-full' alt="qrlogo" height="40" width="40" />
                                    </div>
                                </div>
                            </div>


                            <p className='my-3'>OR</p>

                            <button onClick={() => navigate(`/program/${programId}/registration-form`)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center">
                                Click to Register
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    :
                    "The main objective of the workshop is to sensitize the teaching faculty of colleges and universities about the advantages of e-learning and to encourage them towards planning, designing, developing, delivering and implementing MOOCs and other Open Educational Resources (OER)so that they can keep pace with digital revolution of the twenty first century in which technology is blended with traditional teaching-learning pedagogies for better learning outcomes"
            }
        </div>
    </div>
}
