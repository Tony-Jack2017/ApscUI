import {createBrowserRouter} from "react-router-dom";

//  Layout
import HomePage from "../pages/home";
import ComponentsPage from "../pages/components";
import DevelopPage from "../pages/develop";

import ButtonPage from "../pages/components/base/button";
import NotFoundPage from "../pages/common/not_found";
import SwitchPage from "../pages/components/base/switch";
import ListPage from "../pages/components/data-display/list";
import TablePage from "../pages/components/data-display/table";
import InputPage from "../pages/components/data-import/input";
import SelectPage from "../pages/components/data-import/select";

import DesignColorPage from "../pages/develop/Design/color";
import DesignFontPage from "../pages/develop/Design/font";

import TestPage from "../pages/test/index"


const router=  createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/components",
        element: <ComponentsPage />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "base",
                children: [
                    {
                        path: "button",
                        element: <ButtonPage />
                    },
                    {
                        path: "switch",
                        element: <SwitchPage />
                    }
                ]
            },
            {
                path: "display",
                children: [
                    {
                        path: "list",
                        element: <ListPage />
                    },
                    {
                        path: "table",
                        element: <TablePage />
                    }
                ]
            },
            {
                path: "import",
                children: [
                    {
                        path: "input",
                        element: <InputPage />
                    },
                    {
                        path: "select",
                        element: <SelectPage />
                    }
                ]
            }
        ]
    },
    {
        path: "/develop",
        element: <DevelopPage />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "design",
                children: [
                    {
                        path: "color",
                        element: <DesignColorPage />
                    },
                    {
                        path: "font",
                        element: <DesignFontPage />
                    }
                ]
            },
        ]
    },
    {
        path: "/test",
        element: <TestPage />
    }
])

export default router
