import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import styles from "../../styles/Cart.module.css";
import productsStyles from "../../styles/Favourites.module.css";
import { addItemToFavourites, removeItemFromFavourites } from '../../features/user/userSlice';



const Favourites = () => {
    const dispatch = useDispatch();

    const { favourites } = useSelector(( { user }) => user);
    
    console.log(favourites);

    const deleteItem = (id) => {
        dispatch(removeItemFromFavourites(id));
    };

  return (
    <section className={productsStyles.products}>
        <h2 className={styles.title}> Your favorites </h2>

        {!favourites.length ? (
            <div className={styles.empty}>Your favorite products is empty.</div>
        ) : (
            <div className={productsStyles.list}>
                {favourites.map(({id, images, title, category: { name: cat}, price}) => (
                    <div key={id} className={productsStyles.productContainer}>
                    <Link to={`/products/${id}`} key={id} className={productsStyles.product}>
                        <div 
                            className={productsStyles.image} 
                            style={{ backgroundImage: `url(${images[0]})`}} 
                        />
                        
                        <div className={productsStyles.wrapper}> 
                            <h3 className={productsStyles.title}>{title}</h3>
                            <div className={productsStyles.cat}>{cat}</div>
                            <div className={productsStyles.info}>
                                <div className={productsStyles.prices}>
                                    <div className={productsStyles.price}>
                                        {price}$
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </Link>

                    <button 
                        className={productsStyles.button}
                        onClick={() => deleteItem(id)}
                    >
                        Remove    
                    </button>  
                    </div>
                    
                    
                ))}
            </div>
        )}

    </section>
  )
}

export default Favourites;
