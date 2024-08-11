import React, { CSSProperties, forwardRef, useEffect, useRef, useState} from "react";
import WrapPortal, {Position} from "../../tools/Potarl";
import classNames from "classnames";
import {ComWithChild} from "../../types/common";


interface PopoverItf extends ComWithChild {
  open: boolean
  isArrow?: boolean
  anchorEl: HTMLElement
  anchorPos?: "top" | "bottom" | "left" | "right"
  arrowPos?: "start" | "center" | "end"
  arrowInAnchorPos?: "start" | "center" | "end"
  onClose?: () => void
}

const handlePos = (pos:string):number => {
  switch (pos) {
    case "start":
      return 0
    case "center":
      return 50
    case "end":
      return 100
    default:
      return 0
  }
}

const getInnerStyle = (anchorPos:string, arrowPos:string, arrowInAnchorPos:string, isArrow: boolean): CSSProperties => {
  const offset = handlePos(arrowPos) - handlePos(arrowInAnchorPos)
  switch (anchorPos) {
    case "top":
      return {top: `calc(-100% - ${isArrow ? 10 : 0}px)`, left: `${offset}%`}
    case "left":
      return {right: `calc(100% + ${isArrow ? 10 : 0}px)`, top: `${offset}%`}
    case "bottom":
      return {bottom: `calc(-100% - ${isArrow ? 10 : 0}px)`, left: `${offset}%`}
    case "right":
      return {left: `calc(100% + ${isArrow ? 10 : 0}px)`, top: `${offset}%`}
    default:
      return {}
  }
}

const Popover = forwardRef<HTMLDivElement, PopoverItf>((props, ref) => {

  const {
    open,
    isArrow= false,
    anchorEl,
    anchorPos = "bottom",
    arrowPos = "start",
    arrowInAnchorPos = "start",
    onClose,
    children
  } = props


  const [position, setPosition] = useState<Position>({
    top: 0, left: 0, width: 0, height: 0
  })

  useEffect(() => {
    if(anchorEl) {
      setPosition({
        top: anchorEl.offsetTop,
        left: anchorEl.offsetLeft,
        width: anchorEl.offsetWidth,
        height: anchorEl.offsetHeight
      })
    }
  }, [anchorEl])


  const classes = classNames([
    "apsc-popover"
  ])

  const posStyle = getInnerStyle(anchorPos, arrowPos, arrowInAnchorPos, isArrow)

  console.log(posStyle)

  return (
    <WrapPortal
      show={open}
      contentPos="anchor"
      position={position}
      posStyle={posStyle}
      maskVisible={false}
      onClose={onClose}
    >
      <div className={classes}>
        <div></div>
        <div className="apsc-popover-content">
          { children }
        </div>
      </div>
    </WrapPortal>
  )
})


export default Popover