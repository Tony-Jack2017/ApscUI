import React, {CSSProperties, FC} from "react";
import classNames from "classnames";

interface ArrowItf {
  arrowPos: "start" | "center" | "end"
  position: "top" | "bottom" | "left" | "right"
  className: string
}


function computeStyle(position: ArrowItf["position"], arrowPos: ArrowItf["arrowPos"]):CSSProperties {
  switch (position) {
    case "top":
      return {
        bottom: "-5px",
        left: `${arrowPos == "start" ? '8px' : (arrowPos == "center" ? "50%" : 'calc(100% - 18px)')}`
      }
    case "bottom":
      return {
        top: "-5px",
        left: `${arrowPos == "start" ? '8px' : (arrowPos == "center" ? "50%" : 'calc(100% - 18px)')}`
      }
    case "left":
      return {
        right: "-5px",
        top: `${arrowPos == "start" ? '8px' : (arrowPos == "center" ? "50%" : 'calc(100% - 18px)')}`
      }
    case "right":
      return {
        left: "-5px",
        top: `${arrowPos == "start" ? '8px' : (arrowPos == "center" ? "50%" : 'calc(100% - 18px)')}`
      }
  }
}

const Arrow:FC<ArrowItf> = (props) => {

  const {
    position,
    arrowPos,
    className
  } = props

  const classes = classNames([
    "arrow",
    `arrow-pos-${position}`,
    className,
  ])

  const innerStyle = computeStyle(position, arrowPos)
  // const innerStyle = {
  //   top: "100%"
  // }
  console.log(innerStyle)

  return (
    <div className={classes} style={innerStyle}>
    </div>
  )
}

export default Arrow
