import React from 'react'

import { Link, NavLink } from 'react-router-dom';

import styles from '../../styles/Sidebar.module.css';
import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink to={`/categories/${1}`}> 
              Link
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.footer} >
        <a href="/help" target="_blank" classname={styles.link}>
          Help
        </a>
        <a href="/terms" target="_blank" classname={styles.link} style={{ textDecoration: "underline" }}>
          Terms&Conditions
        </a>
      </div>
        
    </section>
  );
};

export default Sidebar
