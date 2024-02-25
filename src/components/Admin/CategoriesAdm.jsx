import React, { useEffect, useState } from 'react'
import styles from "../../styles/Cart.module.css";
import axios from 'axios';
import { ROUTES } from '../../utils/routes';

const CategoriesAdm = () => {
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [imageInput, setImageInput] = useState("");


    useEffect(() => {
        axios.get('http://localhost:8080/api/adm/categories/all', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            console.log(response.data);
            setCategories(response.data);
        })
        .catch(error => {
            // window.location.href = ROUTES.HOME;
            console.error("error fetching data:", error);
            setAuth("login to adm to open this page");
            
        })
        .finally(() => {
            setLoading(false); // Устанавливаем флаг загрузки обратно в false после завершения запроса
        });
    }, [loading]);

    const deleteCategory = async (name) => {
        try {
            const response = await fetch('http://localhost:8080/api/adm/categories/delete', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name: name}),
            });
            if (response.ok) {
                // setCartPositions(cartPositions.filter(item => item.shoeType.id !== shoeTypeId));
                setLoading(true);
            } else {
                console.error("Failed to delete category");
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const addCategory = async (name, image) => {
        try {
            const response = await fetch('http://localhost:8080/api/adm/categories/add', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name: name, image: image}),
            });
            if (response.ok) {
                setLoading(true);
            } else {
                console.error("Failed to add category");
                console.error(response.text());
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

  return (
    <section className={styles.cart}>
        <h2 className={styles.title}> Categories panel </h2>

        {auth !== "" && (
                <div className={styles.empty}>Forbidden (only for adm)</div>
            )}

        {!categories.length  && auth === "" ? (
            <div className={styles.empty}>No categories</div>
        ) : (
            <>
            <div className={styles.list}>
                {categories.map((item) => {
                    const { id, name, image } = item
                    return (
                        <div className={styles.item} key={id}>
                            <div 
                                className={styles.image}
                                style={{ backgroundImage: `url(${image})`}}
                            />
                            <div className={styles.info}>
                                <h3 className={styles.name}>{name}</h3>
                            </div>

                            <div className={styles.close} onClick={() => deleteCategory(name)}>
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
            </>
        )}

        <form onSubmit={(e) => {
            e.preventDefault();
            addCategory(nameInput, imageInput);
        }}>
            <input
                type="text"
                placeholder="Category Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
            />
            <button type="submit">Add Category</button>
        </form>

    </section>
  )
}

export default CategoriesAdm;
