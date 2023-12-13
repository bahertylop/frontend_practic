import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from '../../styles/Header.module.css';
import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatarka.jpg";
import { searchProducts } from '../../features/products/productsSlice';

const Header = () => {

    const [searchValue, setSearchValue] = useState("");
    const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

    const { currentUser, cart, favourites } = useSelector(( { user }) => user);

    const handleSearch = ({ target: { value } }) => {
        setSearchValue(value)
    }

    useEffect(() => {
        if (!currentUser) return;
    
        setValues(currentUser);
      }, [currentUser]);

    const searchedProducts = searchProducts(searchValue);

  return (
    <div className={styles.header}>
        <div className={styles.logo} >
            <Link to={ROUTES.HOME}>
                {/* <img src = {LOGO} alt="Stuff" /> */}
                <div className={styles.title}>LA $HOP</div>
            </Link>
        </div>

        <div className={styles.info}> 
            <div className={styles.user}>
                <div className={styles.avatar} style={{ backgroundImage: `url(${AVATAR})` }}/>
                <div className={styles.username}>Guest</div>
            </div>  

            <form className={styles.form}>
                <div className={styles.icon}>
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PIBLIC_URL}/sprite.svg#search`} />
                    </svg>
                </div>

                <div className={styles.input}>
                    <input 
                        type="search" 
                        name="search" 
                        placeholder="Search for anything..."
                        autoComplete="off"
                        onChange={handleSearch}
                        value={searchValue}   
                    />
                </div>

                {searchValue && (<div className={styles.box}>
                    {!searchedProducts.length ? "No results" : 
                        searchedProducts.map(({ title, images, id }) => {
                            return ( 
                                <Link className={styles.item} to={`/products/${id}`}>
                                    <div 
                                        className={styles.image}
                                        style={{ backgroundImage: `url(${images[0]})`}}
                                    ></div>
                                    <div >
                                        {title}
                                    </div>
                                </Link>
                            );
                        })}
                </div>
                )}
            

            </form>

            <div className={styles.account}>
                <Link to={ROUTES.FAVOURITES} className={styles.cart}>
                    <svg className={styles["icon-fav"]}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                    </svg>
                    {favourites.length && (
                        <span className={styles.count}>{favourites.length}</span>
                    )}
                </Link>

                <Link to={ROUTES.CART} className={styles.cart}>
                    <svg className={styles["icon-cart"]}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                    </svg>
                    {cart.length && (
                        <span className={styles.count}>{cart.length}</span>
                    )}
                </Link>
            </div>

        </div>
    </div>
  );
};

export default Header;
