import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";

const RouteHandler = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/:title/details" element={<Details />} />
        </Routes>
    )
};

export default RouteHandler;