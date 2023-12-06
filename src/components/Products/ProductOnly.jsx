import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductById } from '../../features/products/productOnly.js';
import Product from './Product.jsx';

const ProductOnly = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();

    const data = getProductById(parseInt(id, 10))
    
    // const { data } = getProduct({ id });

    

    console.log(data);
    return ( 
        <div>
            <Product {...data} />
        </div>
    )
}

export default ProductOnly
