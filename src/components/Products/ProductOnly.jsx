import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductById } from '../../features/products/productOnly.js';
import Product from './Product.jsx';
import Products from './Products.jsx';
import { getRelatedProducts } from '../../features/products/productsSlice.js';

const ProductOnly = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();

    const data = getProductById(parseInt(id, 10))

    const { list, related } = useSelector(({ products }) => products);
    
    // const { data } = getProduct({ id });

    useEffect(() => {
        if (!data || !list.length) return;
        if (data) {
            dispatch(getRelatedProducts(data.category.id));
        }
    }, [data, dispatch, list.length]);

    console.log(data);

    return ( 
        <div>
            <Product {...data} />
            <Products products={related} amount={5} title="RELATED PRODUCTS" />
        </div>
    )
}

export default ProductOnly
