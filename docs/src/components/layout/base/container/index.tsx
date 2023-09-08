import React from "react"

const Container = (props: any) => {
    return (
        <div className="apsc-docs-layout-container">
            {props.children}
        </div>
    )
}

export default Container