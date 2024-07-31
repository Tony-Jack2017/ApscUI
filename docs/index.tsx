import React from "react";
import { createRoot } from "react-dom/client";
import "./src/styles/main.less"
import store from "./src/store/store"
import App from "./App"
import {Provider} from "react-redux";

const root = createRoot(document.getElementById("root") as Element)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)