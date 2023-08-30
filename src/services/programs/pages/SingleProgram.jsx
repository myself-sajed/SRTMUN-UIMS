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
import title from '../../../js/title';

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

    title(program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program')

    return (
        <div>
            <GoBack backUrl={-1} pageTitle="Program Details" bredLinks={bredLinks} />
            <div className="animate-fade-up animate-once">
                {isLoading ? (
                    <UserLoading title="Fetching Program Details" />
                ) : (
                    <section className='rounded-xl bg-cover bg-no-repeat' style={{ backgroundImage: "url('/assets/programHeroBG.png')" }} >
                        <div className="py-3 text-white mt-3 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                            <div className='text-blue-900'>
                                <p className="mt-5 mb-2 text-lg font-bold ">{program?.prefix}</p>
                                <h1 className="mb-2 text-xl font-semibold sm:font-extrabold sm:tracking-tight leading-none md:text-3xl lg:text-4xl">{program?.title}</h1>
                                <h1 className="mb-2 text-xl font-semibold sm:font-extrabold sm:tracking-tight leading-none md:text-3xl lg:text-4xl ">{program?.programDate}</h1>


                                <div className="mb-3 mt-2 ">
                                    Organized by <b>{program?.arrangedBy}</b>
                                </div>
                            </div>

                            <div className='md:grid grid-cols-5 gap-4 mt-5'>
                                <div className="col-span-3">
                                    <Cards id="About" title="Theme of the Program" text={program?.summary} />
                                    <Cards id="About" title="Resource Person" >
                                        <div>
                                            <div className="grid sm:grid-cols-3 gap-3 my-3">
                                                <div className="col-span-2 text-left">
                                                    <p className="text-lg">{program?.pName}</p>
                                                    <p>{program?.pDesignation}</p>
                                                    <p>{program?.pAddress.split(',').map((part, index) => (
                                                        <React.Fragment key={index}>
                                                            {index > 0 && <br />}
                                                            {part}
                                                        </React.Fragment>
                                                    ))}</p>
                                                </div>
                                                <img className="md:w-24 md:h-24 w-14 h-14 rounded object-cover"
                                                    src={serverLinks.showFile(program?.pPhotoURL, "program")}
                                                    alt="Large avatar"></img>

                                            </div>
                                            <hr />
                                            <div className="mt-2">
                                                <p className="lg:text-base md:text-sm sm:text-xs text-justify hyphens-auto">
                                                    {program?.pSummary}
                                                </p>
                                            </div>
                                        </div>
                                    </Cards>
                                </div>

                                <div className="col-span-2">
                                    <div>
                                        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-2">
                                            <Info color="blue" >
                                                <div>
                                                    <p>Last date of Registration:</p> <b>{program?.finalRegistrationDate}</b>
                                                    <p className="text-blue-600 mt-2 bg-blue-50 p-2 rounded-lg"><Link to={`/program/${programId}/registration-form`} >Register Now</Link></p>
                                                </div>
                                            </Info>
                                            <Info color="blue" >
                                                <p>Program Venue:</p><b>{program?.venue}</b>
                                            </Info>
                                        </div>
                                        <Cards id="Reg" title="Registration Details" programId={programId} />
                                        <Cards id="About" title="Contact Details">
                                            <div class="mt-2 mb-4 text-sm text-left">
                                                <div>
                                                    <div class="grid lg:grid-cols-2 gap-2">

                                                        {
                                                            program?.cName0 && <div class="text-black">
                                                                <div class="text-base font-normal">{program?.cName0}</div>
                                                                <div class="text-sm font-normal">{program?.cPosition0}</div>
                                                                <div class="text-sm font-normal">Email: {program?.cEmail0}</div>
                                                                <div class="text-sm font-normal">Phone: {program?.cPhone0}</div>
                                                            </div>
                                                        }
                                                        {
                                                            program?.cName1 && <div class="text-black">
                                                                <div class="text-base font-normal">{program?.cName1}</div>
                                                                <div class="text-sm font-normal">{program?.cPosition1}</div>
                                                                <div class="text-sm font-normal">Email: {program?.cEmail1}</div>
                                                                <div class="text-sm font-normal">Phone: {program?.cPhone1}</div>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </Cards>

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
    return <div id="alert-border-1" className={`rounded-md text-center p-4 mb-4 text-${color}-800 border-l-2 border-r-2 border-b-2 border-t-4 bg-blue-50 border-${color}-800`} role="alert">

        <div className="text-sm font-medium">
            {children}
        </div>
    </div>
}

const Cards = ({ id, title, programId, text, children }) => {


    return <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border-l-2 border-r-2 border-b-2 border-t-4 border-blue-900 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
        <h3 className="text-lg font-bold text-left bg-blue-100 rounded-md p-1">{title}</h3>
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
                                        <img src="/assets/logo.jpg" className='rounded-full' alt="qrlogo" height="30" width="30" />
                                    </div>
                                </div>
                            </div>


                            <p className='my-3'>OR</p>

                            <Link to={`/program/${programId}/registration-form`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center">
                                Click to Register
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    :
                    <div>

                        <p className="lg:text-base md:text-sm sm:text-xs text-justify hyphens-auto">{text}</p>
                        {children}
                    </div>
            }
        </div>
    </div>
}
