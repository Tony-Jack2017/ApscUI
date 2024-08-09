import {FC} from "react";
import Item from "./component/item";
import {ComWithChild} from "../../types/common";

export interface FlexContainerItf extends ComWithChild {
  space: string | number
}

const FlexContainer:FC<FlexContainerItf> = (props) => {
  const {
    space ,
    children
  } = props

  const innerStyle = {
    gap: space
  }

  return (
    <div className="apsc-flex-container" style={innerStyle}>
      { children }
    </div>
  )
}

export {
  FlexContainer,
  Item,
}