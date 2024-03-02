import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/Cart.module.css";
import { sumBy } from '../../utils/common';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const Cart = () => {
    const dispatch = useDispatch();
    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}));
    };

    const [cartPositions, setCartPositions] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);

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
        .finally(() => {
            setLoading(false); // Устанавливаем флаг загрузки обратно в false после завершения запроса
        });
    }, [loading]);

    const deleteFromCart = async (shoeTypeId, size) => {
        try {
            const response = await fetch('http://localhost:8080/api/cart/delete', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({shoeTypeId: shoeTypeId, size: size}),
            });
            if (response.ok) {
                // setCartPositions(cartPositions.filter(item => item.shoeType.id !== shoeTypeId));
                setLoading(true);
            } else {
                console.error("Failed to delete item");
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const minusQuantity = async (shoeTypeId, size) => {
        const itemToUpdate = cartPositions.find(item => item.shoeType.id === shoeTypeId && item.size === size);
        if (!itemToUpdate || itemToUpdate.quantity === 1) return;

        try {
            const response = await fetch('http://localhost:8080/api/cart/minus', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({shoeTypeId: shoeTypeId, size: size}),
            }); 
            if (response.ok) {
                setLoading(true);
            } else {
                console.error('Failed to minus quantity');
            }
        } catch (error) {
            console.error('Error minus quantity:', error);
        }
    }

    const plusQuantity = async (shoeTypeId, size) => {
        try {
            const response = await fetch('http://localhost:8080/api/cart/plus', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({shoeTypeId: shoeTypeId, size: size}),
            }); 
            if (response.ok) {
                setLoading(true);
            } else {
                console.error('Failed to plus quantity');
            }
        } catch (error) {
            console.error('Error plus quantity:', error);
        }
    }



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
                                <div className={styles.minus} onClick={() => minusQuantity(shoeType.id, size)}>
                                    <svg className="icon">
                                        <use 
                                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                                        />
                                    </svg>
                                </div>

                                <span>{quantity}</span>
                                <div className={styles.plus} onClick={() => plusQuantity(shoeType.id, size)}>
                                    <svg className="icon">
                                        <use 
                                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.total}>{shoeType.price * quantity}$</div>

                            <div className={styles.close} onClick={() => deleteFromCart(shoeType.id, size)}>
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

                
                <Link className={styles.proceed} to={ROUTES.ORDER}> Buy Now </Link>
            </div>
            </>
        )}

    </section>
  )
}

export default Cart
