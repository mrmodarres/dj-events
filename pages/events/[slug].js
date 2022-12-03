import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
function Events() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout title={router.query.slug} >
      <h1>My Events is {router.query.slug}</h1>
    </Layout>
  );
}

export default Events;
