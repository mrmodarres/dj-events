import Layout from "@/components/Layout";
import React, { useState } from "react";
import styles from "@/styles/AuthForm.module.css";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { NEXT_URL } from "@/config/index";
import { useDispatch } from "react-redux";
import { getUser } from "@/Slice/authSlice";
import { useRouter } from "next/router";
function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    const values = { username: userName, email: email, password: password };
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await res.json();

    if (res.ok) {
      dispatch(getUser({ user: result.user }));
      toast.success("you registerd successfully");
      setTimeout(() => {
        router.push("/account/dashboard");
      }, 2000);
    } else {
      toast.error(result.error);
    }
  };
  return (
    <Layout title="User Register">
      <div className={styles.auth}>
        <h1>
          <FaUserCircle />
          Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
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
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="register" className="btn" />
        </form>
        <p>
          Allready have an accout ! <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}

export default Register;
