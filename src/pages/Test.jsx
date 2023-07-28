import Axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import fetchData from '../services/dashboard/js/fetchData'
import SchoolsProgram from '../components/SchoolsProgram'
import { useState } from 'react'
import designationWiseSorting from '../js/designationWiseSorting'
const Test = () => {

    const param = { model: 'User', filter: {} }
    const { data, isLoading, isError, error, refetch } = useQuery([`${param.model}`, param], () => fetchData(param))

    const [users, setUsers] = useState(null)

    useEffect(() => {
        // Using reduce to group users by department
        const usersByDepartment = data?.data?.data?.reduce((acc, user) => {
            const { department } = user;
            if (!acc[department]) {
                acc[department] = [user];
            } else {
                acc[department].push(user);
            }
            return acc;
        }, {});

        console.log('Data:', usersByDepartment)

        setUsers(usersByDepartment)

    }, [data])

    return (
        <div>


            <table className="table table-bordered mt-5 css-serial">
                <thead className="bg-primary text-white">
                    <th>Sr No.</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>School</th>
                </thead>

                <tbody>

                    {
                        Object.keys(SchoolsProgram).map((school, index) => {
                            return designationWiseSorting(users?.[school]).map((user, i) => {
                                return <tr key={i}>
                                    <td> </td>
                                    <td>{user?.username.includes('UFTG') || user.username.includes('C-') ? user.username : `TG-${user.username}`}</td>
                                    <td>{user?.salutation}  {user?.name}</td>
                                    <td>{user?.designation}</td>
                                    <td>{user?.department}</td>
                                </tr>
                            })

                        })
                    }

                </tbody>
            </table>


        </div>
    )
}

export default Test
