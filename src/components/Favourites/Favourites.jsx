import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Cart.module.css';
import productsStyles from '../../styles/Favourites.module.css';
import prStyles from '../../styles/Products.module.css'
import axios from 'axios';
import { ROUTES } from '../../utils/routes';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [auth, setAuth] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/favourites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            // console.log(response.data);
            setFavourites(response.data);
        })
        .catch(error => {
        
            console.error("Error fetching data:", error);
            setAuth("login to open favourites");
            // window.location.href = ROUTES.LOGIN;
            });
            
        }, []);



     // Пустой массив зависимостей, чтобы запрос отправлялся только один раз при загрузке компонента

    const deleteItem = async (shoeTypeId) => {
        try {
            // Отправляем DELETE запрос на /api/favourites/:id
            const response = await fetch(`http://localhost:8080/api/favourites/delete`, {
                method: 'POST',
                credentials: 'include', // Для передачи куки с токеном авторизации
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({shoeTypeId: shoeTypeId}),
            });
            if (response.ok) {
                // Если запрос успешен, удаляем товар из состояния избранных товаров
                setFavourites(favourites.filter(item => item.id !== shoeTypeId));
            } else {
                console.error('Failed to delete favourite item');
            }
        } catch (error) {
            console.error('Error deleting favourite item:', error);
        }
    };

    return (
        <section className={productsStyles.products}>
            <h2 className={styles.title}> Your favorites </h2>
            {auth !== "" && (
                <div className={styles.empty}>Login before</div>
            )}

            {(!favourites.length && auth === "") ? (
                <div className={styles.empty}>Your favorite products is empty.</div>
            ) : (
                <div className={prStyles.list}>
                    {favourites.map(({ id, photos, brand, model, price }) => (
                        <div key={id} className={productsStyles.productContainer}>
                            <Link to={`/products/${id}`} key={id} className={productsStyles.product}>
                                <div className={prStyles.image} style={{ backgroundImage: `url(${photos[0]})` }} />

                                <div className={prStyles.wrapper}>
                                    <h3 className={prStyles.title} style={{ marginBottom: '10px' }}>{brand + " " + model}</h3>
                                    {/* <div className={productsStyles.cat}>{cat}</div> */}
                                    <div className={prStyles.info}>
                                        <div className={productsStyles.prices}>
                                            <div className={productsStyles.price}>{price}$</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <button className={productsStyles.button} onClick={() => deleteItem(id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Favourites;
