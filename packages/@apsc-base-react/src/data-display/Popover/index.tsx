import React, {ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import {createPortal} from "react-dom";
import WrapPortal from "../../common/hoc/wrapPortal";

interface PopoverItf {
  visible: boolean
  onClose?: () => void
  children?: ReactNode
}

const Popover:React.FC<PopoverItf> = (props) => {

  const { visible, onClose, children } = props

  const [open, setOpen] = useState(false)

  const classes = classNames([
    "apsc-popover"
  ])

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  const innerClose = () => {
    setOpen(false)
    if(onClose) { onClose() }
  }


  return (
    <WrapPortal backVisible={false} onClose={innerClose} show={open}>
      <div className={classes}>
        { children }
      </div>
    </WrapPortal>

  )
}

export default Popover
