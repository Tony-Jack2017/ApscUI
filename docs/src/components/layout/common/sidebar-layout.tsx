import Header from "../base/header";
import React, {ReactElement} from "react";
import Container from "../base/container";

type SidebarLayoutProps = {
    children : ReactElement[]
}

const SidebarLayout:React.FC<SidebarLayoutProps> = ({children}) => {
    return (
        <div className="apsc-docs-sidebar-layout">
            <Header />
            <main className="apsc-docs-layout-content">
                <div className="layout-content-sidebar">
                    {children[0]}
                </div>
                <div className="layout-content-main">
                    <Container type="page">
                        {children[1]}
                    </Container>
                </div>
            </main>
        </div>
    )
}

export default SidebarLayout