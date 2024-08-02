import React, {ReactNode, useState} from "react";
import classNames from "classnames";
import {createPortal} from "react-dom";

interface PopoverItf {
  children?: ReactNode
}

const Popover:React.FC<PopoverItf> = (props) => {

  const { children } = props

  const [visible, setVisible] = useState(false)

  const classes = classNames([
    "apsc-popover"
  ])

  return (
    createPortal((
      <div>
        <div className={classes}>
          { children }
        </div>
      </div>

    ), document.body)

  )
}

export default Popover