import React, { useEffect } from "react";
import Poster from "../Poster/Poster";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";
import { filterByPrice } from "../../features/products/productsSlice.js";

const Home = () => {
    const dispatch = useDispatch();
    const {products: { list, filtered }, categories} = useSelector(( state ) => state)

    useEffect(() => {
        if (!list.length) return;

        dispatch(filterByPrice(80))
    }, [dispatch, list.length]);

    return (
        <>
            <Poster />
            <Categories products={categories.list} amount={3} title="CATEGORIES" />
            <Products products={list} amount={5} title="IN STOCK" />
            <Products products={filtered} amount={5} title="LESS 80$" />
        </>
    );
};

export default Home;