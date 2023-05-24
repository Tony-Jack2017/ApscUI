import React from "react"
import { Routes, Route } from "react-router-dom"

// styles
import "./styles/common.less"

// pages
import HomePage from "./pages/home/index"
import BlogPage from "./pages/blog/index"
import ButtonPage from "./pages/components/base/button"

const App = () => {
    return (
        <div id="app">
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<BlogPage />} path="blog" />
                <Route element={<ButtonPage />} path="component/button" />
            </Routes>
        </div>
    )
}

export default App