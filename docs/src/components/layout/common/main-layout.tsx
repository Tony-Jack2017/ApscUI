import React from "react"
import Header from "../base/header";

type MainLayoutProps = {
    children?: React.ReactNode
}

const MainLayout:React.FC<MainLayoutProps> = (props) => {
    return (
        <div className="apsc-docs-main-layout">
            <Header />
            <main className="apsc-docs-layout-content">
                {props.children}
            </main>
        </div>
    )
}

export default MainLayout