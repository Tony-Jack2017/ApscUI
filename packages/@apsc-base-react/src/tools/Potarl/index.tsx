import React, {ReactNode, useEffect, useLayoutEffect, useState} from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";
import {ComWithChild} from "../../types/common";

import Mask from "./mask";
import {Animation} from "../Animation";

import "@apsc/style/src/components/common/portal.less"



export type PositionDetail = { top: string | number, left: string | number }

export interface WrapPortalItf extends ComWithChild {
  show: boolean
  contentPosition?: "center" | "custom" | "anchor"
  positionDetail?: PositionDetail
  maskVisible?: boolean
  motionName?: string
  motionType?: "once" | "round"
  onClose?: () => void
  children: ReactNode
}

const WrapPortal: React.FC<WrapPortalItf> = (props) => {
  const {
    show,
    positionDetail,
    contentPosition = "center",
    motionName = "zoom",
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
    "wrapContent",
    `wrapContent-${contentPosition}`
  ])

  const innerStyle = {
    top: positionDetail?.top,
    left: positionDetail?.left
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
      <div className="apsc-wrap-portal" tabIndex={-1}>
        {maskVisible && <Mask onClick={handleClick} />}
        <div className={wrapContentClasses} style={innerStyle}>
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
    ), document.body)
  } else {
    return null
  }
}

export default WrapPortal