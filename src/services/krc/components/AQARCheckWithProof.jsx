import React from 'react';

const AQARCheckWithProof = ({ setCheckData, checkData }) => {

    const checkObject = [
        { id: "1", title: 'Any 4 or all of the above' },
        { id: "2", title: 'Any 3 of the above' },
        { id: "3", title: 'Any 2 of the above' },
        { id: "4", title: 'Any 1 of the above' },
        { id: "5", title: 'None of the above' },
    ]

    return <div>

        <div>
            <ol className="font-semibold">
                <li>1. e–journals</li>
                <li>2. e-books</li>
                <li>3. e-ShodhSindhu</li>
                <li>4. Shodhganga</li>
                <li>5. Databases</li>
            </ol>
        </div>

        <div className="bg-gray-50 rounded-md p-3 mt-3 border">
            <p className='mb-2'>According to the above list check one of the following options:</p>
            {
                checkObject.map((item, index) => {
                    return <div className="form-check" key={index}>
                        <input onChange={() => setCheckData(() => item.title)} checked={checkData === item.title} className="form-check-input" name="libraryCheck" type="radio" value="" id={item.title} />
                        <label className="form-check-label" htmlFor={item.title}>
                            {item.title}
                        </label>
                    </div>
                })
            }
        </div>

        <div>
            {
                checkData && <div className='mt-3 bg-gray-50 rounded-md p-3 border'>
                    <label htmlFor="radioFile">Upload Relevant proof based on the above choice</label>
                    <input type="file" name="file" id="radioFile" className="form-control mt-1" />
                </div>
            }
        </div>

    </div>
}

export default AQARCheckWithProof