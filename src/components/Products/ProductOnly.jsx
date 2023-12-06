import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductById } from '../../features/products/productOnly.js';

const ProductOnly = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const data = getProductById(parseInt(id, 10))
    
    // const { data } = getProduct({ id });

    

    console.log(data);
    return (
        <div>ITEM</div>
    )
}

export default ProductOnly
