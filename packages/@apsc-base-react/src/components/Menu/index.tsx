import React, {createContext, forwardRef, Fragment, ReactNode, useContext, useRef, useState} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {Popover} from "../../../index";
import {useImmerReducer} from "use-immer";

import "@apsc/style/src/components/menu.less"


type ItemType = {
  itemType: "link" | "normal"
  path?: string
  icon?: string | ReactNode
  title?: string
  subList?: ItemType[]
}

interface MenuItemItf extends ItemType {
  children?: ReactNode
}

interface SubMenuItf {
  item?: ItemType
  list?: ItemType[]
  showArrow?: boolean
  inline?: boolean
  children?: ReactNode
}

interface MenuItf {
  list?: ItemType[]
  direction?: "vertical" | "horizontal"
  children?: ReactNode
}

type MenuContextType = {
  showSub: boolean
  subChild: ReactNode | null
  subTrigger: HTMLElement | null
  setSubPopEl: Function
}

const MenuContext = createContext<MenuContextType>({
  showSub: false,
  subChild: null,
  subTrigger: null,
  setSubPopEl: () => {}
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
    path,
    icon
  } = props
  const classes = classNames([
    "asps-menu-item"
  ])
  return (
    <li className={classes}>
      {
        itemType === "link" && path
          ? <NavLink to={path}>

            </NavLink>
          : <div>

            </div>
      }
    </li>
  )
})

const SubMenu = forwardRef<HTMLDivElement, SubMenuItf>((props, ref) => {

  const {
    inline = false,
    showArrow = true
  } = props

  const classes = classNames([
    "apsc-submenu"
  ])

  const popover = useContext(MenuContext)

  const trigger = useRef<HTMLDivElement| null>(null)
  const child = useRef<HTMLDivElement| null>(null)

  const children = (
    <div ref={child} className="sub-child">
      Hello This is me
    </div>
  )

  const handleClick = () => {
    if(inline) {

    }else {
      popover.setSubPopEl({
        type: "open_sub",
        payload: {
          trigger: trigger.current,
          child: children
        }
      })
    }
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div ref={trigger} className="sub-trigger">
      </div>
      { inline && children }
    </div>

  )
})

const Menu = forwardRef<HTMLUListElement, MenuItf>((props, ref) => {
  const {
    list,
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
      showSub: false,
      subChild: null,
      subTrigger: null,
      setSubPopEl: dispatchSub
    }}>
      <ul className={classes}>
        { children }
        {
          list?.map((item, index) => {
            if(item.subList) {
              return (
                <SubMenu></SubMenu>
              )
            }else {
              return (
                <MenuItem itemType={item.itemType} />
              )
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
