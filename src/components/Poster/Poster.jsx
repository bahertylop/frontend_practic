import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Home.module.css"
import { Link } from "react-router-dom"
// import BG from "../../images/jordans3.png"
import BG from "../../images/samba2.png"

const Poster = (products = []) => {

    return (
        <section className={styles.home}>
            <div className={styles.title}>MOST POPULAR</div>
            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>the best sneakers of 2023</div>
                    <h1 className={styles.head}>ADIDAS ORIGINALS SAMBA OG</h1>
                    <button className={styles.button}>
                        <Link to={`/products/6}`} className={styles.button}>
                            Buy now
                        </Link>
                    </button>
                </div>
                <div className={styles.image}>
                    <img src={BG} alt="" />
                </div>
            </div>
        </section>
    )
};



export default Poster;