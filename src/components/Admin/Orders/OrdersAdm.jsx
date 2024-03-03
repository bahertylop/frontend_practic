import React, { useEffect, useState } from 'react'
import styles from "../../../styles/Cart.module.css";
import axios from 'axios';


const OrdersAdm = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/adm/orders', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            setOrders(response.data);
        })
        .catch(error => {
            console.error("error fetching data:", error);
            setAuth("login adm to open this page");
        })
        .finally(() => {
            setLoading(false); // Устанавливаем флаг загрузки обратно в false после завершения запроса
        });
    }, [loading]);

    return (
        <section className={styles.cart}>
            {auth !== "" && (
                <div className={styles.empty}>Forbidden (only for adm)</div>
            )}
    
            {auth === "" && orders.length > 0 && (
                <>
                    <h2 className={styles.title}> Orders </h2>
                    <div className={styles.list}>
                        {orders.map((item) => {
                            const { orderDate, totalSum, id, productListIds } = item;
                            return (
                                <div className={styles.address} key={id}>
                                    <div className={styles.info}>
                                        <h3 className={styles.name}>order number: {id}</h3>
                                        <h3 className={styles.name}>order date: {orderDate}</h3>
                                        <h3 className={styles.name}>order total sum: {totalSum}</h3>
                                        <h3 className={styles.name}>product ids: {productListIds.join(', ')}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
    )}
        </section>
    )
}

export default OrdersAdm;
