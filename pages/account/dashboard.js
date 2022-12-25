import Layout from "@/components/Layout";
import React from "react";
import styles from "@/styles/Dashboard.module.css";
function dashboard({ events }) {
  console.log(events);
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Evetns</h3>
      </div>
    </Layout>
  );
}

export default dashboard;
