import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import {ROUTES} from '../../utils/routes';
import ProductOnly from "../Products/ProductOnly";


const AppRoutes = () => (
    <Routes>
        <Route index element = {<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductOnly />} />
    </Routes>   
)

export default AppRoutes