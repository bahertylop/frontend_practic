import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/Cart.module.css";
import { sumBy } from '../../utils/common';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';
import axios from 'axios';

const Cart = () => {
    const dispatch = useDispatch();

    // const { cart } = useSelector(( { user }) => user);
    // console.log(cart);

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}));
    };

    const deleteItem = (item) => {
        dispatch(removeItemFromCart(item.id));
    };

    const [cartPositions, setCartPositions] = useState([]);
    const [auth, setAuth] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/cart', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            console.log(response.data);
            setCartPositions(response.data);
        })
        .catch(error => {
            console.error("error fetching data:", error);
            setAuth("login to open cart");
        })
    }, []);

  return (
    <section className={styles.cart}>
        <h2 className={styles.title}> Your cart </h2>

        {auth !== "" && (
                <div className={styles.empty}>Login before</div>
            )}

        {!cartPositions.length  && auth === "" ? (
            <div className={styles.empty}>Your cart is empty.</div>
        ) : (
            <>
            <div className={styles.list}>
                {cartPositions.map((item) => {
                    const { shoeType, size, id, quantity } = item
                    return (
                        <div className={styles.item} key={id}>
                            <div 
                                className={styles.image}
                                style={{ backgroundImage: `url(${shoeType.photos[0]})`}}
                            />
                            <div className={styles.info}>
                                <h3 className={styles.name}>{shoeType.brand + " " + shoeType.model}</h3>
                                <div className={styles.category}>size: {size}</div>
                            </div>

                            <div className={styles.price}>{shoeType.price}$</div>

                            <div className={styles.quantity}>
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
                            </div>
                            <div className={styles.total}>{shoeType.price * quantity}$</div>

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

            <div className={styles.actions}>
                <div className={styles.total}>
                    TOTAL PRICE: {" "}
                    <span>
                        {sumBy(cartPositions.map(({ quantity, shoeType}) => quantity * shoeType.price))}$
                    </span>
                </div>

                <button className={styles.proceed}> Buy Now </button>
            </div>
            </>
        )}

    </section>
  )
}

export default Cart
