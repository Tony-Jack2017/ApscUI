import {CSSProperties, forwardRef, MouseEventHandler, useEffect, useRef} from "react";
import classNames from "classnames";
export interface IconItf {
  icon: string,
  size?: string | number
  haveBg?: boolean

  color?: string
  bg?: string
  activeColor?: string
  activeBg?: string

  style?: CSSProperties
  onClick?: MouseEventHandler
}

const Icon = forwardRef<HTMLDivElement, IconItf>((props, ref) => {
  const {
    icon,
    size ,
    haveBg = false,
    onClick,

    color = "black",
    bg = "white",
    activeColor = "black",
    activeBg = "#e5e7eb",

    style
  } = props

  const iconRef = useRef<HTMLDivElement | null>(null)

  const innerStyle = size ? {
    fontSize: size,
    ...style,
  } : style
  const classes = classNames([
    "apsc-icon",
    { "apsc-icon-haveBg": haveBg }
  ])

  useEffect(() => {
    iconRef.current?.style.setProperty("--color", color)
    iconRef.current?.style.setProperty("--default-bg", bg)
    iconRef.current?.style.setProperty("--active-color", activeColor)
    iconRef.current?.style.setProperty("--active-bg", activeBg)
  }, [color, bg,  activeColor, activeBg])

  return (
    <div ref={iconRef} className={classes} style={innerStyle} onClick={onClick}>
      <i className={`bx ${icon}`}></i>
    </div>
  )
})

export default Icon
