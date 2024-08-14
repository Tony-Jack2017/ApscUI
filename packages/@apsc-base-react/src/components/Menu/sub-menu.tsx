import React, {CSSProperties, forwardRef, useContext, useRef, useState} from "react";
import classNames from "classnames";
import {ItemType, MenuContext} from "./index";
import MenuItem from "./item";
import {Animation} from "../../tools/Animation";

export interface SubMenuItf extends ItemType {
  showArrow?: boolean
}

const SubMenu = forwardRef<HTMLDivElement, SubMenuItf>((props, ref) => {

  const {
    showArrow = true,
    prefix,
    icon,
    title,
    list,
    children
  } = props

  const popover = useContext(MenuContext)
  const trigger = useRef<HTMLLIElement | null>(null)
  const c = useRef<HTMLDivElement | null>(null)
  const [childState, setChildState] = useState(false)
  const [animation, setAnimation] = useState<{
    name: string
    type: "once" | "round",
    round: undefined | "appear" | "disappear"
  }>({
    name: "expand",
    type: "round",
    round: "appear"
  })

  const classes = classNames([
    "apsc-sub-menu"
  ])
  const childClasses = classNames([
    "sub-child",
    {"sub-child-inline": popover.inline}
  ])

  const handleClick = () => {
    if (!popover.inline) {
      popover.setSubPopEl({
        type: "open_sub",
        payload: {
          trigger: trigger.current,
          child: child
        }
      })
    } else {
      if(!childState) {
        setAnimation(pre => ({...pre, round: "appear"}))
        setChildState(true)
      }else {
        setAnimation(pre => ({...pre, round: "disappear"}))
      }
    }
  }

  const handleAnimateEnd = () => {
    if(animation.round === "disappear") {
      setChildState(pre => !pre)
      setAnimation(pre => ({...pre, round: "appear"}))
    }
  }

  const child = (
    <ul className={childClasses} style={{"--real-height": `${list ? (list.length * 40 + (list.length + 1) * 4 + 8) : 0}px`} as CSSProperties}>
      {
        list?.map((item, index) => {
          if (item.type === "list") {
            return item.list ? <SubMenu key={index} {...item} /> : <MenuItem key={index} {...item} />
          } else {
            return item.list ? <SubMenu key={index} {...item} /> :
              <MenuItem key={index} {...item} >{item.children}</MenuItem>
          }
        })
      }
    </ul>
  )

  return (
    <div className={classes}>
      <MenuItem
        ref={trigger}
        className="sub-trigger"
        type="normal"
        itemType="normal"
        onClick={handleClick}
        icon={icon}
        title={title}
        suffix={
          <div className="sub-suffix">
            <div className={`sub-arrow ${popover.showSub ? "open" : ""}`}></div>
          </div>
        }/>
      {
        childState &&
          <Animation
              key={list?.length}
              animationName={animation.name}
              animationType={animation.type}
              animationRound={animation.round}
              onAnimationEnd={handleAnimateEnd}
              style={{"--real-height": `${list ? (list.length * 40 + (list.length + 1) * 4 + 8) : 0}px`, height: 0, overflow: "hidden"} as CSSProperties}
          >
            {child}
          </Animation>
      }
    </div>

  )
})

export default SubMenu
