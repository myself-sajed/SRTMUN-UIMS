import React from 'react'
import Title from '../components/Title'
import { Bar, Pie } from 'react-chartjs-2'
import DownloadReportButtons from '../components/DownloadReportButtons'

const StudentAnalysis = ({ chartData, showDownloadButtons = true, schoolName, academicYear, excelClick }) => {
    return (
        <div>
            {showDownloadButtons && <div className="my-3">
                <DownloadReportButtons feedbackUser="Student" schoolName={schoolName} academicYear={academicYear} excelClick={excelClick} />
            </div>}
            <div>
                <div >
                    <div>
                        <Title title="1. Course Feedback Ratings" />
                        <div className="grid grid-cols-4 gap-5">
                            {chartData.programChartData?.map(({ program, data }) => (
                                <div key={program} className=" bg-gray-50 p-2 rounded-md m-2">
                                    <h4 className="font-semibold mb-3 text-center text-muted">{program}</h4>
                                    <Pie data={data} />
                                </div>
                            ))}
                        </div>

                        <Title title="2. Were are you provided with a course and lecture outline at the beginning?" />
                        <div className="grid grid-cols-3 gap-5">
                            {chartData?.onlineLectureChartData?.map((programData) => (
                                <div key={programData.program} className=" bg-gray-50 p-2 rounded-md m-2">
                                    <h4 className="font-semibold mb-3 text-center text-muted">{programData.program} (in %)</h4>
                                    <Bar data={programData.data} options={{
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                        }
                                    }} />
                                </div>

                            ))}
                        </div>



                    </div>

                    <Title title="3. The Syllabus was?" />
                    <div className="grid grid-cols-3 gap-5 bg-gray-50 p-2 rounded-md m-2">
                        {chartData?.syllabusWasChartData?.map((data) => (
                            <div key={data.program}>
                                <h3 className='mb-3 font-semibold text-muted'>For {data.program}</h3>
                                <Bar data={data.data} options={{
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                    }
                                }} />
                            </div>
                        ))}
                    </div>


                    <div>
                        <Title title="4. Facility Feedback Ratings" className="mt-5" />
                        <div className="grid grid-cols-2 gap-5 bg-gray-50 p-2 rounded-md m-2">
                            {chartData?.facilityChartData?.map(({ question, data }, index) => (
                                <div key={question} >
                                    <h4 className="font-semibold mb-3 text-center text-muted">
                                        {index + 1}. {question}
                                    </h4>
                                    <div className="flex items-center justify-center">
                                        <div className='w-[50%]'>
                                            <Pie data={data} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Title title="5. Teacher Feedback Ratings" className="mt-5" />
                {chartData?.teacherChartData?.map(({ teacherName, data }, index) => (
                    <div key={teacherName} className="bg-gray-50 p-2 rounded-md m-2">
                        <h3 className="my-3 font-semibold text-blue-600 text-lg">
                            {index + 1}. {teacherName}
                        </h3>
                        <div className="pl-10 border-l-4 border-l-gray-400 grid grid-cols-2 gap-5">
                            {data.map(({ label, data: ratings }, index) => (
                                <div key={label} className="my-3">
                                    <h4 className="font-semibold mb-3">
                                        {index + 1}. {label}
                                    </h4>
                                    <div>
                                        <Bar
                                            data={{
                                                labels: ['Very Good', 'Good', 'Satisfactory', 'Un-Satisfactory'],
                                                datasets: [
                                                    {
                                                        label,
                                                        data: Object.values(ratings),
                                                        backgroundColor: ['green', 'blue', 'yellow', 'red'],
                                                        categoryPercentage: 0.6,
                                                        barPercentage: 0.4
                                                    }
                                                ]
                                            }}
                                            options={{
                                                scales: {
                                                    x: {
                                                        stacked: true
                                                    },
                                                    y: {
                                                        stacked: true,
                                                        beginAtZero: true
                                                    }
                                                },
                                                plugins: {
                                                    legend: {
                                                        display: false
                                                    },
                                                    datalabels: {
                                                        display: true,
                                                        anchor: 'end',
                                                        align: 'end'
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <Title title="6. Syllabus Coverage Ratings" className="mt-5" />
                <div className="grid grid-cols-4 gap-3">
                    {chartData?.syllabusCoverageChartData?.map(({ teacherName, data }, index) => (
                        <div key={teacherName} className="bg-gray-50 rounded-md my-2 p-2">
                            <h3 className="my-3 font-semibold text-blue-600 text-lg">
                                {index + 1}. {teacherName}
                            </h3>
                            <div className="flex items-center justify-center">
                                <Pie data={data} />
                            </div>
                        </div>
                    ))}
                </div>

                <Title title="7. Comments on Teacher by Students" className="mt-5" />
                <div>
                    {
                        Object.keys(chartData?.commentsData)?.map((key, index) => {
                            return <div>
                                <p className='font-bold'>{index + 1}. Do you have any major comments to offer for {key}?</p>

                                <div className="bg-gray-50 my-3 border-l-4 ">
                                    <div className="px-5 py-2 border-l-gray-400 grid grid-cols-4 gap-2">
                                        {
                                            chartData?.commentsData[key].map((comment, index) => {
                                                return <p className='p-2 my-1 border bg-gray-100 rounded-sm'>{index + 1}. {comment}</p>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>



            </div>
        </div>
    )
}

export default StudentAnalysis
