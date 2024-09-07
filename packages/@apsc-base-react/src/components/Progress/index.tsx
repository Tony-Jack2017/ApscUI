import {forwardRef, useEffect, useRef} from "react";
import classNames from "classnames";

interface ProgressItf {
  type: "circle" | "square"
  percent?: number
}

const Progress = forwardRef<HTMLDivElement, ProgressItf>((props, ref) => {

  const {
    type = "square",
    percent = 20
  } = props

  const progress = useRef<HTMLDivElement>(null)

  const classes = classNames([
    "apsc-progress",
    `progress-type-${type}`
  ])

  useEffect(() => {
    progress.current?.style.setProperty("--progress-percent", `${percent <= 100 ? percent : 100}%`)
  }, [percent])

  return (
    <div ref={progress} className={classes}>
      <div className="progress-content">
        <div className="progress-bg">
        </div>
        <span className="progress-slider">
      </span>
      </div>
      <span className="progress-tip">
        {percent}%
      </span>
    </div>
  )
})

export default Progress