import React from 'react'

import { Link, NavLink } from 'react-router-dom';

import styles from '../../styles/Sidebar.module.css';
import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>CATEGOTIES</div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink> 
              
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar
