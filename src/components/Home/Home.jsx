import React from "react";
import Poster from "../Poster/Poster";
import { useSelector } from "react-redux";
import Products from "../Products/Products.jsx";

const Home = () => {
    const {list} = useSelector(({ products }) => products)

    return (
        <>
            <Poster />
            <Products products={list} amount={5} title="IN STOCK" />
        </>
    );
};

export default Home;