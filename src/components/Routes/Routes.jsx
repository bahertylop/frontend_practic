import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import {ROUTES} from '../../utils/routes';
import ProductOnly from "../Products/ProductOnly";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import Favourites from "../Favourites/Favourites";


const AppRoutes = () => (
    <Routes>
        <Route index element = {<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductOnly />} />
        <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
    </Routes>   
)

export default AppRoutes