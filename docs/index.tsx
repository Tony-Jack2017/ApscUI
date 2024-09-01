import React from "react";
import { createRoot } from "react-dom/client";
import "@apsc/style/index.less"
import "@apsc/resource/index.css"
import {RouterProvider} from "react-router-dom";
import router from "./src/routers";

const root = createRoot(document.getElementById("root") as Element)


root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
)