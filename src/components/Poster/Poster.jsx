import React from 'react'

import styles from "../../styles/Home.module.css"

import BG from "../../images/jordans3.png"

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}>BLACK FRIDAY 30% SALE</div>
            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>most expensive sneakers of 2021</div>
                    <h1 className={styles.head}>NIKE AIR JORDAN 1 x DIOR</h1>
                    <button className={styles.button}>Buy now</button>
                </div>
                <div className={styles.image}>
                    <img src={BG} alt="" />
                </div>
            </div>
        </section>
    )
};



export default Poster;