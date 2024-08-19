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
      <Entry styleType="normal" label={label ? label : name} placeholder={"Please Input your name"} />
      <p>1</p>
      <Entry styleType="inner" label={label ? label : name} placeholder={"Please Input your name"} />
      <p>2</p>
      <Entry styleType="outline" label={label ? label : name} placeholder={"Please Input your name"} />
    </div>
  )
})

export default Input