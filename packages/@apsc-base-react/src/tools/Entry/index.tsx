import {CSSProperties, FormEventHandler, forwardRef, ReactNode, useEffect, useRef} from "react";
import classNames from "classnames";
import {useImmerReducer} from "use-immer";

export interface EntryItf {
  label?: string | ReactNode
  placeholder?: string
  showLabel?: boolean
  styleType?: "normal" | "outline" | "inner"
  type?: string
  prefix?: string | ReactNode
  suffix?: string | ReactNode
  normalNoActive?: boolean
  onChange?: (value:any) => void

  backgroundColor?: CSSProperties["backgroundColor"]
  primaryColor?: CSSProperties["color"]
  innerHeight?: CSSProperties["height"]
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

function hexToRgb(hex: string) {
  // 移除哈希符号（#）
  hex = hex.replace(/^#/, '');

  // 如果是简写的十六进制颜色（如 #f00），则转换为长格式（#ff0000）
  if (hex.length === 3) {
    hex = hex.split('').map(function (hex) {
      return hex + hex;
    }).join('');
  }

  // 解析 R、G 和 B 值
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

const Entry  = forwardRef<HTMLDivElement, EntryItf>((props, ref) => {

  const {
    label ,
    prefix,
    suffix,
    placeholder,
    onChange,
    styleType  = "normal",
    showLabel = true,
    normalNoActive,
    type = "text",

    backgroundColor,
    primaryColor,
    innerHeight

  } = props

  const [innerState, setInnerState] = useImmerReducer(entryReducer, {
    active: false,
    value: "",
    msgTip: ""
  })
  const inner = useRef<HTMLInputElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const prefixRef = useRef<HTMLDivElement>(null)
  const suffixRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (root.current && backgroundColor) {
      root.current.style.setProperty("--inner-bg", backgroundColor)
      root.current.style.setProperty("--border-width", "1px")
      root.current.style.setProperty("--default-border-color", "transparent")
    }
    if (root.current && primaryColor) {
      root.current.style.setProperty("--primary-color", hexToRgb(primaryColor))
    }
    if (root.current && innerHeight) {
      root.current.style.setProperty("--inner-height", String(innerHeight))
    }
  }, [backgroundColor, primaryColor, innerHeight])

  useEffect(() => {
    if(prefix && prefixRef.current && root.current) {
      root.current.style.setProperty("--pre-width", `${prefixRef.current.offsetWidth}px`)
    }
    if(suffix && suffixRef.current && root.current) {
      root.current.style.setProperty("--suf-width", `${suffixRef.current.offsetWidth}px`)
    }
  }, [])

  const classes = classNames([
    "apsc-entry",
    `apsc-entry-type-${styleType}`,
    { "apsc-entry-active": (normalNoActive && styleType === "normal") ? false : innerState.active },
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
    if (onChange) { onChange(target.value) }
  }

  return (
    <div className={classes} ref={root}>
      <div className="entry-main" tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
        {
          showLabel && <div className="entry-label">
            <label>
              {label}
            </label>
          </div>
        }
        <div className="entry-content">
          <div ref={prefixRef} className="entry-prefix">
            { prefix }
          </div>
          <div className="entry-inner">
            <input ref={inner} value={innerState.value} onChange={handleInput} type={type} placeholder={placeholder} />
          </div>
          <div ref={suffixRef} className="entry-suffix">
            { suffix }
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