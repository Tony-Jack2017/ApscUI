import {FC, MouseEventHandler, useEffect, useRef, useState} from "react";
import classNames from "classnames";

import {ButtonProps, ButtonState} from "./Button.types";
import button from "docs/src/pages/components/base/button";

const Button:FC<ButtonProps> = (props) => {
    const {
        type = "fill",
        disabled = false,
        color,
        onClick,
        children
    } = props

    const [_status, setStatus] = useState<ButtonState>({
        status: "normal",
        statusDisabled: false,
        disabled: disabled,
    })
    const classes = classNames(
        'apsc-button',
        `button-type_${type}`,
        {
            'button-disabled': disabled,
            [`button-status_${_status.status}`]: !disabled && onClick?.type == "sync"
        }
    )

    useEffect(() => {
        if(color) {
            if(myRef.current) {
                myRef.current.style.setProperty("--apsc-primary-color", color)
            }
        }
    }, [color])
    useEffect(() => {
        if(onClick?.type == "sync") {
            console.log(_status)
        }
        if(_status.status == "success") {
            setTimeout(() => {
                setStatus((pre) => {
                    return {
                        ...pre,
                        status: "normal"
                    }
                })
            }, 2000)
        }
    }, [_status.status])

    const myRef = useRef<HTMLButtonElement>(null);
    const buttonBg = useRef<HTMLDivElement>(null);

    // Internal Event
    const _handleClick = () => {
        if(onClick) {
            switch (onClick.type) {
                case "normal":
                    onClick.callback ? onClick.callback() : null
                    break;
                case "sync":
                    setStatus((pre) => {
                        return {
                            ...pre,
                            status: "pending"
                        }
                    })
                    onClick.callback ? onClick.callback(setStatus) : null
                    break;
            }
        }
    }
    const _handleMouseDown:MouseEventHandler<HTMLButtonElement> = (e) => {
        const offsetTop = myRef.current?.offsetTop
        const offsetLeft = myRef.current?.offsetLeft
        const holder = document.createElement('div');
        holder.style.position = 'absolute';
        holder.className = 'circle'
        holder.style.left = `${ e.clientX - (offsetLeft ? offsetLeft : 0 )}px`;
        holder.style.top = `${ e.clientY - (offsetTop ? offsetTop : 0)}px`;
        buttonBg.current?.append(holder)
        setTimeout(() => {
            holder.remove()
        }, 1000)
    }

    return (
        <button className={classes} ref={myRef} onClick={ disabled ? undefined : _status.status != "normal" ? undefined : _handleClick} onMouseDown={_handleMouseDown}>
            <div className="apsc-button-bg" ref={buttonBg} />
            <div className="apsc-button-content">
                { children ? children : 'Button' }
            </div>
            <div className="apsc-button-extra" />
        </button>
    )
}

export default Button

