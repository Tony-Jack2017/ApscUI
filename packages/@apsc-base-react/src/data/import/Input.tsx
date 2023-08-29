import React from "react";

export interface InputProp {
    type: string
    label: string
}

const Input = () => {
    return (
        <div className="apis-input">
            <label>Button</label>
            <input />
        </div>
    )
}

export default Input