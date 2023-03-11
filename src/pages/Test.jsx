import React, { useEffect, useState } from 'react'
import MultipleYearSelect from '../components/MultipleYearSelect'
import DeptSelect from '../inputs/DeptSelect'


const Test = () => {

    const [loading, setLoading] = useState(false)


    return (
        <div className='w-full'>
            <div className='p-2 border rounded-md my-3 bg-gray-50 h-screen'>
                <div className='w-full bg-gray-200 rounded-md p-2'>
                    <p className='font-semibold'>Filters</p>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex md:flex-row flex-col items-start justify-start gap-2'>
                            <div className='mt-3 col-md-5'>
                                <MultipleYearSelect />
                            </div>
                            <div>
                                <DeptSelect allSchoolTag={true} />
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col items-start justify-end gap-2 mt-4 mr-3'>
                            <div>
                                {
                                    !loading ? <button type="button" class="btn btn-primary bg-primary">Get Data</button> :
                                        <button class="btn btn-primary" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                            Getting data...
                                        </button>
                                }
                            </div>


                            <button type="button" class="btn btn-success bg-success">Download Data in Excel </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Test