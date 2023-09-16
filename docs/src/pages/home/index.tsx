import MainLayout from "../../components/layout/common/main-layout";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className="apsc-docs-home-page">
            <MainLayout>
                This is home page
                <Link to="/components" >
                    This is Components
                </Link>
            </MainLayout>
        </div>
    )
}

export default HomePage