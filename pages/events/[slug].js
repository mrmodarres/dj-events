import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "config";
function Events({ evt }) {
  return (
    <Layout title={evt.slug}>
      <h1>My Events is {evt.slug}</h1>
    </Layout>
  );
}
// if you wnat to use getStaticProps you must combine it with getStaticPath
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const event = await res.json();
  return {
    props: { evt: event[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const event = await res.json();
//   return {
//     props: { evt: event[0] },
//   };
// }
export default Events;
