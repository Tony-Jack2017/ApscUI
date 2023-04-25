import React from "react";
import TestComponent from "test"
import { Button } from "@apis/react"

const HomePage = () => {
    return (
        <div className="home-page">
            Home Page
            <Button />
            <TestComponent />
        </div>
    )
}

export default HomePage