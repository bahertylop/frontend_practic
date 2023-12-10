import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { filterById } from '../../features/products/productsSlice';
import styles from "../../styles/Category.module.css";
import Products from '../Products/Products';

const Category = () => {

    const { id } = useParams();

    const defaultParams = {
        title: "",
        price_min: 0,
        price_max: 0,
        categoryId: id
    }

    const [ params, setParams] = useState(defaultParams)

    useEffect(() => {
        if (!id) return;

        setParams({ ...defaultParams, categoryId: id})
    }, [id])

    const products = filterById({ id });
    
    console.log(products);
  return (
    <section className={styles.wrapper}>
        <h2 className={styles.title}>Category</h2>

        <form className={styles.filters} onSubmit={() => {}}>
            <div className={styles.filter}>
                <input 
                    type="text" 
                    name="title" 
                    onChange={()=>{}} 
                    placeholder="Product name" 
                    value={params.title}
                />
            </div>   
            <div className={styles.filter}>
                <input 
                    type="number" 
                    name="price_min" 
                    onChange={()=>{}} 
                    placeholder="0" 
                    value={params.price_min}
                />
            </div> 
            <div className={styles.filter}>
                <input 
                    type="number" 
                    name="price_max" 
                    onChange={()=>{}} 
                    placeholder="0" 
                    value={params.price_max}
                />
            </div>  

            <button type="submit" hidden></button>
        </form>

        {/* {isLoading ? (
            <div className="preloader">Loading...</div>
        ): !isSuccess || !products.length ? (
            <div className={styles.back}>
                <span>No results</span>
                <button>Reset</button>
            </div>
        )} */}

        <Products title="" products={products} style={{ padding: 0}} amount={products.length} />
    </section>
  )
}

export default Category;
