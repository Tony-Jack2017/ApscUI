import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/home";
import ComponentsPage from "../pages/components";
import ButtonPage from "../pages/components/base/button";
import NotFoundPage from "../pages/common/not_found";

const router=  createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/components",
        element: <ComponentsPage />,
        children: [
            {
                path: "base",
                children: [
                    {
                        path: "button",
                        element: <ButtonPage />
                    }
                ]
            },
        ]
    }
])

export default router