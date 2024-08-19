import {createContext} from "react";
import {MenuContextType} from "../types/menu";

export const MenuContext = createContext<MenuContextType>({
  activeItem: "",
  showSub: false,
  subChild: null,
  subTrigger: null,
  inline: false,
  setContext: () => {},
})