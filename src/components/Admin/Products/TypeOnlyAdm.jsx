import axios from "axios";
import { useParams } from "react-router-dom";
import styles2 from "../../../styles/User.module.css";
import styles from "../../../styles/Product.module.css";
import React, { useEffect, useState } from 'react';

const TypeOnlyAdm = () => {
    // id из запроса
    const { id } = useParams();

    // для информации о типе
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [currentImage, setCurrentImage] = useState('');

    // для формы обновления инфрмации
    const [brandInput, setBrandInput] = useState("");
    const [modelInput, setModelInput] = useState("");
    const [priceInput, setPriceInput] = useState(0);
    const [colorInput, setColorInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [categoryIdInput, setCategoryIdInput] = useState(0);
    const [photo_1, setPhoto1Input] = useState("");
    const [photo_2, setPhoto2Input] = useState("");
    const [photo_3, setPhoto3Input] = useState("");
    const [photo_4, setPhoto4Input] = useState("");
    const [photo_5, setPhoto5Input] = useState("");


    // для добавления пар
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState(0);

    // вспомогательные 
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);


    // устанавливаем значения для информации о типе
    useEffect(() => {
        axios.get(`http://localhost:8080/api/adm/products/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }, 
            withCredentials: true,
        })
        .then(response => {
            console.log(response.data);
            setProduct(response.data.shoeTypeDto);
            setSizes(response.data.sizes);
        })
        .catch(error => {
            console.error("error fetching data:", error);
            setAuth("login to adm to open this page");
        })
        .finally(() => {
            setLoading(false);
        });
        
    }, [loading]);

    const { photos, brand, model, price, description, color, categoryId } = product || {};
    
    useEffect(() => {
        if (!photos || photos.length == 0) return;

        setCurrentImage(photos[0]);
    }, [photos])

    const addNewPairs = async (quantity, size) => {
        if (quantity > 0 && size > 0) {
            try {
                const response = await fetch(`http://localhost:8080/api/adm/products/${id}/add`, {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({quantity: quantity, size: size}),
                });
                if (response.ok) {
                    setLoading(true);
                } else {
                    console.error("failed to add pairs:", response.statusText);
                }
            } catch (error) {
                console.error('error with adding pairs:', error);
            }
        } else {
            console.error("not right params");
        }
        
    };

    useEffect(() => {
        if (product) {
            setBrandInput(prevBrand => prevBrand === "" ? brand : prevBrand);
            setModelInput(prevModel => prevModel === "" ? model : prevModel);
            setColorInput(prevColor => prevColor === "" ? color : prevColor);
            setPriceInput(prevPrice => prevPrice <= 0 ? price : prevPrice);
            setDescriptionInput(prevDescription => prevDescription === "" ? description : prevDescription);
            setCategoryIdInput(prevCategoryId => prevCategoryId <= 0 ? categoryId : prevCategoryId);
            setPhoto1Input(prevPhoto => prevPhoto === "" ? photos[0] : prevPhoto);
            setPhoto2Input(prevPhoto => prevPhoto === "" ? photos[1] : prevPhoto);
            setPhoto3Input(prevPhoto => prevPhoto === "" ? photos[2] : prevPhoto);
            setPhoto4Input(prevPhoto => prevPhoto === "" ? photos[3] : prevPhoto);
            setPhoto5Input(prevPhoto => prevPhoto === "" ? photos[4] : prevPhoto);
        }
    }, [product]);

    const updateShoeTypeInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/adm/products/${id}/update`, {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({brand: brandInput,
                                        model: modelInput,
                                        categoryId: categoryIdInput,
                                        color: colorInput, 
                                        photos: [
                                            photo_1,
                                            photo_2,
                                            photo_3,
                                            photo_4,
                                            photo_5
                                        ],
                                        description: descriptionInput,
                                        price: priceInput      
                                    }),
            });
            if (response.ok) {
                setLoading(true);
            } else {
                console.error("failed to update info:", response.statusText);
            }
        } catch (error) {
            console.error('error with update info:', error);
        }
    }

    if (product) {
        return (
            <section>
                <div className={styles.images}>
                    {currentImage && (
                        <div 
                            className={styles.current}
                            style={{ backgroundImage: `url(${currentImage})`}}
                        />
                    )}
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
                    <h1 className={styles.title}>{brand + " " + model}</h1>
                    <div className={styles.price}>
                        <span>Price: </span> {price}$
                    </div>
                    <div className={styles.color}>
                        <span>Color:</span>{color}
                    </div>
                    <div className={styles.sizes}>
                        <span>Sizes:</span>
                        <div className={styles.list}>
                            {sizes.map(size => (
                                <div
                                    // onClick={() => setCurrentSize(size)} 
                                    key={size}
                                    className={styles.size}>
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <p className={styles.size}>{description}</p>
                </div>
    
                <div className={styles2.title}>Update info</div>
                
                <form className={styles2.form} onSubmit={(e) => {
                    e.preventDefault();
                    updateShoeTypeInfo();
                }}>
    
                    
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="brand"
                        value={brandInput}
                        onChange={(e) => setBrandInput(e.target.value)}
                        
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="model"
                        value={modelInput}
                        onChange={(e) => setModelInput(e.target.value)}
                        
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="number"
                        placeholder="categoryId"
                        value={categoryIdInput}
                        onChange={(e) => setCategoryIdInput(e.target.value)}
                        
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="color"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="description"
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                    
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="number"
                        placeholder="price"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                    
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="photo1 URL"
                        value={photo_1}
                        onChange={(e) => setPhoto1Input(e.target.value)}
                    
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="photo2 URL"
                        value={photo_2}
                        onChange={(e) => setPhoto2Input(e.target.value)}
                    
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="photo3 URL"
                        value={photo_3}
                        onChange={(e) => setPhoto3Input(e.target.value)}
                    
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="photo4 URL"
                        value={photo_4}
                        onChange={(e) => setPhoto4Input(e.target.value)}
                    
                    />
                    </div>
                    <div className={styles2.group}>
                    <input
                        type="text"
                        placeholder="photo5 URL"
                        value={photo_5}
                        onChange={(e) => setPhoto5Input(e.target.value)}
                    
                    />
                    </div>
                    <button type="submit">Add Category</button>
                </form>
    
            </section>
        )
    }
    
    
}

export default TypeOnlyAdm;
