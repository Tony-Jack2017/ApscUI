import "@apsc/style/src/components/common/mask.less"
import {forwardRef} from "react";

interface WrapMaskItf {
  onClick?: () => void
}

const WrapMask= forwardRef<HTMLDivElement, WrapMaskItf>((props, ref) => {
  const { onClick } = props
  const handleClick = () => {
    if (onClick) onClick()
  }
  return (
    <div ref={ref} className="apsc-wrap-mask" onClick={handleClick}></div>
  )
})

export default WrapMask