import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import {ROUTES} from '../../utils/routes';


const AppRoutes = () => (
    <Routes>
        <Route index element = {<Home />} />
        <Route path={ROUTES.PRODUCT} element={<ProductOnly />} />
    </Routes>   
)

export default AppRoutes