import React, {ReactElement} from "react";

export type ButtonState = {
    status: "normal" | "pending" | "success" | "failed"
}

type status = string

export interface ButtonClickInterface {
    type: "normal" | "sync"
    callback?: (set?: React.Dispatch<React.SetStateAction<ButtonState["status"]>>) => any
}

export type ButtonProps = {
    children ?: ReactElement[] | string
    type?: 'text' | 'outline' | 'fill'
    color?: string
    disabled?: boolean
    onClick?: ButtonClickInterface
}



