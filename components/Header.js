import React from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "@/components/Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/Slice/authSlice";
function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
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
          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <button
                  className="btn-secondary btn-icon"
                  onClick={() => dispatch(removeUser())}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login" className="btn-secondary btn-icon">
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
