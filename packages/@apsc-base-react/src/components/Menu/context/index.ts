import {createContext} from "react";
import {MenuContextType} from "../types";

export const MenuContext = createContext<MenuContextType>({
  showSub: false,
  subChild: null,
  subTrigger: null,
  setSubPopEl: () => {},
  inline: false
})