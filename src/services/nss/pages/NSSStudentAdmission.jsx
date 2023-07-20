import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import Bred from '../../../components/Bred'
import siteLinks from '../../../components/siteLinks'
import Text from '../../../inputs/Text'
let nssLogo = <img src="/assets/nsslogo.png" height="40px" width="40px" />


const NSSStudentAdmission = () => {

    const [nssInfo, setNssInfo] = useState({})

    useEffect(() => {
        console.log('nssInfo :', nssInfo)
    }, [nssInfo])

    return (
        <div>
            <GoBack backUrl="/" pageTitle="NSS Student Admission" bredLinks={[siteLinks.welcome, siteLinks.nssStudentAdmission]} />


            <div className="w-full border-b">
                <div className='mx-auto w-max'>
                    <p className='flex items-center justify-center gap-2 text-3xl pb-2'>{nssLogo} National Service Scheme</p>
                </div>
            </div>

            <div className="mt-3">
                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Name of the College" stateKey="collegeName" />

                <div className="my-5">
                    <p className="text-center mb-2 font-semibold text-lg">List of the NSS Enrolled for the Year 2022-23</p>



                    <div className='bg-gray-50 p-3 border mb-3 rounded-md flex items-start justify-between gap-5'>
                        <div className='flex-auto'>
                            <p className="mb-3 font-semibold">1. Program Officers</p>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Officer 1" stateKey="officer1" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Officer 2" stateKey="officer2" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Officer 3" stateKey="officer3" />
                            </div>
                        </div>
                        <div className='flex-auto'>
                            <p className="mb-3 font-semibold">2. Volunteers Count</p>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Total Boys" stateKey="totalBoys" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Total Girls" stateKey="totalGirls" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Total Volunteers" stateKey="totalVolunteers" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    )
}

export default NSSStudentAdmission
