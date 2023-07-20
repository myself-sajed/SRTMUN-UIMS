import React from 'react'

const StageSelect = ({ space = 'col-md-2', state, setState, title = "Choose Stage / Level", forDesignation = false }) => {

    return (
        <div className={space}>
            <label htmlFor="validationCustom04" className="form-label" >{title}</label>
            <select className="form-select" id="validationCustom04" required onChange={(e) => { setState(e.target.value) }} value={state}>
                <option selected={state === null && true} disabled value="">Choose</option>



                {
                    forDesignation ?
                        <>
                            {
                                forDesignation === 'Assistant Professor' ?
                                    <>
                                        <option value="Assistant Professor (AL 10 to AL 11)">Assistant Professor (AL 10 to AL 11)</option>
                                        <option value="Assistant Professor (AL 11 to AL 12)">Assistant Professor (AL 11 to AL 12)</option>
                                    </> : <>
                                        <option value={forDesignation}>{forDesignation}</option>
                                    </>
                            }
                        </>
                        :
                        <>
                            <option value="Assistant Professor (AL 10 to AL 11)">Assistant Professor (AL 10 to AL 11)</option>
                            <option value="Assistant Professor (AL 11 to AL 12)">Assistant Professor (AL 11 to AL 12)</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Professor">Professor</option>
                            <option value="Senior Professor">Senior Professor</option>
                        </>
                }


            </select>


        </div>
    )
}

export default StageSelect
