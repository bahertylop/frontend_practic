import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Products from '../Products/Products';
import styles from "../../styles/Category.module.css";


// добавить имя категории

const Category = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    // const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/categories/${id}`);
                const data = response.data;
                setProducts(data);
                // if (data.length > 0) {
                //     // Устанавливаем имя категории из первого продукта в списке
                //     setCategoryName(data[0].category.name);
                // }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id]);

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Shoes</h2>
            <Products products={products} style={{ padding: 0 }} amount={products.length} />
        </section>
    );
};

export default Category;