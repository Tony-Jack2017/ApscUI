import {MouseEventHandler, ReactElement} from "react";

export type SwitchTypesProps = {
    type ?: 'inline' | 'outside' | 'replace'
    isChecked ?: boolean
    onClick ?: MouseEventHandler
    onChange ?: Function
}