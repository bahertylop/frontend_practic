import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from './Product.jsx';
import Products from './Products.jsx';

const ProductOnly = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        // Функция для получения данных о продукте по его ID
        const getProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProductData(response.data.shoeTypeDto);
                setRelatedProducts(response.data.relatedShoeTypes);
                setSizes(response.data.sizes);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        // Вызываем функцию для получения данных о продукте
        getProductData();
    }, [id]);

    return (
        <div>
            {productData && <Product item={productData} sizes={sizes} />}
            {relatedProducts.length > 0 && <Products products={relatedProducts} amount={5} title="RELATED PRODUCTS" />}
        </div>
    );
};

export default ProductOnly;
