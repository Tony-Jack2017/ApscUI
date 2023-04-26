import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/index"
import BlogPage from "./pages/blog/index"
const App = () => {
    return(
        <div id="app">
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<BlogPage />} path="blog" />
            </Routes>
        </div>
    )
}

export default App