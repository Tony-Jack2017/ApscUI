import React, {ReactElement, ReactNode} from "react";
import classNames from "classnames";

export type ItemType = {
  type: "normal" | "customer" | "link"
  icon?: string | ReactNode
  title?: string
  path?: string
  subOpenType?: "inline" | "other"
  children?: ItemType[]
}

interface MenuItemItf {
  type: "normal" | "customer" | "link"
  icon?: string | ReactNode
  title?: string
  path?: string
  children?: ReactNode
}

const MenuItem:React.FC<MenuItemItf> = (props) => {
  const { type, icon, title, path, children } = props
  const menuItemClasses = classNames()
  return (
    <li className={menuItemClasses}>
      { children
        ? children
        : <div>
            <span>{title}</span>
          </div>
      }
    </li>
  )
}

interface SubMenuItf {
  list?: ItemType[]
  children?: ReactElement<MenuItemItf>[]
}

const SubMenu:React.FC<SubMenuItf> = (props) => {
  const { children } = props
  const sumMenuClasses = classNames()
  return (
    <div className={sumMenuClasses}>
      { children }
    </div>
  )
}

interface MenuItf{
  list?: ItemType[]
  children?: ReactNode
}

export const Menu:React.FC<MenuItf> = (props) => {
  const { list, children } = props
  const menuClasses = classNames()
  return (
    <div className={menuClasses}>
      <ul>
        { children }
        {
          list?.map((item, index) => {
            if(item.children) {
              return (<SubMenu list={item.children} />)
            }else {
              return (<MenuItem key={index} type={item.type} title={item.title} path={item.path} />)
            }
          })
        }
      </ul>
    </div>
  )
}

export default {
  Menu,
  MenuItem,
  SubMenu
}