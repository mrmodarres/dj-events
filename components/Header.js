import React from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "@/components/Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/Slice/authSlice";
import { NEXT_URL } from "../config";
import { useRouter } from "next/router";
function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.authSlice.user);
  const logOutHandler = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      dispatch(removeUser());
      router.push("/");
    }
  };

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
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="btn-secondary btn-icon"
                  onClick={logOutHandler}
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
