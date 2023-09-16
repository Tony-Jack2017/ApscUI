
// components
import NavRight from "./components/nav-right";

// resource
import logo from "../../../../assets/common/logo/logo.png"

// constants
const version = "v1.0.0"

const Header = () => {
    return (
        <div className="apsc-docs-layout-header">
            <div className="layout-header-left">
                <img className="apsc-docs-logo" src={logo} alt="apsc-docs-logo" />
                <div className="apsc-docs-version">
                    {version}
                </div>
            </div>
            <div className="layout-header-right">
                <NavRight />
            </div>
        </div>
    )
}

export default Header
