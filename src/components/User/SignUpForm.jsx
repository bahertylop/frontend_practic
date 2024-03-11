import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { createUser } from "../../features/user/userSlice";
import { ROUTES } from '../../utils/routes';
import { Link } from "react-router-dom";
import styles from "../../styles/User.module.css";

const SignUpForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [isOk, setIsOk] = useState("");

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    try {
      const response = await fetch("http://localhost:8080/api/signUp", {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        window.location.href = ROUTES.LOGIN;
      } else {
        console.error("SignUp failed");
        setIsOk("email used");
      }
    } catch (error) {
      console.error("Error during signUp:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        

        <div className={styles.group}>
          <input
            type="name"
            placeholder="Your first name"
            name="firstName"
            value={values.firstName}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="name"
            placeholder="Your last name"
            name="lastName"
            value={values.lastName}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="tel"
            placeholder="Your phone"
            name="phoneNumber"
            value={values.phoneNumber}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

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

        <Link to={ROUTES.LOGIN} className={styles.Link} >
                    Create new account
                </Link>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>

        <div className={styles.title}>{isOk}</div>
      </form>
    </div>
  );
};

export default SignUpForm;