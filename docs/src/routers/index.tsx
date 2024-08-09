import {createBrowserRouter} from "react-router-dom";
import FlexPage from "../pages/component/layout/flex";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "home" },
      { path: "blog" },
      { path: "project" },
      {
        path: "component",
        children: [
          { path: "flex", element: <FlexPage /> }
        ]
      }
    ]
  }
])

export default router