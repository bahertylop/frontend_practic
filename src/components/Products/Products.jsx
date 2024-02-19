import React from 'react';

import styles from "../../styles/Products.module.css";
import { Link } from 'react-router-dom'; 

const Products = ({ brand, model, style = {},  products = [], amount }) => {
    const list = products.filter((_, i) => i < amount);

    return (
        <section className={styles.products} style={style}>
            {brand && <h2>{ brand }</h2>}

            <div className={styles.list}>
                {products.map(({ id, photos, brand, model, price}) => (
                    <Link to={`/products/${id}`} key={id} className={styles.product}>
                        <div 
                            className={styles.image} 
                            style={{ backgroundImage: `url(${photos[0]})`}} 
                        />
                        
                        <div className={styles.wrapper}> 
                            <h3 className={styles.title} style={{ marginBottom: '10px' }}>{brand + " " + model}</h3>
                            
                            {/* <div className={styles.cat}>{cat}</div> */}
                            <div className={styles.info}>
                                <div className={styles.prices}>
                                    {/* <div className={styles.price}>{Math.floor(price * 0.8)}$</div> */}
                                    <div className={styles.price}>
                                        {price}$
                                    </div>
                                </div>

                                <div className={styles.putchases}>
                                    {Math.floor(Math.random() * 20 + 1)} putchased
                                </div>
                            </div>                            
                        </div>
                    </Link>
                ))}
            </div>       
        </section>
    );
};



export default Products;