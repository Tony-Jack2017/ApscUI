import React, {CSSProperties, FC} from "react";
import classNames from "classnames";

interface ArrowItf {
  position: "top" | "bottom" | "right" | "left"
  className: string
}

const Arrow:FC<ArrowItf> = (props) => {

  const {
    position,
    className
  } = props

  const classes = classNames([
    "arrow",
    `arrow-pos-${position}`,
    className,
  ])

  return (
    <div className={classes}>
    </div>
  )
}

export default Arrow
