import {ReactElement} from "react";

export type ButtonProps = {
    children ?: ReactElement[] | string
    type ?: 'text' | 'outline' | 'fill'
    color ?: string
}