import {forwardRef, useEffect, useRef, useState} from "react";
import WrapPortal, {Position} from "../../tools/Potarl";
import classNames from "classnames";
import {ComWithChild} from "../../types/common";


interface PopoverItf extends ComWithChild {
  open: boolean
  anchorEl: HTMLElement
  anchorPos?: "top" | "bottom" | "left" | "right"
  arrowPos?: "start" | "center" | "end"
  arrowInAnchorPos?: "start" | "center" | "end"
  onClose?: () => void
}


const Popover = forwardRef<HTMLDivElement, PopoverItf>((props, ref) => {

  const {
    open,
    anchorEl,
    anchorPos = "bottom",
    arrowPos = "start",
    arrowInAnchorPos = "start",
    onClose,
    children
  } = props


  const wrap = useRef<HTMLDivElement| null>(null)
  const [position, setPosition] = useState<Position>({
    top: 0, left: 0, width: 0, height: 0
  })

  useEffect(() => {
    if(anchorEl) {
      setPosition({
        top: 0,
        left: 0,
        width: anchorEl.offsetWidth,
        height: anchorEl.offsetHeight
      })
    }
  }, [anchorEl])


  const classes = classNames([
    "apsc-popover"
  ])

  return (
    <WrapPortal
      show={open}
      contentPos="anchor"
      position={position}
      maskVisible={false}
      onClose={onClose}
    >
      <div className={classes}>
        <div></div>
        <div className="apsc-popover-content">
          { children }
        </div>
      </div>
    </WrapPortal>
  )
})


export default Popover