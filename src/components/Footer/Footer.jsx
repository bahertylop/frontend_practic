import React from 'react';

import styles from '../../styles/Footer.module.css';
import newstyles from '../../styles/Header.module.css'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.svg";

const Footer = () => {
  return (
    <section className={styles.footer} >
        <div className={styles.logo}>
            <Link to={ROUTES.HOME}>
                <div className={styles.title}>LA $HOP</div>
            </Link>
        </div>

        <div className={styles.rights}>
            Developed by {" "}
            <a 
                href="https://github.com/bahertylop"
                target='_blank'
                rel="noreferrer"
            > 
                bahertylop
            </a>
        </div>

        <div className={styles.socials}>
            <a 
                href="https://www.instagram.com/bahertylop/"
                target='_blank'
                rel="noreferrer"
            > 
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
                </svg> 
            </a>

            <a 
                href="https://vk.com/ttttttthp"
                target='_blank'
                rel="noreferrer"
            > 
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/vk.svg#vk`} />
                </svg> 
            </a>
            
        </div>
    </section>
  );
};

export default Footer;
