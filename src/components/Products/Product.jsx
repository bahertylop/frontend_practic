import React, { useEffect, useState } from 'react';

import styles from "../../styles/Product.module.css";
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { useDispatch } from 'react-redux';

import { addItemToCart, addItemToFavourites } from "../../features/user/userSlice";


const Product = ({item, sizes}) => {
    const { photos, title, price, description, color } = item;

    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState('');

    useEffect(() => {
        if (!photos.length) return;

        setCurrentImage(photos[0]);
    }, [photos])

    const addToCart = () => {
        dispatch(addItemToCart(item));
    }

    const addToFavourites = () => {
        console.log(item);
        dispatch(addItemToFavourites(item));
    }

    const sizesArray = Object.values(sizes);
    console.log(sizesArray);
  return (
    <section className={styles.Product}>
        <div className={styles.images}>
            <div 
                className={styles.current}
                style={{ backgroundImage: `url(${currentImage})`}}
            />
            {photos.map((image, i) => (
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
                <span>Color:</span>{color}
            </div>
            <div className={styles.sizes}>
                <span>Sizes:</span>
                <div className={styles.list}>
                    {sizesArray.map(size => (
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
                <button 
                    className={styles.add}
                    onClick={addToFavourites}
                >
                    Add to favourites
                </button>
                <button className={styles.favourite}>
                    <Link to={ROUTES.HOME}>Return to store</Link>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Product
