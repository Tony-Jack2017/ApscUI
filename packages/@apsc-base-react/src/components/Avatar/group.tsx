import {forwardRef} from "react";
import classNames from "classnames";
import Avatar from "./index";
import Icon from "../../tools/Icon";

interface AvatarGroupItf {
  list: string[]
  shape?: "circle" | "square"
  size?: "small" | "normal" | "large" | number | string
  onClick?: (type: "item" | "list", data: string | string[]) => void
  maxNum?: number
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupItf>((props, ref) => {
  const {
    list,
    shape = "circle",
    size = "normal",
    onClick,
    maxNum = 4,
  } = props

  const classes = classNames([
    "apsc-avatar-group",
    `group-shape-${shape}`
  ])

  const handleClick = (type: "item" | "list", data: string | string[]) => {
    if (onClick) onClick(type, data)
  }

  return (
    <div className={classes}>
      {
        list.length <= 4
          ? list.map((item, index) => {
            return (
              <div key={index} className="apsc-avatar-item" onClick={() => handleClick("item", item)}>
                <Avatar shape={shape} src={item} size={size} />
              </div>
            )
          })
          : <>
            {
              list.slice(0, 4).map((item, index) => {
                return (
                  <div key={index} className="apsc-avatar-item" onClick={() => handleClick("item", item)}>
                    <Avatar shape={shape} src={item} size={size} />
                  </div>
                )
              })
            }
            <div className="apsc-avatar-item" onClick={() => handleClick("list", list)}>
              <Avatar shape={shape} size={size} label={<Icon icon="bx-dots-horizontal-rounded" />} />
            </div>
          </>
      }
    </div>
  )
})


export default AvatarGroup