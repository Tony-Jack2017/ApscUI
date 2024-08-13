import React, {forwardRef, useContext, useRef, useState} from "react";
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
  const trigger = useRef<HTMLDivElement| null>(null)
  const [showChild, setShowChild] = useState(false)

  const classes = classNames([
    "apsc-sub-menu"
  ])
  const childClasses = classNames([
    "sub-child",
    { "sub-child-inline": popover.inline }
  ])

  const handleClick = () => {
    if(!popover.inline) {
      popover.setSubPopEl({
        type: "open_sub",
        payload: {
          trigger: trigger.current,
          child: child
        }
      })
    }else {
      setShowChild(true)
    }
  }

  const child = (
    <div className={childClasses}>
      {
        list?.map((item, index) => {
          if(item.type === "list" ) {
            return item.list ? <SubMenu key={index} type={item.type} itemType={item.itemType} title={item.title} list={item.list} /> : <MenuItem key={index} type={item.type} itemType={item.itemType} title={item.title} />
          }else {
            return item.list ? <SubMenu key={index} type={item.type} itemType={item.itemType} /> : <MenuItem key={index} type={item.type} itemType={item.itemType} >{ item.children }</MenuItem>
          }
        })
      }
    </div>
  )

  return (
    <div className={classes}>
      <div ref={trigger} className="sub-trigger" onClick={handleClick}>
        <div className="sub-prefix">{ prefix ? prefix : icon }</div>
        <div className="sub-title">{ title }</div>
        <div className="sub-suffix">
          <div className={`sub-arrow ${popover.showSub ? "open" : ""}`}></div>
        </div>
      </div>
      { showChild && children }
    </div>

  )
})

export default SubMenu
