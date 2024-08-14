import {forwardRef} from "react";
import classNames from "classnames";

interface IconItf {
  icon: string,
  size?: string | number
  haveBg?: boolean
}

const Icon = forwardRef<HTMLIFrameElement, IconItf>((props, ref) => {

  const {
    icon,
    size = 20,
    haveBg = false
  } = props

  const innerStyle = {
    fontSize: size
  }

  const classes = classNames([
    "apsc-icon",
    { "apsc-icon-haveBg": haveBg }
  ])

  return (
    <div className={classes} style={innerStyle}>
      <i className={`bx bxs-${icon}`}></i>
    </div>
  )
})

export default Icon
