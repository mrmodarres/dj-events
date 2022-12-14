import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Showcase from "./Showcase";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";
import { NEXT_URL } from "../config";
import { useDispatch } from "react-redux";
import { getUser } from "@/Slice/authSlice";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch(`${NEXT_URL}/api/user`);
      const data = await res.json();
      if (res.ok) {
        dispatch(getUser({ user: data }));
      } else {
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find The latest DJ other musical events",
  keywords: "music , dj",
};
