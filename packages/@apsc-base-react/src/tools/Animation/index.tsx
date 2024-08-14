import {CSSProperties, forwardRef, useEffect} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";

import {ComWithChild} from "../../types/common";

export interface AnimationItf extends ComWithChild {
  fromAnchor?: boolean
  offset?: [number, number]
  animationName: string
  animationType: "once" | "round"
  animationRound?: "appear" | "disappear"
  onAnimationEnd?: () => void
  style?: CSSProperties
  target?: null
}

const animationReducer = (classes: string[], action: { type: any; payload?: { roundClass: any; }; }) => {
  switch (action.type) {
    case "delete_class":
      classes.pop(); break
    case "add_class":
      if(action.payload) {
        classes.push(action.payload.roundClass); break
      }
  }
}

const Animation = forwardRef<HTMLDivElement, AnimationItf>((props, ref) => {
  const {
    fromAnchor = false,
    offset,
    animationName,
    animationType,
    animationRound,
    onAnimationEnd,
    style,
    children
  } = props

  useEffect(() => {
    switch (animationRound) {
      case "appear":
        dispatch({type: "add_class", payload: {roundClass: `animation-${animationName}-round-appear`}}); break
      case "disappear":
        dispatch({type: "add_class", payload: {roundClass: `animation-${animationName}-round-disappear`}}); break
    }
  }, [animationRound])

  const [classes, dispatch] = useImmerReducer(animationReducer,  ["animation-container"])
  const handleAnimationEnd = () => {
    dispatch({ type: "delete_class" })
    if(onAnimationEnd) {
      onAnimationEnd()
    }
  }

  let innerStyle
  if(fromAnchor) {
    innerStyle = {
      "--offset-x": offset ? offset[0] : 0,
      "--offset-y": offset ? offset[1] : 0
    } as CSSProperties
  }

  return (
    <div ref={ref} onAnimationEnd={handleAnimationEnd}
         className={classNames([
           ...classes,
           { [`animation-${animationName}`]: animationType == "once" },
         ])}
         style={{...innerStyle, ...style}}>
      { children }
    </div>
  )
})

export {
  Animation
}
