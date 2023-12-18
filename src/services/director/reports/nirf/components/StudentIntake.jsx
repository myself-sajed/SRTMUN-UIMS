import React from 'react'
import useNIRFGetProgram from '../../../../../hooks/director-hooks/useNIRFGetProgram'
import { useSelector } from 'react-redux'

const StudentIntake = () => {

    const user = useSelector((state) => state.user?.directorUser)
    const { programs, isLoading } = useNIRFGetProgram(user)
    console.log(programs);
    
    return (
        !isLoading?<div>{programs}</div>
        :<div>
            {/* this is student intake */}
        </div>
    )
}

export default StudentIntake
