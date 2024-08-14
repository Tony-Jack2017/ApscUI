import React, {createContext, forwardRef, Fragment, ReactNode, useContext, useRef, useState} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";

import { Popover } from "../../../index";
import MenuItem from "./item";
import SubMenu from "./sub-menu";

import {ComWithChild} from "../../types/common";

type BaseItemType = {
  itemType: "link" | "normal"
  prefix?: ReactNode
  path?: string
  icon?: string | ReactNode
  title?: string
}

export interface ItemType extends BaseItemType {
  type: "list" | "custom" | "normal"
  children?: ReactNode
  list?: ItemType[]
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

export const MenuContext = createContext<MenuContextType>({
  showSub: false,
  subChild: null,
  subTrigger: null,
  setSubPopEl: () => {},
  inline: false
})

const popReducer = (
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
  const [popState, dispatchSub] = useImmerReducer(popReducer,{
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
      showSub: popState.showSub,
      subChild: popState.subChild,
      subTrigger: popState.subTrigger,
      setSubPopEl: dispatchSub,
      inline: inline
    }}>
      <ul className={classes}>
        { children && <MenuItem type="custom" itemType="normal" >{ children }</MenuItem> }
        {
          list?.map((item, index) => {
            return item.list ? <SubMenu key={index} {...item} /> : <MenuItem key={index} {...item} >{ item.children }</MenuItem>
          })
        }
      </ul>
      <Popover open={popState.showSub}
               anchorEl={popState.subTrigger}
               isArrow={true}
               onClose={handleClose}
      >
        { popState.subChild }
      </Popover>
    </MenuContext.Provider>
  )
})

export {
  Menu,
  SubMenu,
  MenuItem
}
