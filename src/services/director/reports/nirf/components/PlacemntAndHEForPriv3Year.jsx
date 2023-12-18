import React, { useEffect, useState } from 'react'
import getReq from '../../../../../components/requestComponents/getReq';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';


let tableHead = { decrementedAY: "Academic Year", noOfIntake: "No. of first Year students intake in the year", noOfAdmitted: "No. of first year students admitted in the year", decrementedAY2: "Academic Year", leteralEntry: "No. of students admitted through Lateral entry", academicYear: "Academic Year", noOfGraduating: "No. of students graduating in minimum stipulated time", placed: "No. of students placed", salary: "Median salary of placed graduates per annum (Amount in Rs.)", salaryInWords: "Medián salary of placed graduates per annum (Amount in Words)", noOfHEStudents: "No. of students selected for Higher Studies" }

function privYear(academicYear, numYears) {
    const startYear = parseInt(academicYear.slice(0, 4));
    const previousYear = startYear - numYears;
    const previousAcademicYear = `${previousYear}-${(previousYear + 1).toString().slice(-2)}`;
    return previousAcademicYear;
}



const PlacemntAndHEForPriv3Year = ({ forYear = 2, academicYear = "2021-22", type = "UG2", school = "School of Computational Sciences" }) => {
    if (forYear !== 4) {
        delete tableHead.decrementedAY2;
        delete tableHead.leteralEntry;
    }
    const model = "PlacemntAndHEForPriv3Year"
    const module = "nirf"
    const privYearby1 = privYear(academicYear, 1);
    const privYearby2 = privYear(academicYear, 2);
    let filter = { academicYear: { $in: [academicYear, privYearby1, privYearby2] }, school, type }
    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))
    const preInitialState = { school, type, noOfIntake: null, noOfAdmitted: null, leteralEntry: null, noOfGraduating: null, placed: null, salary: null, salaryInWords: null, noOfHEStudents: null }
    const initialstate = { [academicYear]: preInitialState, [privYearby1]: preInitialState, [privYearby2]: preInitialState }
    const [values, setValues] = useState(initialstate);
    const [btnLoading, setBtnLoading] = useState({ [privYearby2]: false, [privYearby1]: false, [academicYear]: false })
    const yearArray = [privYearby2, privYearby1, academicYear]

    useEffect(() => {
        data?.data.map((e) => {
            setValues(prev => {
                return { ...prev, [e.academicYear]: { ...e, school: e.school || school, type: e.type || type } }
            })
        })
    }, [data])

    return (
        isLoading ? <div className='w-full flex justify-center'><CircularProgress /></div> : <div>
            <table style={{ border: "solid black 1px" }}>
                <thead>
                    <tr>
                        {Object.values(tableHead)?.map((e, i) => <th style={{ border: "solid black 1px" }} key={`head${i}`}>{e}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        yearArray.map((e, i) => {
                            return (<tr key={`tr-${i}`}>
                                <th style={{ border: "solid black 1px" }}>{forYear === 1 ? e : privYear(e, forYear - 1)}</th>
                                <td style={{ border: "solid black 1px" }}><Text type="number" name="noOfIntake" fieldName={e} setValues={setValues} value={values[e]?.noOfIntake} /></td>
                                <td style={{ border: "solid black 1px" }}><Text type="number" name="noOfAdmitted" fieldName={e} setValues={setValues} value={values[e]?.noOfAdmitted} /></td>
                                {
                                    forYear === 4 ? <>
                                        <th style={{ border: "solid black 1px" }}>{privYear(e, forYear - 2)}</th>
                                        <td style={{ border: "solid black 1px" }}><Text type="number" name="leteralEntry" fieldName={e} setValues={setValues} value={values?.[e]?.leteralEntry} /></td>
                                    </> : null
                                }
                                <th style={{ border: "solid black 1px" }}>{e}</th>
                                <td style={{ border: "solid black 1px" }}><Text type="number" name="noOfGraduating" fieldName={e} setValues={setValues} value={values[e]?.noOfGraduating} /></td>
                                <td style={{ border: "solid black 1px" }}> <Text type="number" name="placed" fieldName={e} setValues={setValues} value={values[e]?.placed} /></td>
                                <td style={{ border: "solid black 1px" }}><Text type="number" name="salary" fieldName={e} setValues={setValues} value={values[e]?.salary} /></td>
                                <td style={{ border: "solid black 1px" }}><Text name="salaryInWords" fieldName={e} setValues={setValues} value={values[e]?.salaryInWords} /></td>
                                <td style={{ border: "solid black 1px" }}><Text type="number" name="noOfHEStudents" fieldName={e} setValues={setValues} value={values[e]?.noOfHEStudents} /></td>
                                <Submit values={values[e]} model={model} module={module} academicYear={e} refetch={refetch} years={forYear} setBtnLoading={setBtnLoading} btnLoading={btnLoading} setValues={setValues} />
                            </tr>)
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
export default PlacemntAndHEForPriv3Year

const Text = ({ type = "text", name, fieldName, setValues, value }) => {

    return <input id="fname" type={type}
        onChange={(e) => {
            setValues((pri) => {
                return {
                    ...pri, [fieldName]: {
                        ...pri[fieldName], [name]: e.target.value
                    }
                }
            })
        }}
        value={value} />
}


const Submit = ({ values, model, module, refetch, years, btnLoading, setBtnLoading, academicYear }) => {

    const btnLoadingToggle = (state) => {
        setBtnLoading((pri) => {
            return {
                ...pri, [academicYear]: state
            }
        })
    }

    const validateAndSubmit = () => {
        btnLoadingToggle(true);
        let arr = ["noOfIntake", "noOfAdmitted", "leteralEntry", "academicYear", "noOfGraduating", "placed", "salaryInWords", "noOfHEStudents"]
        let breakFlag = false;
        for (let i = 0; i < arr.length; i++) {
            const fieldName = arr?.[i];
            console.log(values);
            if (values?.[fieldName] === null) {
                if (years !== 4 && fieldName === "leteralEntry") {
                    continue;
                }
                btnLoadingToggle(false);
                toast.error(`Incomplete fields ${tableHead?.[fieldName]}`);
                breakFlag = true;
                break;
            }
        }

        if (!breakFlag) {
            values.academicYear = academicYear;
            axios
                .post(`${process.env.REACT_APP_MAIN_URL}/${module}/${!values.hasOwnProperty("_id") ? "threeYearSubmit" : "threeYearEdit"}/${model}`, values).then(res => {
                    if (res.status === 200) {
                        toast.success(res.data)
                    }
                    if (res.status === 500) {
                        toast.error("Error while submiting data pleae try again")
                    }
                }).catch((err) => {
                    console.log(err);
                    toast.error("Something Went Wrong");
                })
        }
        btnLoadingToggle(false);
        refetch();
    }
    return <button className='btn btn-success' onClick={validateAndSubmit} disabled={btnLoading[academicYear]}>Submit</button>
}

export { Text }