import classNames from "classnames";

interface LayoutItf {

}

const Layout = () => {

  const classes = classNames([
    "apsc-layout"
  ])

  return (
    <div className={classes}>
    </div>
  )
}

export default Layout
