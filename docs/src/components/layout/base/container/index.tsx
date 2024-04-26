import React, {ReactElement} from "react"
import classNames from "classnames";

export type ContainerProps = {
    type: "page" | "content"
    children: ReactElement[] | ReactElement
}

const Container:React.FC<ContainerProps> = (props) => {

    const { type, children } = props
    const classes = classNames([
        "apsc-docs-layout-container",
        `container-${type}`
    ])

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Container