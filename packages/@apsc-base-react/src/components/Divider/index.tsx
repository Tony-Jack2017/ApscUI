import {CSSProperties, forwardRef, ReactNode, useEffect, useRef} from "react";
import classNames from "classnames";

interface DividerItf {
  type?: "vertical" | "horizontal"
  content?: ReactNode
  contentPos?: "start" | "center" | "end"
  color?: CSSProperties["color"]
}

const Divider = forwardRef<HTMLDivElement, DividerItf>((props, ref) => {

  const {
    type= "horizontal",
    content,
    contentPos = "center",
    color = "#cdcfd6"
  } = props

  const divider = useRef<HTMLDivElement | null>(null)

  const classes = classNames([
    "apsc-divider",
    `divider-pos-${contentPos}`
  ])

  useEffect(() => {
    if(color) {
      divider.current?.style.setProperty("--color", color)
    }
  }, [color])

  return (
    <div ref={divider} className={classes}>
      {
        content && (
          <div className="divider-content">
            { content }
          </div>
        )
      }
    </div>
  )
})


export default Divider