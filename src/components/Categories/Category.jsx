import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { filterById } from '../../features/products/productsSlice';

const Category = () => {

    const { id } = useParams();

    useEffect(() => {

    }, [])

    const products = filterById({ id });
    console.log(id);
    console.log(products);
  return (
    <div>
      Category
    </div>
  )
}

export default Category;
