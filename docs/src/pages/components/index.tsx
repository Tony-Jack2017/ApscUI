import {Outlet} from "react-router-dom";
import SidebarLayout from "../../components/layout/common/sidebar-layout";
import CompSidebar from "../../components/layout/base/sidebar";
import {CompMenuList} from "../../common/menus";

const ComponentsPage = () => {
    return (
        <div className="apsc-docs-component-page">
            <SidebarLayout>
                <CompSidebar list={CompMenuList} />
                <Outlet />
            </SidebarLayout>
        </div>
    )
}

export default ComponentsPage