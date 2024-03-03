import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/Cart.module.css";
import { sumBy } from '../../utils/common';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';
import axios from 'axios';
import { ROUTES } from '../../utils/routes';

const Profile = () => {
    const [account, setAccount] = useState(null);
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/profile', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            console.log(response.data);
            setAccount(response.data.accountDto);
            setOrders(response.data.orders);
        })
        .catch(error => {
            console.error("error fetching data:", error);
            setAuth("login to open profile");
        })
        .finally(() => {
            setLoading(false); // Устанавливаем флаг загрузки обратно в false после завершения запроса
        });
    }, [loading]);

    return (
        <section className={styles.cart}>
            {auth !== "" && (
                <div className={styles.empty}>Login before</div>
            )}

            {auth === "" && account !== null && (
                <>
                    <h2 className={styles.title}> Your Info </h2>
                    <div className={styles.info} >
                        <div className={styles.name2}>first name: {account.firstName}</div>
                        <div className={styles.name2}>last name: {account.lastName}</div>
                        <div className={styles.name2}>email: {account.email}</div>
                        <div className={styles.name2}>phone number: {account.phoneNumber}</div>
                        <div className={styles.name2}>personal sale: {account.personalSale}%</div>
                    </div>
                </>
            )}
    
            {auth === "" && orders.length > 0 && (
                <>
                    <h2 className={styles.title}> Your Orders </h2>
                    <div className={styles.list}>
                        {orders.map((item) => {
                            const { orderDate, totalSum, id } = item;
                            return (
                                <div className={styles.address} key={id}>
                                    <div className={styles.info}>
                                        <h3 className={styles.name}>order number: {id}</h3>
                                        <h3 className={styles.name}>order date: {orderDate}</h3>
                                        <h3 className={styles.name}>order total sum: {totalSum}</h3>
                                        {/* <div className={styles.category}>size: {size}</div>
                                        <div className={styles.category}>quantity: {quantity}</div> */}
                                    </div>
                                    {/* <div className={styles.price}>{shoeType.price}$</div> */}
                                </div>
                            );
                        })}
                    </div>
                </>
    )}

            {/* <h2>Your addresses</h2> */}
            {/* <div className={styles.list}> */}
                    {/* {addresses.map((address, index) => ( */}
                        {/* <div className={styles.address}> */}
                        {/* <li key={index} onClick={() => handleAddressSelect(address)}> */}
                            {/* {address.address} */}
                            {/* {selectedAddress && selectedAddress.id === address.id && <span> (selected)</span>} Отображение выбранного адреса */}
                        {/* </li> */}
                        {/* </div> */}
                    {/* ))} */}
            
                {/* <input className={styles.address} type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="new address"/> Поле для ввода нового адреса */}
                    {/* <button onClick={addNewAddress}>Add Address</button> */}
            {/* </div> */}

            {/* <h2>Your cards</h2>
            <div className={styles.list}>
                    {cards.map((card, index) => (
                        <div className={styles.address}>
                            <li key={index} onClick={() => handleCardSelect(card)}>
                                {card.cardNumber + " " + card.paySystem}
                                {selectedCard && selectedCard.id === card.id && <span> (selected)</span>}
                            </li>
                        </div>
                    ))}
                <input className={styles.address} type="number" value={newCardNumber} onChange={(e) => setNewCardNumber(e.target.value)} placeholder="new card number"/>
                <input className={styles.address} type="text" value={newCardDate} onChange={(e) => setNewCardDate(e.target.value)} placeholder="new data"/>
                <input className={styles.address} type="number" value={newCardCVV} onChange={(e) => setNewCardCVV(e.target.value)} placeholder="new cvv"/>
                <input className={styles.address} type="text" value={newPaySystem} onChange={(e) => setPaySystem(e.target.value)} placeholder="new pay system"/>
                    <button onClick={addNewCard}>Add Card</button>

            </div> */}


            {/* <div className={styles.actions}>
                    <div className={styles.total}>
                        TOTAL PRICE: {" "}
                        <span>
                            {sumBy(cartPositions.map(({ quantity, shoeType}) => quantity * shoeType.price))}$
                        </span>
                    </div>

                    <button className={styles.proceed} onClick={createOrder}> Buy Now </button>
                </div> */}
            

        </section>
    )
}

export default Profile;
