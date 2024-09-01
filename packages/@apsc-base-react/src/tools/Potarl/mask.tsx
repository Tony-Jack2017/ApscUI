import {forwardRef, MouseEventHandler} from "react";

interface WrapMaskItf {
  onClick?: MouseEventHandler
}

const WrapMask= forwardRef<HTMLDivElement, WrapMaskItf>((props, ref) => {
  const { onClick } = props
  const handleClick: MouseEventHandler = (event) => {
    if (onClick) onClick(event)
  }
  return (
    <div ref={ref} className="apsc-wrap-mask" onClick={handleClick}></div>
  )
})

export default WrapMask
