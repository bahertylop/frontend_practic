import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import styles from "../../styles/User.module.css";
import { ROUTES } from '../../utils/routes';

const SignInForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    try {
      const response = await fetch("http://localhost:8080/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        // Записываем токен в cookie
        Cookies.set("token", data.token);
        console.log(data.token);
        // Переход на /home
        window.location.href = ROUTES.HOME;
      } else {
        console.error("Login failed");
        // Остаемся на форме
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Остаемся на форме
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Log In</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        {/* <div
          onClick={() => toggleCurrentFormType("signup")}
          className={styles.link}
        >
          Create an account
        </div> */}

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInForm;