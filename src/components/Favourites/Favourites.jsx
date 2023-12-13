import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/Cart.module.css";
import productsStyles from "../../styles/Products.module.css";
//import { sumBy } from '../../utils/common';
import { addItemToFavourites, removeItemFromFavourites } from '../../features/user/userSlice';

const Favourites = () => {
    const dispatch = useDispatch();

    const { favourites } = useSelector(( { user }) => user);
    console.log(favourites);

    // const changeQuantity = (item) => {
    //     dispatch(addItemToFavourites({...item}));
    // };

    const deleteItem = (item) => {
        dispatch(removeItemFromFavourites(item.id));
    };

  return (
    <section className={styles.cart}>
        <h2 className={styles.title}> Your favourites </h2>

        {!favourites.length ? (
            <div className={styles.empty}>Your favourite products is empty.</div>
        ) : (
            <>
            <div className={styles.list}>
                {cart.map((item) => {
                    const { title, category, images, price, id} = item
                    return (
                        <div className={styles.item} key={id}>
                            <div 
                                className={styles.image}
                                style={{ backgroundImage: `url(${images[0]})`}}
                            />
                            <div className={styles.info}>
                                <h3 className={styles.name}>{title}</h3>
                                <div className={styles.category}>{category.name}</div>
                            </div>

                            <div className={styles.price}>{price}$</div>

                            {/* <div className={styles.quantity}>
                                <div className={styles.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                                    <svg className="icon">
                                        <use 
                                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                                        />
                                    </svg>
                                </div>

                                <span>{quantity}</span>
                                <div className={styles.plus} onClick={() => changeQuantity(item, Math.min(1000, quantity + 1))}>
                                    <svg className="icon">
                                        <use 
                                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                                        />
                                    </svg>
                                </div>
                            </div> */}
                            {/* <div className={styles.total}>{price * quantity}$</div> */}

                            <div className={styles.close} onClick={() => deleteItem(item)}>
                                <svg className="icon">
                                    <use 
                                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                                    />
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* <div className={styles.actions}>
                <div className={styles.total}>
                    TOTAL PRICE: {" "}
                    <span>
                        {sumBy(cart.map(({ quantity, price}) => quantity * price))}$
                    </span>
                </div>

                <button className={styles.proceed}> Buy Now </button>
            </div> */}
            </>
        )}

    </section>
  )
}

export default Favourites;
