import React from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Mehdi 2022</p>
      <Link href="/about">About this project</Link>
    </footer>
  );
}

export default Footer;
