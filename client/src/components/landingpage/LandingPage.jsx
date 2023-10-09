import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/index";
import style from "./LandingPage.module.css";


export default function LandingPage() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
    setUserError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(userData);
    if (Object.keys(validationErrors).length === 0) {
      const { email, password } = userData;
      dispatch(login(email, password));
  
    
      setUserData({
        email: "",
        password: "",
      });
    } else {
      setUserError(validationErrors);
    }
  };
  

  const validateForm = (data) => {
    let userError = {};

    if (data.password.trim() === "") {
      userError.password = "Password is required";
    }
    if (data.password !== "123") {
      userError.password = "Wrong password";
    }
    if (data.email !== "kubathasanengin@gmail.com") {
      userError.email = "Wrong email";
    }
    if (data.email !== "kubathasanengin@gmail.com" && data.password !== "123") {
      userError.message = "Wrong email and password";
    }
    if (data.email.trim() === "") {
      userError.email = "Email is required";
    }
    if (!data.email.includes("@")) {
      userError.email = "Invalid email format";
    }
    return userError;
  };

  return (
    
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.formGroup}>
        <label htmlFor="email">Email</label>
        <h4 style={{ color: "white"}}>kubathasanengin@gmail.com</h4>

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="kubathasanengin@gmail.com"
        />
        {userError.email && <p className={style.errorMessage}>{userError.email}</p>}
      </div>
      <div className={style.formGroup}>
        <label htmlFor="password">Password</label>
        <h4 style={{ color: "white"}}>123</h4>

        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="123"
        />
        {userError.password && <p className={style.errorMessage}>{userError.password}</p>}
      </div>
      <button className={style.submitButton} type="submit">LOGIN</button>
    </form>
  );
}
