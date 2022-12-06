import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { API_URL } from "config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
function Events({ evt }) {
  const deleteEvent = (e) => {
    console.log(e);
  };
  return (
    <Layout title={evt.slug}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/event/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} alt={evt.slug} height={600} />
          </div>
        )}
        <h3>Perfomrd:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.desciption}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events" className={styles.back}>
          Go back
        </Link>
      </div>
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
