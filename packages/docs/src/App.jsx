import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/index.jsx"
const App = () => {
    return(
        <div id="app">
            <Routes>
                <Route element={<HomePage />} path="/" />
            </Routes>
        </div>
    )
}

export default App