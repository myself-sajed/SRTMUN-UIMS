import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import fetchAQARMatter, { saveAQARMatter } from '../js/fetchAQARMatter'
import UserLoading from '../../../pages/UserLoading'

const AQARTextMatter = ({ academicYear, matterType, userType }) => {

    const [matter, setMatter] = useState('')

    const filter = { academicYear: academicYear, userType, matterType }

    const { data, isLoading, refetch } = useQuery(`Matter-${matterType}-${academicYear}`, () => fetchAQARMatter(filter), { refetchOnWindowFocus: false })

    const submitMatter = (e) => {

        e.preventDefault();

        const formData = {
            matter, userType, matterType, academicYear
        }
     
        saveAQARMatter(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setMatter(data?.data?.data?.matter || '')
        }
    }, [data])


    return <div>
        {isLoading ? <UserLoading title="Getting data" /> : <form onSubmit={submitMatter}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3">
                    <div className="px-4 py-2 bg-white rounded-t-lg">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea value={matter} onChange={(e) => setMatter(() => e.target.value)} id="comment" rows="10" className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Submit Details
                        </button>
                    </div>
                </div>
            </form>}
    </div>
}

export default AQARTextMatter