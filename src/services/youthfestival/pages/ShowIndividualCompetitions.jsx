import React from 'react'

const ShowIndividualCompetitions = () => {
    const thead = ["स्पर्धकाचे नाव", "कायमचा पत्ता", "भ्रमणध्वनी क्रमांक", "लिंग", "जन्म दिनांक", "वय", "रक्त गट"]

    const accessor = ['name', 'address', 'mobile', 'gender', 'dob', 'age', 'bloodGroup']

    return (
        <div>
            <table className='table table-bordered table-sm text-sm'>
                <thead>
                    <tr>
                        <th>क्रमांक</th>
                        <th>स्पर्धेचे नाव</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>
                            <table className="table table-sm text-xs caption-top table-bordered table-striped">
                                <caption>स्पर्धेच नाव</caption>
                                <thead>
                                    <tr>
                                        <th>क्रमांक</th>

                                        {
                                            thead.map((head) => {
                                                return <th>{head}</th>
                                            })
                                        }

                                    </tr>

                                </thead>
                                <tbody>

                                    <tr>

                                        <th>{1}</th>
                                        {accessor?.map((get) => {
                                            return <td> data </td>
                                        })}
                                    </tr>


                                </tbody>
                            </table>
                        </td>
                        <td>Edit</td>

                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default ShowIndividualCompetitions
