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
  type?: "list" | "custom" | "normal"
  children?: ReactNode
  list?: ItemType[]
}

export interface MenuItf extends ComWithChild {
  direction?: "vertical" | "horizontal"
  inline?: boolean
  menList?: ItemType[]
}

export type MenuContextType = {
  showSub: boolean
  subChild: ReactNode | null
  subTrigger: HTMLElement | null
  setSubPopEl: Function
  inline: boolean
}
