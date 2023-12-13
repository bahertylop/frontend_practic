import React, { useEffect } from "react";
import Poster from "../Poster/Poster";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";
import { filterByPrice } from "../../features/products/productsSlice.js";
import Sidebar from "../Sidebar/Sidebar.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const {products: { list, filtered }, categories} = useSelector(( state ) => state)

    useEffect(() => {
        if (!list || !Array.isArray(list) || list.length === 0) return;

        dispatch(filterByPrice(80))
    }, [dispatch, list.length]);

    return (
        
        <>
            <Sidebar />
            <Poster products={list}/>
            <Categories products={categories.list} amount={3} title="CATEGORIES" />
            <Products products={list} amount={5} title="IN STOCK" />
            <Products products={filtered} amount={5} title="LESS 80$" />
        </>
    );
};

export default Home;