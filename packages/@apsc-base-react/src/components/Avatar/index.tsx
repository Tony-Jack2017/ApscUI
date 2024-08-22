import classNames from "classnames";

interface AvatarItf {
  shape: "circle" | "square"
}

const Avatar = () => {

  const classes = classNames([
    "apsc-avatar"
  ])

  return (
    <div className={classes}>

    </div>
  )
}