import SidebarLayout from "../../components/layout/common/sidebar-layout";
import CompSidebar from "../../components/layout/base/sidebar";
import {Outlet} from "react-router-dom";
import {DevelopMenuList} from "../../common/menus";

const DevelopPage = () => {
    return (
        <div className="develop-page">
            <SidebarLayout>
                <CompSidebar list={DevelopMenuList} />
                <Outlet />
            </SidebarLayout>
        </div>
    )
}


export default DevelopPage