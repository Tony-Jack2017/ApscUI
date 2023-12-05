import {FC, MouseEventHandler} from "react";

import {SwitchTypesProps} from "./Switch.types";
import classNames from "classnames";


const Switch:FC<SwitchTypesProps> = (props) => {
    const {
        type = 'inline',
        isChecked = false,
        onClick,
    } = props

    const classes = classNames([
        "apsc-switch",
        `apsc-switch_${type}`,
        `apsc-switch_${isChecked ? 'checked' : 'unchecked'}`
    ])
    return (
        <div className={classes} onClick={onClick}>
            <div className="apsc-switch-inner">
                <span className="apsc-switch-button"></span>
                <span className="apsc-switch-background"></span>
            </div>
        </div>
    )
}

export default Switch