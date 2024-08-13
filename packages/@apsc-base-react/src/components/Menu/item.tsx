import React, {forwardRef, ReactNode} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {ItemType} from "./index";
import {isElement} from "react-dom/test-utils";
import Icon from "../../tools/Icon";

export interface MenuItemItf extends ItemType {
  className?: string
  suffix?: ReactNode
  iconSuf?: string | ReactNode
  onClick?: () => void
}

const MenuItem = forwardRef<HTMLLIElement, MenuItemItf>((props, ref) => {
  const {
    itemType,
    title,
    path,
    prefix,
    suffix,
    icon,
    iconSuf,
    className,
    onClick,
    children
  } = props
  const classes = classNames([
    "apsc-menu-item",
    className
  ])

  const handleClick = () => {
    if (onClick) { onClick() }
  }

  return (
    <li ref={ref} className={classes} onClick={() => { handleClick() }}>
      {
        children
          ? children
          : (itemType === "link" && path)
            ? <NavLink to={path}>
            </NavLink>
            : <div className="apsc-menu-item-content">
                <div className="menu-item-prefix">{ prefix ? prefix : isElement(icon) ? icon : <Icon icon={icon as string} /> }</div>
                <div className="menu-item-title">{ title }</div>
                <div className="menu-item-suffix">{ suffix ? suffix : isElement(iconSuf) ? iconSuf : <Icon icon={iconSuf as string} /> }</div>
              </div>
      }
    </li>
  )
})

export default MenuItem
