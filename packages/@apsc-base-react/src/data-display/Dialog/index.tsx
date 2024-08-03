import React, {ReactNode} from 'react';
import WrapPortal from "../../common/hoc/wrapPortal";

interface DialogItf {
  open?: boolean
  title?: string
  onClose?: () => void
  children?: ReactNode
}

const DialogTitle: React.FC<{children: ReactNode}> = (props) => {
  return (
    <div className="apsc-dialog-title">
      { props.children }
    </div>
  )
}

const Dialog: React.FC<DialogItf> = (props) => {
  const { open = false, title, onClose, children} = props
  const innerClose = () => {
    if(onClose) {
      onClose()
    }
  }
  return (
    <WrapPortal show={open} onClose={innerClose}>
      <div className="apsc-dialog">
        { title && <DialogTitle>{ title }</DialogTitle> }
        { children ? children : "This is Dialog" }
      </div>
    </WrapPortal>
  )
}


export default Dialog