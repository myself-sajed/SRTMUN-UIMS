import React, { useEffect, useState } from 'react'
import MultipleYearSelect from '../components/MultipleYearSelect'
import DeptSelect from '../inputs/DeptSelect'
import InvitedTalk from '../services/faculty/tables/InvitedTalk'
import GoBack from '../components/GoBack'


const Test = () => {

    return (
        <div>
            <GoBack pageTitle="AQAR Form (2019-20)" />

            <div className="my-5">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Invited Talks, Paper Presentation, Resource Person at National or International Level
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <InvitedTalk filterByAcademicYear={true} academicYear="2019-20" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Test