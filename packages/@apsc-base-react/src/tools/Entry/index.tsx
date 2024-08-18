import {forwardRef, ReactNode, useState} from "react";
import classNames from "classnames";

export interface EntryItf {
  label?: string | ReactNode
  styleType?: "normal" | "outline" | "inner"
  type?: string
  prefix?: string | ReactNode
  suffix?: string | ReactNode
}

const Entry  = forwardRef<HTMLInputElement, EntryItf>((props, ref) => {

  const {
    label ,
    styleType  = "normal",
    type = "text"
  } = props

  const [innerState, setInnerState] = useState({
    active: false,
    msgTip: ""
  })

  const classes = classNames([
    "apsc-entry",
    `apsc-entry-type-${styleType}`,
    { "apsc-entry-active": innerState.active }
  ])

  const handleFocus = () => {
    console.log(111)
    setInnerState({
      active: true,
      msgTip: ""
    })
  }

  return (
    <div className={classes}>
      <div className="entry-main" tabIndex={0} onFocus={handleFocus}>
        <div className="entry-label">
          <label>
            {label}
          </label>
        </div>
        <div className="entry-content">
          <div className="entry-prefix">
          </div>
          <div className="entry-inner">
            <input type={type} />
          </div>
          <div className="entry-suffix">
          </div>
        </div>
      </div>
      <div className="entry-tip">
        { innerState.msgTip }
      </div>
    </div>
  )
})

export default Entry