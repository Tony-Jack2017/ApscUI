import React, {forwardRef} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {ItemType} from "./index";

export type MenuItemItf = ItemType

const MenuItem = forwardRef<HTMLLIElement, MenuItemItf>((props, ref) => {
  const {
    itemType,
    title,
    path,
    prefix,
    icon,
    children
  } = props
  const classes = classNames([
    "asps-menu-item"
  ])
  return (
    <li className={classes}>
      {
        children
          ? children
          : (itemType === "link" && path)
            ? <NavLink to={path}>
            </NavLink>
            : <div className="apsc-menu-content">
              <div className="menu-item-prefix">{ prefix ? prefix : icon }</div>
              <div className="menu-item-title">{ title }</div>
            </div>
      }
    </li>
  )
})

export default MenuItem
