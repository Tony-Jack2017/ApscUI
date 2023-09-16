import MainLayout from "../../components/layout/common/main-layout";
import {Outlet} from "react-router-dom";

const ComponentsPage = () => {
    return (
        <div className="apsc-docs-component-page">
            <MainLayout>
                <Outlet />
            </MainLayout>
        </div>
    )
}

export default ComponentsPage