import React from 'react'

const RadioQuestion = () => {
    return (
        <div className="my-5">
            <p className='my-2'>How much of the syllabus was covered in class by Dr. G. V. Chowdhary?</p>
            <div className="form-check">
                <RadioButton id="sajed" title="Sajed" />
                <RadioButton id="shaikh" title="Shaikh" />
                <RadioButton id="ahmed" title="Ahmed" />
                <RadioButton id="moiz" title="Moiz" />
            </div>
        </div>
    )
}

export default RadioQuestion

const RadioButton = ({ id, title }) => {
    return <div>
        <input class="form-check-input" type="radio" name="radioQuestion" id={id} />
        <label class="form-check-label" htmlFor={id}>
            {title}
        </label>
    </div>
}