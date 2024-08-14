import React, {CSSProperties, forwardRef, ReactNode, useEffect, useLayoutEffect, useState} from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";
import {ComWithChild} from "../../types/common";

import Mask from "./mask";
import {Animation} from "../Animation";


export type Position = {
  top: string | number
  left: string | number
  width: string | number
  height: string | number
}

export interface WrapPortalItf extends ComWithChild {
  show: boolean
  contentPos?: "center" | "custom" | "anchor"
  position?: Position
  posStyle?: CSSProperties
  maskVisible?: boolean
  motionName?: string
  motionType?: "once" | "round"
  onClose?: () => void
  children: ReactNode
}

const WrapPortal= forwardRef<HTMLDivElement, WrapPortalItf>((props, ref) => {
  const {
    show,
    position,
    posStyle,
    contentPos = "center",
    motionName = "fade",
    motionType = "round",
    children,
    maskVisible = true,
    onClose
  } = props

  const [animation, setAnimation] = useState<{
    name: string
    type: "once" | "round",
    round: undefined | "appear" | "disappear"
  }>({
    name: motionName,
    type: motionType,
    round: undefined
  })

  const [visible, setVisible] = useState(show)

  const wrapContentClasses = classNames([
    "apsc-wrap-container",
    `apsc-wrap-container-${contentPos}`
  ])

  const innerStyle = {
    top: position?.top,
    left: position?.left,
    width: position?.width,
    height: position?.height
  }

  useEffect(() => {
    if (show) {
      setAnimation(pre => ({...pre, round: "appear"}))
      setVisible(true)
    }
  }, [show])

  const handleClick = () => {
    if (onClose) onClose()
    setAnimation(pre => ({...pre, round: "disappear"}))
  }

  const handleAnimationEnd = () => {
    if(animation.round === "disappear") {
      setVisible(false)
    }
  }

  if (visible) {
    return createPortal((
      <div className="apsc-wrap-portal" tabIndex={-1} onClick={!maskVisible ? handleClick : () => {}}>
        {maskVisible && <Mask onClick={handleClick} />}
        <div ref={ref} className={wrapContentClasses} style={innerStyle}>

            <div className="apsc-wrap-content" style={posStyle}>
              <Animation
                fromAnchor={true}
                offset={[300, 300]}
                animationRound={animation.round}
                animationName={animation.name}
                animationType={animation.type}
                onAnimationEnd={handleAnimationEnd}
              >
                {children}
              </Animation>
            </div>
        </div>
      </div>
    ), document.body)
  } else {
    return null
  }
})

export default WrapPortal
