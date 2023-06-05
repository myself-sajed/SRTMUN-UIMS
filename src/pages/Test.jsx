import React from 'react'
import title from '../js/title'
import SyllabusRevision from '../services/director/pages/SyllabusRevision'
import ProjectsInternships from '../services/director/pages/ProjectsInternships'

const Test = () => {

    title('Director AQAR')
    return (
        <div>
            <div>
                <SyllabusRevision />
                <ProjectsInternships />
            </div>
        </div>
    )
}

export default Test