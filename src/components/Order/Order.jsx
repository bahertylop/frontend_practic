import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/Cart.module.css";
import { sumBy } from '../../utils/common';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';
import axios from 'axios';
import { ROUTES } from '../../utils/routes';

const Order = () => {
    const dispatch = useDispatch();

    const [cartPositions, setCartPositions] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null); // Состояние для хранения выбранного адреса
    const [selectedCard, setSelectedCard] = useState(null);
    const [newAddress, setNewAddress] = useState("");
    const [newCardNumber, setNewCardNumber] = useState("");
    const [newPaySystem, setPaySystem] = useState("");
    const [newCardCVV, setNewCardCVV] = useState("");
    const [newCardDate, setNewCardDate] = useState("");
    const [cards, setCards] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/order/info', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            // console.log(response.data);
            setCartPositions(response.data.cart);
            setAddresses(response.data.addresses);
            setCards(response.data.cards);
        })
        .catch(error => {
            console.error("error fetching data:", error);
            setAuth("login to open cart");
        })
        .finally(() => {
            setLoading(false); // Устанавливаем флаг загрузки обратно в false после завершения запроса
        });
    }, [loading]);

    // Функция для обработки выбора адреса
    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
    };

    const addNewAddress = async () => {
        if (newAddress !== "") {
            try {
                const response = await fetch('http://localhost:8080/api/address/add', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: newAddress,
                });
                if (response.ok) {
                    setLoading(true);
                    setNewAddress("");
                } else {
                    console.error("Failed to add address");
                }
            } catch (error) {
                console.error("error adding new address:", error);
            }
        }
    };

    const addNewCard = async () => {
        if (newCardCVV !== "" && newCardDate !== "" && newCardNumber !== "" && newPaySystem !== "") {
            try {
                const response = await fetch('http://localhost:8080/api/cards/add', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({paySystem: newPaySystem,
                                                    cardNumber: newCardNumber,
                                                    cardCVV: newCardCVV,
                                                    cardDate: newCardDate }),
                });
                if (response.ok) {
                    setLoading(true);
                    setNewCardCVV("");
                    setNewCardDate("");
                    setPaySystem("");
                    setNewCardNumber("");
                } else {
                    console.error("Failed to add address");
                }
            } catch (error) {
                console.error("error adding new address:", error);
            }
        }
    };

    const createOrder = async () => {
        if (selectedAddress !== null && selectedCard !== null) {
            const totalSum = sumBy(cartPositions.map(({ quantity, shoeType}) => quantity * shoeType.price));
            try {
                const response = await fetch('http://localhost:8080/api/order/create', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderDto: {
                            addressId: selectedAddress.id,
                            cardId: selectedCard.id,
                            totalSum: totalSum
                        },
                        cart: cartPositions
                    }),
                });
                if (response.ok) {
                    setLoading(true);
                    window.location.href = ROUTES.HOME;
                } else {
                    console.error("Failed to add address");
                }
            } catch (error) {
                console.error("error adding new address:", error);
            }
        }
        
    };

    return (
        <section className={styles.cart}>
            {auth !== "" && (
                    <div className={styles.empty}>Login before</div>
                )}
            
            
            <h2 className={styles.title}> Your items </h2>
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
                                    <div className={styles.category}>quantity: {quantity}</div>
                                </div>

                                <div className={styles.price}>{shoeType.price}$</div>
                            </div>
                        );
                    })}
                </div>
                </>
            )}

            <h2>Your addresses</h2>
            <div className={styles.list}>
                    {addresses.map((address, index) => (
                        <div className={styles.address}>
                        <li key={index} onClick={() => handleAddressSelect(address)}>
                            {address.address}
                            {selectedAddress && selectedAddress.id === address.id && <span> (selected)</span>} {/* Отображение выбранного адреса */}
                        </li>
                        </div>
                    ))}
            
                <input className={styles.address} type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="new address"/> {/* Поле для ввода нового адреса */}
                    <button onClick={addNewAddress}>Add Address</button>
            </div>

            <h2>Your cards</h2>
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

            </div>


            <div className={styles.actions}>
                    <div className={styles.total}>
                        TOTAL PRICE: {" "}
                        <span>
                            {sumBy(cartPositions.map(({ quantity, shoeType}) => quantity * shoeType.price))}$
                        </span>
                    </div>

                    <button className={styles.proceed} onClick={createOrder}> Buy Now </button>
                </div>
            

        </section>
    )
}

export default Order;
