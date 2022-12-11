import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

import { API_URL } from "../config";
function EventItem({ evt }) {
  const image = evt.attributes.image.data?.attributes;
  const alt = evt.attributes.name;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            image === undefined
              ? "/images/event-default.png"
              : API_URL + image.url
          }
          width={170}
          height={100}
          alt={alt}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.attributes.date).toDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
