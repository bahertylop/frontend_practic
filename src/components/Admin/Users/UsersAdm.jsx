import React, { useEffect, useState } from 'react'
import styles from "../../../styles/UsersAdm.module.css";
import styles2 from "../../../styles/User.module.css";
import axios from 'axios';
import { ROUTES } from '../../../utils/routes';
import { Link } from 'react-router-dom';

const UsersAdm = () => {
    const [users, setUsers] = useState([]);
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(false);
    const [typesInStock, setInStock] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/adm/users/all", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => {
            // console.log(response.data);
            setUsers(response.data);
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

    const changeAccountState = async (state, email) => {
        var url = "";
        

        if (state === STATES.DELETE) {
            url = "http://localhost:8080/api/adm/users/deleteAccount";
        } else if (state === STATES.BAN) {
            url = "http://localhost:8080/api/adm/users/banAccount";
        } else if (state === STATES.CONFIRM) {
            url = "http://localhost:8080/api/adm/users/confirmAccount";
        }
        

        if (url !== "") {
            try {
                const response = await fetch(url , {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: email})
                });
                if (response.ok) {
                    setLoading(true);
                } else {
                    console.error("Failed to change accountState");
                }
            } catch (error) {
                console.error('Error change account state:', error);
            }
        } else {
            console.error("state not found");
        } 
    };

    const changeAccountRole = async (role, email) => {
        var url = "";
        // console.log(role + " " + email);
        if (role === ROLES.USER) {
            url = "http://localhost:8080/api/adm/users/takeUser";
        } else if (role === ROLES.ADMIN) {
            url = "http://localhost:8080/api/adm/users/takeAdmin";
        }
        // console.log(url);
        if (url !== "") {
            try {
                const response = await fetch(url, {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: email})
                });
                if (response.ok) {
                    setLoading(true);
                } else {
                    console.error("Failed to change accountRole");
                }
            } catch (error) {
                console.error('Error change account role:', error);
            }
        } else {
            console.error("role not found");
        } 
    };
  return (
    <section className={styles.cart}>
        <h2 className={styles.title}> Users panel </h2>

        {auth !== "" && (
                <div className={styles.empty}>Forbidden (only for adm)</div>
            )}

        {!users.length  && auth === "" ? (
            <div className={styles.empty}>No users</div>
        ) : (
            <>
            <div className={styles.list}> 
                {users.map((item) => {
                    const { id, firstName, lastName, email, phoneNumber, personalSale, role, accountState} = item
                    return (
                        <div key={id}>
                        <div className={styles.item}>
                            
                            <div className={styles.info}>
                                <h3 className={styles.name}>Full name: {firstName + " " + lastName}</h3>
                                <h3 className={styles.name}>email: {email}</h3>
                                <h3 className={styles.name}>phoneNumber: {phoneNumber}</h3>    
                                <div className={styles.name}>sale: {personalSale}%</div>

                                <div className={styles.name}>role: {role}</div>
                                <div className={styles.name}>state: {accountState}</div>
                            </div>                 
                        </div>
                        
                        <div className={styles.buttons}>
                        <button className={styles.buttons} onClick={() => {changeAccountState(STATES.DELETE, email)}}>
                        deleted
                        </button>
                        

                        <button className={styles.buttons} onClick={() => {changeAccountState(STATES.BAN, email)}}>
                        banned
                        </button>

                        <button className={styles.buttons} onClick={() => {changeAccountState(STATES.CONFIRM, email)}}>
                        confirmed
                        </button>

                        <button className={styles.buttons} onClick={() => {changeAccountRole(ROLES.ADMIN, email)}}>
                        make admin
                        </button>

                        <button className={styles.buttons} onClick={() => {changeAccountRole(ROLES.USER, email)}}>
                        make user
                        </button>
                        </div>
                        </div>
                    );
                })}
            </div>
            </>
        )}      

    </section>
  )
}

export default UsersAdm;


export const STATES = {
    DELETE: "delete",
    BAN: "ban",
    CONFIRM: "confirm",
}


export const ROLES = {
    USER: "user",
    ADMIN: "admin",
}