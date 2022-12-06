import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { API_URL } from "../config";
function EventItem({ evt }) {
  const image = evt.attributes.image.data.attributes;
  console.log(`${API_URL}${image.url}`);
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        {image && (
          <Image
            src={`${API_URL}${image.url}`}
            width={170}
            height={100}
            alt={image.name}
          />
        )}
      </div>
      <div className={styles.info}>
        <span>
          {evt.attributes.date} at {evt.attributes.time}
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
