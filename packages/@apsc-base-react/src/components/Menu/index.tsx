import React, {forwardRef} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";
import Popover from "../Popover/index";
import MenuItem from "./item";
import SubMenu from "./sub-menu";

import { MenuItf } from "./types";
import { MenuContext } from "./context";


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
    menList,
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
          menList?.map((item, index) => {
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

export default Menu

export class ItemType {
}