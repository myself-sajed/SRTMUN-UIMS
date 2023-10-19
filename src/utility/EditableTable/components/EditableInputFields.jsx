import React from "react";
import { TextareaAutosize } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { academicYearGenerator } from "../../../inputs/Year";

const EditableInputFields = (props) => {
    const { id, value, field, hasFocus, type = "textarea", options } = props;
    const apiRef = useGridApiContext();
    const ref = React.useRef();

    React.useLayoutEffect(() => {
        if (hasFocus) {
            ref.current.focus();
        }
    }, [hasFocus]);

    const handleValueChange = (event) => {
        const newValue = event.target.value; // The new value entered by the user
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
        <>
            {type === "select" ? (
                <select
                    ref={ref}
                    className="form-select mx-2 text-sm w-full"
                    id="validationCustom05"
                    required
                    value={value}
                    onChange={handleValueChange}
                >
                    <option selected disabled value="">
                        Choose
                    </option>
                    {options.map((option, i) => {
                        return (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            ) : type === "AY" ? (
                <select
                    ref={ref}
                    className="form-select mx-2 text-sm w-full"
                    id="validationCustom05"
                    required
                    value={value}
                    onChange={handleValueChange}
                >
                    <option selected disabled value="">
                        Choose Year
                    </option>
                    {academicYearGenerator(30, null, true).map((option, i) => {
                        return (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            ) : (
                <TextareaAutosize
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={handleValueChange}
                    className="p-2 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                    style={{ resize: "none" }}
                />
            )}
        </>
    );
};

export default EditableInputFields;
