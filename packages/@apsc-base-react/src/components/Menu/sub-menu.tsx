import React, {CSSProperties, forwardRef, useContext, useRef, useState} from "react";
import classNames from "classnames";
import {ItemType, MenuContext} from "./index";
import MenuItem from "./item";

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
      setChildState(pre => !pre)
    }
  }


  const child = (
    <ul className={childClasses} style={{"--height": `${list ? (list.length * 40 + (list.length + 1) * 4 + 8) : 0}px`} as CSSProperties}>
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
      {childState && child}
    </div>

  )
})

export default SubMenu
