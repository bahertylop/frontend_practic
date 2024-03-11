import React, { useEffect, useState } from "react";
import axios from "axios";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
    const [shoeTypes, setShoeTypes] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/home", {
            
        }) 
            .then(response => {
                // console.log(response.data);
                setShoeTypes(response.data.shoeTypes);
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Sidebar categories={categories}/>
            <Poster products={shoeTypes} />
            <Categories products={categories} title="CATEGORIES" />
            <Products products={shoeTypes} amount={5} title="IN STOCK" />
        </>
    );
};

export default Home;