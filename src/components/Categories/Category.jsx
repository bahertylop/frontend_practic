import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { filterById } from '../../features/products/productsSlice';
import styles from "../../styles/Category.module.css";
import Products from '../Products/Products';

const Category = () => {

    const { id } = useParams();
    const { list } = useSelector(({ categories }) => categories);

    const defaultValues = {
        title: "",
        price_min: 0,
        price_max: 0,
      };
    
    const defaultParams = {
        title: "",
        price_min: 0,
        price_max: 0,
        categoryId: id
      };

    const [categor, setCategor] = useState("");
    const [values, setValues] = useState(defaultValues);
    const [params, setParams] = useState(defaultParams);
    const products = filterById(id);

    useEffect(() => {
        if (!id) return;

        setParams({ ...defaultParams, categoryId: id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        

        setCategor(products[0].category.name)
    }, [list, id])

    console.log(list);
    console.log(categor);

    // const handleChange = ({ target: { value, name } }) => {
    //     setValues({ ...values, [name]: value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     setParams({ ...params, ...values });
    // };
    
    console.log(products);
  return (
    <section className={styles.wrapper}>
        <h2 className={styles.title}>{categor} </h2>

        {/* <form className={styles.filters} onSubmit={handleSubmit}>
            <div className={styles.filter}>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange} 
                    placeholder="Product name" 
                    value={values.title}
                />
            </div>   
            <div className={styles.filter}>
                <input 
                    type="number" 
                    name="price_min" 
                    onChange={handleChange} 
                    placeholder="0" 
                    value={values.price_min}
                />
            </div> 
            <div className={styles.filter}>
                <input 
                    type="number" 
                    name="price_max" 
                    onChange={handleChange} 
                    placeholder="0" 
                    value={values.price_max}
                />
            </div>  

            <button type="submit" hidden></button>
        </form> */}

        <Products title="" products={products} style={{ padding: 0}} amount={products.length} />
    </section>
  )
}

export default Category;