import React from 'react'
import { useEffect } from 'react'

const StudentAnalysis = ({ studentData, isLoading }) => {

    useEffect(() => {
        if (studentData) {
            courseRating(studentData)
        }
    }, [studentData])

    return (
        <div>
            {/* Course Rated by Students */}

            <div>

            </div>
        </div>
    )
}

export default StudentAnalysis

function courseRating(data) {

    const overallRating = []
    data.forEach((item) => {
        let courseRating = JSON.parse(item.response)?.['Rate the course']
        overallRating.push(courseRating["Overall rating"])
    })

    const ratingCounts = overallRating.reduce((counts, rating) => {
        counts[rating] = (counts[rating] || 0) + 1;
        return counts;
    }, {});

    // console.log(ratingCounts)


}
