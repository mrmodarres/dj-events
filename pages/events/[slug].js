import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { API_URL } from "config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
function Events({ evt }) {
  console.log(evt);
  const event = evt.data.attributes;
  const image = event.image.data?.attributes;
  const imageUrl =
    image === undefined ? "/images/event-default.png" : API_URL + image.url;
  const deleteEvent = (e) => {
    console.log(e);
  };
  return (
    <Layout title={event.slug}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/event/edit/${evt.data.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>
        <span>
          {new Date(event.date).toDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <div className={styles.image}>
          <Image src={imageUrl} width={960} alt={event.slug} height={600} />
        </div>

        <h3>Perfomrd:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <h3>Address:</h3>
        <p>{event.address}</p>

        <Link href="/events" className={styles.back}>
          Go back
        </Link>
      </div>
    </Layout>
  );
}
// if you wnat to use getStaticProps you must combine it with getStaticPath
// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();
//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const event = await res.json();
//   return {
//     props: { evt: event[0] },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/slugify/slugs/event/${slug}?populate=*`
  );
  const event = await res.json();
  return {
    props: { evt: event },
  };
}
// /api/slugify/slugs/event/boom-dance-festival-experience?populate=*
export default Events;
