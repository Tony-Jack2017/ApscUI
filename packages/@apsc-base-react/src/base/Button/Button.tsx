import {FC, useEffect, useRef, useState} from "react";
import classNames from "classnames";

import {ButtonProps, ButtonState} from "./Button.types";

const Button:FC<ButtonProps> = (props) => {
    const {
        type = "fill",
        disabled = false,
        color,
        onClick,
        children
    } = props
    const [_status, setStatus] = useState<ButtonState["status"]>("normal")
    const _handleClick = () => {
        if(onClick) {
            switch (onClick.type) {
                case "normal":
                    onClick.callback ? onClick.callback() : null
                    break;
                case "sync":
                    setStatus("pending")
                    onClick.callback ? onClick.callback(setStatus) : null
                    break;
            }
        }
    }
    const classes = classNames([
        "apsc-button",
        `apsc-button_${type}`,
        `button-status_${_status}`
    ])
    const myRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if(color) {
            if(myRef.current) {
                myRef.current.style.setProperty("--apsc-primary-color", color)
            }
        }
    }, [color])
    return (
        <button className={classes} ref={myRef} onClick={ disabled ? undefined : _status != "normal" ? undefined : _handleClick}>
            <div className="apsc-button-bg">
            </div>
            <div className="apsc-button-content">
                { children ? children : 'Button' }
            </div>
            <div className="apsc-button-extra">
            </div>
        </button>
    )
}

export default Button

