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
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXZrYTMyMDhAZ21haWwuY29tIiwiaWF0IjoxNzA4Mzc0OTk1LCJleHAiOjE3MDg0NzQ5OTV9.eWnQjzWx_5q9nwMoCg4cNv1N9rbJ8e9G0UEkfPCFFCI'
            }
        }) 
            .then(response => {
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
            <Categories products={categories} amount={3} title="CATEGORIES" />
            <Products products={shoeTypes} amount={5} title="IN STOCK" />
        </>
    );
};

export default Home;