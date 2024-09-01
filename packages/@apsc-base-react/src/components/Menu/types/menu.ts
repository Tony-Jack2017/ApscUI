import {CSSProperties, ReactNode} from "react";
import {ComWithChild} from "../../../types/common";

export type BaseItemType = {
  itemType: "link" | "normal"
  styleType?: "icon" | "normal",
  icon?: string | ReactNode
  iconStyle?: "circle" | "square"
  prefix?: ReactNode
  path?: string
  title?: string
}

export interface ItemType extends BaseItemType {
  itemKey?: string | number,
  type?: "list" | "custom" | "normal"
  list?: ItemType[]
  children?: ReactNode
}

export interface MenuItf extends ComWithChild {
  direction?: "vertical" | "horizontal"
  inline?: boolean
  menList?: ItemType[]
  style?: CSSProperties
}

export type MenuContextType = {
  activeItem?: string,
  showSub: boolean
  subChild: ReactNode | null
  subTrigger: HTMLElement | null
  inline: boolean
  setContext: Function
}

