import {RouterProvider} from "react-router"

// styles
import "./src/styles/common.less"

import router from "./src/router";

const App = () => {
    return (
        <div id="app">
            <RouterProvider router={router} />
        </div>
    )
}

export default App