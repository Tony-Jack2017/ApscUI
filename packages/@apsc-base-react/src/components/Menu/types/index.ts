import {ReactNode} from "react";
import {ComWithChild} from "../../../types/common";

export type BaseItemType = {
  itemType: "link" | "normal"
  prefix?: ReactNode
  path?: string
  icon?: string | ReactNode
  title?: string
}

export interface ItemType extends BaseItemType {
  itemKey?: string | number,
  type?: "list" | "custom" | "normal"
  children?: ReactNode
  list?: ItemType[]
}

export interface MenuItf extends ComWithChild {
  manySub?: boolean
  direction?: "vertical" | "horizontal"
  inline?: boolean
  menList?: ItemType[]
}

export type MenuContextType = {
  activeItem?: string,
  showSub: boolean
  subChild: ReactNode | null
  subTrigger: HTMLElement | null
  inline: boolean
  setContext: Function
}
