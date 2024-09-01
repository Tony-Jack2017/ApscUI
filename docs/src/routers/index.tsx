import {createBrowserRouter} from "react-router-dom";
import FlexPage from "../pages/component/layout/flex";
import DashboardPage from "../pages/home/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />
  }
])

export default router