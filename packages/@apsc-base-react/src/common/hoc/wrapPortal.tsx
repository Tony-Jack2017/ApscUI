import React, {ReactElement, useEffect} from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";

type WrapPortalProp = {
  show: boolean
  position?: "center" | "custom"
  backVisible?: Boolean
}

interface WrapPortalItf extends WrapPortalProp {
  onClose: () => void
  children: ReactElement
}

const wrapReducer = (draft: WrapPortalProp, action: any) => {
  switch (action.type) {
    case "OPEN_WRAP":
      draft.show = true
      break
    case "CLOSE_WRAP":
      draft.show = false
      break
  }
}

const WrapPortal:React.FC<WrapPortalItf> = (props) => {

  const {
    show, position = "center", children,
    backVisible = true
  } = props

  useEffect(() => {
    if(show) {
      dispatch({type: "OPEN_WRAP"})
    }else {
      dispatch({type: "CLOSE_WRAP"})
    }
  }, [show])

  const [state, dispatch] = useImmerReducer(wrapReducer, {
    show: show,
    position: position,
    backVisible: backVisible,
  })

  const wrapBackClasses = classNames([
    "wrapBack",
    `wrapBack-${backVisible ? 'visible' : 'invisible'}`
  ])
  const wrapContentClasses = classNames([
    "wrapContent",
    `wrapContent-${position}`
  ])

  const handleClick = () => {
    dispatch({type: "CLOSE_WRAP"})
  }

  if(state.show) {
    return createPortal((
      <div className="apsc-wrap" tabIndex={-1} onClick={handleClick}>
        <div className={wrapBackClasses}></div>
        <div className={wrapContentClasses}>
          { children }
        </div>
      </div>
    ), document.body)
  }else {
    return <div>{state.show}</div>
  }
}

export default WrapPortal