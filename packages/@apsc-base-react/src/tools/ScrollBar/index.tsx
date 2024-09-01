import React, {DragEventHandler, forwardRef, ReactNode, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";

interface ScrollBarItf {
  width?: string | number
  height?: string | number
  direction?: "vertical" | "horizontal"
  children?: ReactNode
}

const thumbReducer = (draft:any, action: any) => {
  switch (action.type) {
    case "init":
      draft.inner = action.payload.inner; break;
    case "move":
      draft.move = action.payload.move; break;
    case "show":
      draft.active = action.payload.active; break;
    case "timer":
      draft.timer = action.payload.timer; break;
    case "listener":
      draft.listener = action.payload.listener; break;
    case "offset":
      draft.offset = action.payload.offset; break;
  }
}


const ScrollBar = forwardRef<HTMLDivElement, ScrollBarItf>((props, ref) => {

  const {
    width = "100%",
    height = "100%",
    direction = "vertical",
    children
  } = props

  const classes = classNames([
    "apsc-scroll-bar"
  ])

  const wrapper = useRef<HTMLDivElement | null>(null)
  const content = useRef<HTMLDivElement | null>(null)
  const [thumb, dispatch] = useImmerReducer(thumbReducer, {
    inner: 0,
    active: false,
    timer: null,
    listener: null,
    offset: 0
  })

  const innerStyle = {
    overflow: direction == "vertical" ? "hidden scroll" : "scroll hidden"
  }

  useEffect(() => {
    if(wrapper.current && content.current) {
      if(direction === "vertical") {
        dispatch({ type: "show", payload: { active: wrapper.current.offsetHeight < content.current.offsetHeight } })
      }else {
        dispatch({ type: "show", payload: { active: wrapper.current.offsetWidth < content.current.offsetWidth } })
      }
      const height = (wrapper.current.offsetHeight / content.current.offsetHeight) * wrapper.current.offsetHeight
      const width = (wrapper.current.offsetWidth / content.current.offsetWidth) * wrapper.current.offsetWidth
      dispatch({ type: "init", payload: { inner: direction === "vertical" ? height : width  } })
    }
  }, [direction])

  const handleScroll = (e:any) => {
    if(wrapper.current && content.current) {
      dispatch({ type: "offset", payload: { offset: (direction === "vertical" ? e.target.scrollTop * (wrapper.current.offsetHeight / content.current.offsetHeight) : e.target.scrollLeft * (wrapper.current.offsetWidth / content.current.offsetWidth)) } })
    }
  }

  const handleDrag:DragEventHandler<HTMLDivElement> = (e) => {
    if(direction === "vertical" && content.current) {
      content.current.scrollTop = e.clientY
    }
    if(direction === "horizontal" && content.current) {
      content.current.scrollLeft = e.clientX
    }
  }

  const handleThumbDown = () => {

  }
  const handleThumbEnter = () => {
    if(thumb.timer) {
      clearTimeout(thumb.timer)
    }
    dispatch({ type: "show", payload: { active: true } })
  }
  const handleWrapperMouse = () => {
    // dispatch({ type: "show", payload: { active: !thumb.active } })
    // const timer = setTimeout(() => {
    //   dispatch({ type: "show", payload: { active: !thumb.active } })
    // }, 1000)
    // dispatch({ type: "timer", payload: { timer: timer } })
  }


  return (
    <div className={classes} style={{ width, height}}>
      <div ref={wrapper} className="scroll-bar-wrapper" style={innerStyle} onScroll={handleScroll} onMouseEnter={handleWrapperMouse} onMouseLeave={handleWrapperMouse}>
        <div ref={content} className="scroll-bar-content">
          { children }
        </div>
      </div>
      <div className="scroll-bar-track track-horizontal" style={{ visibility: (direction === "horizontal" && thumb.active) ? "visible" : "hidden" }} onMouseEnter={handleThumbEnter}>
        <div className="scroll-bar-thumb thumb-horizontal" style={{ width: thumb.inner, left: thumb.offset }} onMouseDown={handleThumbDown}></div>
      </div>
      <div className="scroll-bar-track track-vertical" style={{ visibility: (direction === "vertical" && thumb.active)  ? "visible" : "hidden" }} onMouseEnter={handleThumbEnter}>
        <div className="scroll-bar-thumb thumb-vertical" style={{ height: thumb.inner, top: thumb.offset }} onMouseDown={handleThumbDown}>
        </div>
      </div>
    </div>
  )
})


export default ScrollBar