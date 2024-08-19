import React, {forwardRef} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";
import Popover from "../Popover/index";
import MenuItem from "./item";
import SubMenu from "./sub-menu";

import {MenuContextType, MenuItf} from "./types/menu";
import { MenuContext } from "./context";


const ctxReducer = (
  draft: MenuContextType,
  action: { type: any; payload?: { trigger: any; child: any; activeItem: string }; }
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
    case "select_item":
      if(action.payload) {
        draft.activeItem = action.payload.activeItem
      }
  }
}


const Menu = forwardRef<HTMLUListElement, MenuItf>((props, ref) => {
  const {
    manySub = true,
    menList,
    inline = false,
    direction = "vertical",
    children
  } = props
  const classes = classNames([
    "apsc-menu",
    `apsc-menu-dir-${direction}`
  ])
  const [ctxState, dispatchCtx] = useImmerReducer(ctxReducer,{
    activeItem: "",
    showSub: false,
    subChild: null,
    subTrigger: null,
    inline: inline,
    setContext: () => {}
  })

  const handleClose = () => {
    dispatchCtx({ type: "close_sub" })
  }

  return (
    <MenuContext.Provider value={{
      activeItem: ctxState.activeItem,
      showSub: ctxState.showSub,
      subChild: ctxState.subChild,
      subTrigger:ctxState.subTrigger,
      inline: inline,
      setContext: dispatchCtx,
    }}>
      <ul className={classes}>
        { children && <MenuItem type="custom" itemType="normal" >{ children }</MenuItem> }
        {
          menList?.map((item, index) => {
            return item.list
              ? <SubMenu itemKey={item.itemKey} key={item.itemKey ? item.itemKey : index} {...item} />
              : <MenuItem itemKey={item.itemKey} key={item.itemKey ? item.itemKey : index} {...item} >{ item.children }</MenuItem>
          })
        }
      </ul>
      <Popover open={ctxState.showSub}
               anchorEl={ctxState.subTrigger}
               isArrow={true}
               onClose={handleClose}
      >
        { ctxState.subChild }
      </Popover>
    </MenuContext.Provider>
  )
})

export default Menu
