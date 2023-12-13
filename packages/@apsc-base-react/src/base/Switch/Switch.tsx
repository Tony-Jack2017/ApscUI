import {FC, MouseEventHandler, useState} from "react";

import {SwitchTypesProps} from "./Switch.types";
import classNames from "classnames";


const Switch:FC<SwitchTypesProps> = (props) => {
    const {
        type = 'inline',
        isChecked,
        onClick,
    } = props

    const [_isChecked, setChecked] = useState(false)

    const defaultClick = () => {
        setChecked(!_isChecked)
    }

    const checkedStatus = isChecked == undefined ? _isChecked : isChecked

    const classes = classNames([
        "apsc-switch",
        `apsc-switch_${type}`,
        `apsc-switch_${ checkedStatus ? 'checked' : 'unchecked'}`
    ])
    return (
        <div className={classes} onClick={onClick ? onClick : defaultClick}>
            <div className="apsc-switch-inner">
                <span className="apsc-switch-button"></span>
                <span className="apsc-switch-background"></span>
            </div>
        </div>
    )
}

export default Switch
