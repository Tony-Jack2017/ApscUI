import React, { CSSProperties, forwardRef, useEffect, useRef, useState} from "react";
import WrapPortal, {Position} from "../../tools/Potarl";
import classNames from "classnames";
import {ComWithChild} from "../../types/common";
import Arrow from "../../tools/Potarl/arrow";

export interface PopoverItf extends ComWithChild {
  open: boolean
  isArrow?: boolean
  anchorEl: HTMLElement | null
  anchorPos?: "top" | "bottom" | "left" | "right"
  arrowPos?: "start" | "center" | "end"
  arrowInAnchorPos?: "start" | "center" | "end"
  onClose: () => void
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
      return {bottom: `calc(100% + ${isArrow ? 10 : 0}px)`, left: `${handlePos(arrowPos)}%`,  transform: `translateX(${-handlePos(arrowInAnchorPos)}%)`}
    case "left":
      return {right: `calc(100% + ${isArrow ? 10 : 0}px)`, top: `${handlePos(arrowPos)}%`,  transform: `translateY(${-handlePos(arrowInAnchorPos)}%)`}
    case "bottom":
      return {top: `calc(100% + ${isArrow ? 10 : 0}px)`, left: `${handlePos(arrowPos)}%`, transform: `translateX(${-handlePos(arrowInAnchorPos)}%)`}
    case "right":
      return {left: `calc(100% + ${isArrow ? 10 : 0}px)`, top: `${handlePos(arrowPos)}%`,  transform: `translateY(${-handlePos(arrowInAnchorPos)}%)`}
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
      const { top, left, width, height } = anchorEl.getBoundingClientRect()
      setPosition({
        top, left, width, height
      })
    }
  }, [anchorEl])


  const classes = classNames([
    "apsc-popover",
    `apsc-popover-pos-${anchorPos}`
  ])

  const posStyle = getInnerStyle(anchorPos, arrowPos, arrowInAnchorPos, isArrow)

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
        <div className="apsc-popover-content">
          { children }
        </div>
        { isArrow && <Arrow arrowPos={arrowInAnchorPos} position={anchorPos} className="apsc-popover-arrow" /> }
      </div>
    </WrapPortal>
  )
})

export default Popover