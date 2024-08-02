import React, {ReactNode} from 'react';
import WrapPortal from "../../common/hoc/wrapPortal";

interface DialogItf {
  open?: boolean
  handleClose?: () => void
  children?: ReactNode
}

const Dialog: React.FC<DialogItf> = (props) => {

  const { open = false,  handleClose,  children} = props

  const innerClose = () => {
    if(handleClose) {
      handleClose()
    }
  }

  return (
    <WrapPortal show={open} onClose={innerClose}>
      <div className="apsc-dialog">
        { children ? children : "This is Dialog" }
      </div>
    </WrapPortal>
  )
}

export default Dialog