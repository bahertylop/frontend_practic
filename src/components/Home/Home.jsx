import React from "react";
import Poster from "../Poster/Poster";
import { useSelector } from "react-redux";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";

const Home = () => {
    const {products, categories} = useSelector(( state ) => state)

    return (
        <>
            <Poster />
            <Categories products={categories.list} amount={3} title="CATEGORIES" />
            <Products products={products.list} amount={5} title="IN STOCK" />
        </>
    );
};

export default Home;