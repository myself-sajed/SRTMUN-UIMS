import React from 'react';

function Select({
    className = 'col-md-6',
    id,
    label,
    setState,
    value,
    required = true,
    options,
    select,
    disable = false,
}) {
    return (
        <div className={`col-12 p-1 ${className} text-sm md:text-base`}>
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <select
                className="form-select"
                id={id}
                required={required}
                onChange={(e) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            [id]: e.target.value,
                        };
                    });
                }}
                value={value || ''}
                disabled={disable}
            >
                <option value="">Choose</option>
                {options?.map((e) => (
                    <option key={e} value={e}>
                        {e}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
