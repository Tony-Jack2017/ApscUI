import {FC, useEffect, useRef} from "react";
import classNames from "classnames";

import {ButtonProps} from "./Button.types";

const Button:FC<ButtonProps> = (props) => {

    const {
        type = "fill",
        color,
        children
    } = props
    const classes = classNames([
        "apsc-button hello",
        `apsc-button_${type}`
    ])

    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(color) {
            if(myRef.current) {
                myRef.current.style.setProperty("--apsc-primary-color", color)
            }
        }
    }, [color])

    return (
        <div className={classes} ref={myRef}>
            { children ? children : 'Button' }
        </div>
    )
}

export default Button

