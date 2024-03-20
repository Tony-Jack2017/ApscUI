import {ChangeEvent, FC, useEffect, useState} from "react";
import classNames from "classnames";

export interface InputProp {
    type?: string
    inputType?: string
    label?: string
    placeholder?: string
    onFocus?: () => {}
    onBlur?: () => {}
}

const Input:FC<InputProp> = (props) => {

    // Component Data
    const {
        type = "simple",
        inputType = "text",
        label,
        placeholder
    } = props

    const baseClasses = classNames([
        "apsc-input",
        `apsc-input_${type}`
    ])

    // Hook
    const [ classes, setClasses ] = useState(baseClasses)
    const [ value, setValue ] = useState('')
    const [ isFocus, setFocus ] = useState(false)
    useEffect(() => {
        if(value) {
            setClasses(
                classNames(baseClasses, [
                    "apsc-input-active",
                    { "apsc-input-focus": isFocus }
                ])
            )
        }
    } )

    // Component Status Handler
    const handleFocus = () => {
        setFocus(true)
        setClasses(
            classNames(baseClasses, [
                "apsc-input-focus"
            ])
        )
    }

    const handleBlur = () => {
        setFocus(false)
        setClasses(
            classNames(baseClasses)
        )
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setClasses(
            classNames(baseClasses, [
                "apsc-input-focus",
                "apsc-input-active"
            ])
        )
        setValue(event.target.value)
    }


    return (
        <div className={classes}>
            <div className="apsc-input--label">
                <label>Name</label>
            </div>
            <div className="apsc-input--content">
                <input type={inputType} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} onChange={handleInput} />
            </div>
            <span className="apsc-input--border"></span>
        </div>
    )
}

export default Input