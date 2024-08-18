import React, {forwardRef} from "react";
import Entry from "../../tools/Entry";

interface InputItf {
  label?: string
  name: string
}

const Input = forwardRef<HTMLInputElement, InputItf>((props, ref) => {

  const {
    label ,
    name,
  } = props

  return (
    <div style={{ width: 200 }}>
      <Entry styleType="inner" label={label ? label : name} />
    </div>
  )
})

export default Input