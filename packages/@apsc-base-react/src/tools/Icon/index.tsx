import {CSSProperties, forwardRef, MouseEventHandler} from "react";
import classNames from "classnames";
export interface IconItf {
  icon: string,
  size?: string | number
  haveBg?: boolean
  style?: CSSProperties
  onClick?: MouseEventHandler
}

const Icon = forwardRef<HTMLIFrameElement, IconItf>((props, ref) => {
  const {
    icon,
    size ,
    haveBg = false,
    onClick,
    style
  } = props

  const innerStyle = size ? {
    fontSize: size,
    ...style,
  } : style
  const classes = classNames([
    "apsc-icon",
    { "apsc-icon-haveBg": haveBg }
  ])
  return (
    <div className={classes} style={innerStyle} onClick={onClick}>
      <i className={`bx ${icon}`}></i>
    </div>
  )
})

export default Icon
