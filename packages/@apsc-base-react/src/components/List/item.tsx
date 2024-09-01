import {forwardRef, ReactNode} from "react";
import classNames from "classnames";

export interface ListItemItf {
  isCus: boolean
  children: ReactNode
}

const ListItem = forwardRef<HTMLDivElement, ListItemItf>((props, ref) => {

  const {
    isCus,
    children
  } = props

  const classes = classNames([
    "apsc-list-item",
    { "list-item-default": !isCus }
  ])

  return (
    <div ref={ref} className={classes}>
      { children }
    </div>
  )
})

export default ListItem