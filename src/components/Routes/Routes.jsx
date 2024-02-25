import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import {ROUTES} from '../../utils/routes';
import ProductOnly from "../Products/ProductOnly";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import Favourites from "../Favourites/Favourites";
import SignInForm from "../User/SignInForm";
import SignUpForm from "../User/SignUpForm";
import CategoriesAdm from "../Admin/Categories/CategoriesAdm";
import TypesAdm from "../Admin/Products/TypesAdm";
import UsersAdm from "../Admin/Users/UsersAdm";


const AppRoutes = () => (
    <Routes>
        <Route index element = {<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductOnly />} />
        <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
        <Route path={ROUTES.LOGIN} element={<SignInForm />} /> 
        <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
        <Route path={ROUTES.CATEGORIESADM} element={<CategoriesAdm />} />
        <Route path={ROUTES.TYPESADM} element={<TypesAdm />} />
        <Route path={ROUTES.USERSADM} element={<UsersAdm />} />
    </Routes>   
)

export default AppRoutes