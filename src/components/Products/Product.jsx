import React, { useEffect, useState } from 'react';

import styles from "../../styles/Product.module.css";
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { useDispatch } from 'react-redux';

import { addItemToCart, addItemToFavourites } from "../../features/user/userSlice";

const SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5];

const Product = (item) => {
    const { images, title, price, description } = item;

    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState('');

    useEffect(() => {
        if (!images.length) return;

        setCurrentImage(images[0]);
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item));
    }

    const addToFavourites = () => {
        dispatch(addItemToFavourites(item));
    }

  return (
    <section className={styles.Product}>
        <div className={styles.images}>
            <div 
                className={styles.current}
                style={{ backgroundImage: `url(${currentImage})`}}
            />
            {images.map((image, i) => (
                <div 
                    key={i}
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})`}}
                    onClick={() => setCurrentImage(image)}
                />
            ))}  
        </div>
        <div className={styles.info}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.price}>
                <span>Price: </span> {price}$
            </div>
            <div className={styles.color}>
                <span>Color:</span> Green
            </div>
            <div className={styles.sizes}>
                <span>Sizes:</span>
                <div className={styles.list}>
                    {SIZES.map(size => (
                        <div
                            onClick={() => setCurrentSize(size)} 
                            key={size}
                            className={`${styles.size} ${currentSize === size ? styles.active : ''}`}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            <p className={styles.size}>{description}</p>

            <div className={styles.actions}>
                <button 
                    className={styles.add} 
                    disabled={!currentSize}
                    onClick={addToCart}
                >
                    Add to cart
                </button>
                <button className={styles.favourite}>Add to favourites</button>
                <button className={styles.favourite}>
                    <Link to={ROUTES.HOME}>Return to store</Link>
                </button>
            </div>
            
        </div>
    </section>
  )
}

export default Product
