import React from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "@/components/Search";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events"> Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
