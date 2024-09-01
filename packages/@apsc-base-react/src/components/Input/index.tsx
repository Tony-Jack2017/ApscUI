import React, {CSSProperties, forwardRef, ReactNode} from "react";
import Entry, {EntryItf} from "../../tools/Entry";

interface InputItf {
  label?: string
  name?: string
  type?: "text" | "password"
  showLabel?: boolean
  styleType?: EntryItf["styleType"]
  onInput?: (value: any) => void
  prefix?: ReactNode
  suffix?: ReactNode
  custom?: boolean

  backgroundColor?: CSSProperties["backgroundColor"]
  primaryColor?: CSSProperties["color"]
  innerHeight?: CSSProperties["height"]
}

const Input = forwardRef<HTMLInputElement, InputItf>((props, ref) => {

  const {
    label,
    name,
    type = "text",
    showLabel = true,
    custom = false,
    prefix,
    suffix,
    styleType,

    backgroundColor,
    primaryColor,
    innerHeight,

    onInput,
  } = props

  return (
    <div className="apsc-input" style={{minWidth: 200}}>
      <Entry
        prefix={prefix}
        suffix={suffix}
        normalNoActive={custom}
        backgroundColor={backgroundColor}
        primaryColor={primaryColor}
        innerHeight={innerHeight}
        showLabel={showLabel}
        styleType={styleType}
        type={type} label={label ? label : name}
        placeholder={"Please Input your name"}
        onChange={onInput}/>
    </div>
  )
})

export default Input