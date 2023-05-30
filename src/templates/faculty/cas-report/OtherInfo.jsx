import React from 'react'

const OtherInfo = ({ forPrintOut, casArray }) => {
    return (
        <div>
            <div>
                <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} p-2`}>
                    <span className="font-bold">Other Relevant Information</span></p>

                <div className={`${forPrintOut === 'true' && "px-1"} mt-2`}>
                    <table className={`table table-bordered`}>
                        <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col">Details of any other credential, significant contributions, awards received etc. not mentioned earlier </th>
                            </tr>
                        </thead>
                        <tbody>

                            {casArray.map((casItem) => {
                                return (
                                    <tr className="table-light">
                                        <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                        <td>

                                            <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                                                <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                                    <tr>
                                                        <th scope="col">Sr.</th>
                                                        <th>Details</th>

                                                    </tr>
                                                </thead>
                                                <tbody className='text-sm'>

                                                    {
                                                        casItem?.otherInfo?.map((infoItem, index) => {
                                                            return <tr>
                                                                <th scope="row">{index + 1}</th>


                                                                <td>{infoItem}</td>


                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>

            <div className='border mt-5 p-3'>
                <p className='mb-3 font-semibold'>List of enclosures </p>
                <hr />

                <div class="grid grid-cols-2 gap-4 mt-3">
                    <div className="p-1">1. Proof of Research Degree</div>
                    <div className="p-1">2. Proofs of Orientation / Refresher course & FDP</div>
                    <div className="p-1">3. Proofs of Research Papers</div>
                    <div className="p-1">4. Proofs of Publications</div>
                    <div className="p-1">5. Proofs of Ph.D. Awarded to students</div>
                    <div className="p-1">6. Proofs of Research Projects</div>
                    <div className="p-1">7. Proofs of Consultancies</div>
                    <div className="p-1">8. Proofs of Awards and Recognition</div>
                    <div className="p-1">9. Proofs of Invited of Invited Talks</div>
                    <div className="p-1">10. Director Certificate</div>
                    <div className="p-1">11. Proofs of involved activities</div>
                </div>
            </div>
        </div>
    )
}

export default OtherInfo