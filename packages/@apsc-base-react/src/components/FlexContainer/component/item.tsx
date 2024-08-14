import {forwardRef, ReactNode} from "react";

export interface ItemItf {
  span?: number
  offset?: number
  limit?: [string| number, string | number]
  children?: ReactNode
}

const Item = forwardRef<HTMLDivElement, ItemItf>((props, ref) => {
  const {
    span = 4,
    offset = 0,
    limit,
    children
  } = props

  const innerStyle = {
    width: span / 24,
    margin: offset / 24,
    minWidth: limit ? limit[0] : span / 24,
    maxWidth: limit ? limit[0] : span / 24
  }

  return (
    <div ref={ref} className="apsc-flex-item" style={innerStyle}>
      { children }
    </div>
  )
})

export default Item