import {FormEventHandler, forwardRef, ReactNode, useRef} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";

export interface EntryItf {
  label?: string | ReactNode
  placeholder?: string
  styleType?: "normal" | "outline" | "inner"
  type?: string
  prefix?: string | ReactNode
  suffix?: string | ReactNode
}

const entryReducer = (
  draft: { active: boolean; value: any; },
  action: { type: any; payload?: { value: any; }; }
) => {
  switch (action.type) {
    case "focus":
      draft.active = true; break
    case "blur":
      draft.active = false; break
    case "value":
      draft.value = action.payload ? action.payload.value : ""; break
  }
}

const Entry  = forwardRef<HTMLInputElement, EntryItf>((props, ref) => {

  const {
    label ,
    placeholder,
    styleType  = "normal",
    type = "text"
  } = props

  const [innerState, setInnerState] = useImmerReducer(entryReducer, {
    active: false,
    value: "",
    msgTip: ""
  })
  const inner = useRef<HTMLInputElement>(null)


  const classes = classNames([
    "apsc-entry",
    `apsc-entry-type-${styleType}`,
    { "apsc-entry-active": innerState.active },
    { "entry-has-value": !innerState.active && innerState.value }
  ])
  const handleFocus = () => {
    setInnerState({type: "focus"})
    if(inner.current) {
      inner.current.focus()
    }
  }
  const handleBlur = () => {
    setInnerState({type: "blur"})
  }


  const handleInput:FormEventHandler<HTMLInputElement> = (el) => {

    const target = el.target as HTMLInputElement

    setInnerState({
      type: "value",
      payload: {
        value: target.value
      }
    })
  }

  return (
    <div className={classes}>
      <div className="entry-main" tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
        <div className="entry-label">
          <label>
            {label}
          </label>
        </div>
        <div className="entry-content">
          <div className="entry-prefix">
          </div>
          <div className="entry-inner">
            <input ref={inner} value={innerState.value} onInput={handleInput} type={type} placeholder={placeholder} />
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