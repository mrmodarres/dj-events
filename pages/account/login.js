import Layout from "@/components/Layout";
import React, { useState } from "react";
import styles from "@/styles/AuthForm.module.css";
import { FaUserAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/Slice/authSlice";
import { API_URL } from "@/config/index";
import axios from "axios";
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      // dispatch(getUser());
      const values = { identifier: email, password: password };
      console.log(values);
      const res = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
    }
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUserAlt /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" className="btn" value="Login" />
        </form>
        <p>
          Don`t have an account ? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}

export default Login;
