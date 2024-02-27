import React, { useEffect, useState } from 'react'
import styles from "../../../styles/Cart.module.css";
import styles2 from "../../../styles/User.module.css";
import axios from 'axios';
import { ROUTES } from '../../../utils/routes';
import { Link } from 'react-router-dom';

const TypesAdm = () => {
    const [products, setProducts] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);
    const [typesInStock, setInStock] = useState(true)

    const [brandInput, setBrandInput] = useState("");
    const [modelInput, setModelInput] = useState("");
    const [priceInput, setPriceInput] = useState();
    const [colorInput, setColorInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [categoryIdInput, setCategoryIdInput] = useState();
    const [photo_1, setPhoto1Input] = useState("");
    const [photo_2, setPhoto2Input] = useState("");
    const [photo_3, setPhoto3Input] = useState("");
    const [photo_4, setPhoto4Input] = useState("");
    const [photo_5, setPhoto5Input] = useState("");

    useEffect(() => {
        var url = "http://localhost:8080/api/adm/types/inStock"; 
        if (typesInStock === false) {
            url = "http://localhost:8080/api/adm/types/notInStock"
        }
        axios.get(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch(error => {
            // window.location.href = ROUTES.HOME;
            console.error("error fetching data:", error);
            setAuth("login to adm to open this page");
            
        })
        .finally(() => {
            setLoading(false); // Устанавливаем флаг загрузки обратно в false после завершения запроса
        });
    }, [loading, typesInStock]);

    const takeNotInStock = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/adm/types/takeNotInStock/${id}`, {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                // setCartPositions(cartPositions.filter(item => item.shoeType.id !== shoeTypeId));
                setLoading(true);
            } else {
                console.error("Failed to change inStock");
            }
        } catch (error) {
            console.error('Error change inStock:', error);
        }
    };

    const takeInStock = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/adm/types/takeInStock/${id}`, {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                // setCartPositions(cartPositions.filter(item => item.shoeType.id !== shoeTypeId));
                setLoading(true);
            } else {
                console.error("Failed to change inStock");
            }
        } catch (error) {
            console.error('Error change inStock:', error);
        }
    };

    const addType = async (brand, model, description, color, price, photo1, photo2, photo3, photo4, photo5, categoryId ) => {
        try {
            const response = await fetch('http://localhost:8080/api/adm/types/add', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({brand: brand, model: model, description: description, color: color, price: price, 
                photos: [photo1, photo2, photo3, photo4, photo5], categoryId: categoryId}),
            });
            if (response.ok) {
                setLoading(true);
            } else {
                console.error("Failed to add type");
                console.error(response.text());
            }
        } catch (error) {
            console.error('Error adding type:', error);
        }
    };

  return (
    <section className={styles.cart}>
        <h2 className={styles.title}> Types panel </h2>

        {auth !== "" && (
                <div className={styles.empty}>Forbidden (only for adm)</div>
            )}

        <button className={styles.proceed} onClick={() => {
                setInStock(!typesInStock);
            }}>inStock: {typesInStock}</button>

        {!products.length  && auth === "" ? (
            <div className={styles.empty}>No types</div>
        ) : (
            <>
            <div className={styles.list}> 
                {products.map((item) => {
                    const { id, brand, model, photos, color, price, inStock} = item
                    return (
                        
                        <div className={styles.item} key={id}>
                            <div 
                                className={styles.image}
                                style={{ backgroundImage: `url(${photos[0]})`}}
                            />
                            <Link to={`${id}`} key={id}>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{brand + " " + model}</h3>
                                <div className={styles.category}>{color}</div>
                            </div>
                            </Link>
                            <div className={styles.price}>{price}$</div>

                            <button className={styles.proceed} onClick={() => {
                                if (inStock === true) {
                                    takeNotInStock(id);
                                } else {
                                    takeInStock(id);
                                }
                            }}>change inStock</button>
                        </div>
                    );
                })}
            </div>
            </>
        )}

        
        <div className={styles2.title}>New type</div>
        
        <form className={styles2.form} onSubmit={(e) => {
            e.preventDefault();
            addType(brandInput, modelInput, descriptionInput, colorInput, priceInput, photo_1, photo_2, photo_3, photo_4, photo_5, categoryIdInput);
        }}>

            
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="brand"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="model"
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="number"
                placeholder="categoryId"
                value={categoryIdInput}
                onChange={(e) => setCategoryIdInput(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="description"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="number"
                placeholder="price"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="photo1 URL"
                value={photo_1}
                onChange={(e) => setPhoto1Input(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="photo2 URL"
                value={photo_2}
                onChange={(e) => setPhoto2Input(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="photo3 URL"
                value={photo_3}
                onChange={(e) => setPhoto3Input(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="photo4 URL"
                value={photo_4}
                onChange={(e) => setPhoto4Input(e.target.value)}
                required
            />
            </div>
            <div className={styles2.group}>
            <input
                type="text"
                placeholder="photo5 URL"
                value={photo_5}
                onChange={(e) => setPhoto5Input(e.target.value)}
                required
            />
            </div>
            <button type="submit">Add Category</button>
        </form>
        

    </section>
  )
}

export default TypesAdm;
