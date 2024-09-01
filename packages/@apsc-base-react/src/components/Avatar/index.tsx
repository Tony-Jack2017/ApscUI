import classNames from "classnames";
import {FC} from "react";
import Icon from "../../tools/Icon";

interface AvatarItf {
  shape?: "circle" | "square"
  label?: string
  src?: string
  size?: number | string | "normal" | "small" | "large"
}

const Avatar:FC<AvatarItf> = (props) => {

  const {
    shape = "circle",
    label,
    src,
    size = "normal"
  } = props

  const classes = classNames([
    "apsc-avatar",
    `avatar-shape-${shape}`,
    {[`avatar-size-${size}`] : (size == "normal" || size == "small" || size == "large") }
  ])

  const innerStyle = {
    width: size,
    height: size
  }

  return (
    <div className={classes} style={(size !== "normal" && size !== "small" && size !== "large") ? innerStyle : undefined}>
      <div className="apsc-avatar-content">
        {
          src
            ? <img src={src} alt="avatar" />
            : label ? <span>{ label }</span> : <Icon icon="bxs-user" style={{ color: "white" }} />
        }
      </div>
    </div>
  )
}

export default Avatar