import React, {CSSProperties, forwardRef, ReactNode, useState} from "react";
import WrapPortal from "../../tools/Potarl";
import classNames from "classnames";
import Icon from "../../tools/Icon";

interface DialogItf {
  open: boolean
  width?: CSSProperties["width"]
  header?: ReactNode
  footer?: ReactNode
  title?: string
  defaultContent?: boolean
  children: ReactNode
  maskClose?: boolean
  onClose: (status: "success" | "failed" | "pending" | "again") => void
}

const Dialog = forwardRef<HTMLDivElement, DialogItf>((props, ref) => {

  const {
    open,
    width = "20%",
    header,
    footer,
    title,
    defaultContent = true,
    maskClose = false,
    children,
    onClose
  } = props

  const classes = classNames([
    "apsc-dialog"
  ])

  const innerStyle = {
    width
  }

  const handleClose = (status: "success" | "failed" | "pending" | "again") => {
    if (onClose) onClose(status)
  }

  return (
    <WrapPortal
      show={open}
      maskVisible={true}
      onClose={() => { onClose("again") } }
      closeType={maskClose ? "mask" : "outside"}
      posStyle={{ width }}
    >
      <div ref={ref} className={classes}>
        <div className="apsc-dialog-header">
          { header
            ? header
            : (
              <div className="default-header">
                <span>{ title ? title : "Title" }</span>
                <Icon icon="bx-x" haveBg={true} onClick={() => handleClose("again")} />
              </div>
            )
          }
        </div>
        <div className="apsc-dialog-content">
          { children }
        </div>
        <div className="apsc-dialog-footer">
          { footer
            ? footer
            : (
              <div className="default-footer">
                <div className="cancel-btn btn" onClick={() => handleClose("again")}>Cancel</div>
                <div className="confirm-btn btn" onClick={() => handleClose("success")}>Confirm</div>
              </div>
            )
          }
        </div>
      </div>
    </WrapPortal>
  )
})

export default Dialog