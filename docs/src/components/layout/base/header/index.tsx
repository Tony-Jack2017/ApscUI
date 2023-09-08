import React from "react"

// @ts-ignore
import logo from "../../../../assets/common/logo/logo.png"

const Header = () => {
    return (
        <div className="apsc-docs-layout-header">
            <img className="apsc-docs-logo" src={logo} alt="apsc-docs-logo" />
        </div>
    )
}

export default Header