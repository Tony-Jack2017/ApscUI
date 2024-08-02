import React, {ReactElement} from "react";

export type ButtonState = {
    status: "normal" | "pending" | "success" | "failed"
    statusDisabled: boolean
    disabled: boolean
}

type status = string

export interface ButtonClickInterface {
    type: "normal" | "sync"
    callback?: (set?: React.Dispatch<React.SetStateAction<ButtonState>>) => void
}

export type ButtonProps = {
    children ?: ReactElement[] | string
    type?: 'text' | 'outline' | 'fill'
    color?: string
    disabled?: boolean
    onClick?: ButtonClickInterface
}



