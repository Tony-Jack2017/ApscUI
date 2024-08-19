import React, {forwardRef, ReactNode, useContext} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {ItemType} from "./types/menu";
import {isElement} from "react-dom/test-utils";
import Icon from "../../tools/Icon";
import {MenuContext} from "./context";

export interface MenuItemItf extends ItemType {
  className?: string
  suffix?: ReactNode
  iconSuf?: string | ReactNode
  onClick?: () => void
}

const MenuItem = forwardRef<HTMLLIElement, MenuItemItf>((props, ref) => {
  const {
    type = "normal",
    styleType = "normal",
    iconStyle= "circle",
    itemKey,
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
    `item-style-${styleType == "icon" ? `icon-${iconStyle}` : styleType}`,
    className
  ])

  const ctx = useContext(MenuContext)

  const handleClick = (itemType: MenuItemItf["itemType"], key?: string | number) => {
    if (itemType !== "link" && key) {
      ctx.setContext({type: "select_item", payload: {activeItem: key}})
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <li ref={ref} className={classes} onClick={() => {
      handleClick(itemType, itemKey)
    }}>
      {
        children
          ? children
          : (itemType === "link" && path)
            ? <NavLink to={path} className={({isActive}) =>
              [
                isActive ? "item-active" : "",
              ].join(" ")
            }>
              <div className="menu-item-prefix">{prefix ? prefix : isElement(icon) ? icon :
                <Icon icon={icon as string}/>}</div>
              <div className="menu-item-title">{title}</div>
              <div className="menu-item-suffix">{suffix ? suffix : isElement(iconSuf) ? iconSuf :
                <Icon icon={iconSuf as string}/>}</div>
            </NavLink>
            : <div className={classNames(["apsc-menu-item-content", {"item-active": ctx.activeItem === itemKey}])}>
              <div className="menu-item-prefix" >
                {prefix ? prefix : isElement(icon) ? icon : <Icon icon={icon as string}/>}
                1111
              </div>
              <div className="menu-item-title">{title}</div>
              <div className="menu-item-suffix">{suffix ? suffix : isElement(iconSuf) ? iconSuf :
                <Icon icon={iconSuf as string}/>}</div>
            </div>
      }
    </li>
  )
})

export default MenuItem
