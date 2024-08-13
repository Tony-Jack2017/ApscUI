import React, {createContext, forwardRef, Fragment, ReactNode, useContext, useRef, useState} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {Popover} from "../../../index";
import {useImmerReducer} from "use-immer";

import "@apsc/style/src/components/menu.less"
import {ComWithChild} from "../../types/common";

type BaseItemType = {
  itemType: "link" | "normal"
  level?: "main" | "normal"
  prefix?: ReactNode
  path?: string
  icon?: string | ReactNode
  title?: string
}

export interface ItemType extends BaseItemType {
  type: "list" | "custom"
  children?: ReactNode
  list?: ItemType[]
}

type MenuItemItf = ItemType

export interface SubMenuItf extends ItemType {
  showArrow?: boolean
}

export interface MenuItf extends ComWithChild {
  direction?: "vertical" | "horizontal"
  inline?: boolean
  list?: ItemType[]
}

type MenuContextType = {
  showSub: boolean
  subChild: ReactNode | null
  subTrigger: HTMLElement | null
  setSubPopEl: Function
  inline: boolean
}

const MenuContext = createContext<MenuContextType>({
  showSub: false,
  subChild: null,
  subTrigger: null,
  setSubPopEl: () => {},
  inline: false
})

const subReducer = (
  draft: { showSub: boolean; subTrigger: any; subChild: any; },
  action: { type: any; payload?: { trigger: any; child: any; }; }
) => {
  switch (action.type) {
    case "open_sub":
      draft.showSub = true;
      if(action.payload) {
        draft.subTrigger = action.payload.trigger;
        draft.subChild = action.payload.child;
      }
      break;
    case "close_sub":
      draft.showSub = false; break;
  }
}

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

const SubMenu = forwardRef<HTMLDivElement, SubMenuItf>((props, ref) => {

  const {
    showArrow = true,
    prefix,
    icon,
    title,
    list,
    children
  } = props

  const classes = classNames([
    "apsc-sub-menu"
  ])

  const popover = useContext(MenuContext)

  const trigger = useRef<HTMLDivElement| null>(null)

  const child = (
    <div className="sub-child">
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

  const handleClick = () => {
    if(!popover.inline) {
      popover.setSubPopEl({
        type: "open_sub",
        payload: {
          trigger: trigger.current,
          child: child
        }
      })
    }
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div ref={trigger} className="sub-trigger">
        <div className="sub-prefix">{ prefix ? prefix : icon }</div>
        <div className="sub-title">{ title }</div>
        <div className="sub-suffix">
          <div className={`sub-arrow ${popover.showSub ? "open" : ""}`}></div>
        </div>
      </div>
      { popover.inline && children }
    </div>

  )
})

const Menu = forwardRef<HTMLUListElement, MenuItf>((props, ref) => {
  const {
    list,
    inline = false,
    direction = "vertical",
    children
  } = props
  const classes = classNames([
    "apsc-menu",
    `apsc-menu-dir-${direction}`
  ])
  const [subState, dispatchSub] = useImmerReducer(subReducer,{
    showSub: false,
    subChild: null,
    subTrigger: null,
    setSubPopEl: () => {}
  })

  const handleClose = () => {
    dispatchSub({ type: "close_sub" })
  }

  return (
    <MenuContext.Provider value={{
      showSub: subState.showSub,
      subChild: subState.subChild,
      subTrigger: subState.subTrigger,
      setSubPopEl: dispatchSub,
      inline: inline
    }}>
      <ul className={classes}>
        { children && <MenuItem type="custom" itemType="normal" >{ children }</MenuItem> }
        {
          list?.map((item, index) => {
            if(item.type === "list" ) {
              return item.list ? <SubMenu key={index} type={item.type} itemType={item.itemType} title={item.title} list={item.list} /> : <MenuItem key={index} type={item.type} itemType={item.itemType} title={item.title} />
            }else {
              return item.list ? <SubMenu key={index} type={item.type} itemType={item.itemType} /> : <MenuItem key={index} type={item.type} itemType={item.itemType} >{ item.children }</MenuItem>
            }
          })
        }
      </ul>
      <Popover open={subState.showSub}
               anchorEl={subState.subTrigger}
               isArrow={true}
               onClose={handleClose}
      >
        { subState.subChild }
      </Popover>
    </MenuContext.Provider>
  )
})

export {
  Menu,
  SubMenu,
  MenuItem
}
