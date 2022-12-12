import { useState } from "react";
import moment from "moment/moment";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FaImage } from "react-icons/fa";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

function EditEvents({ evt }) {
  console.log(evt);
  const router = useRouter();
  const [values, setValues] = useState({
    name: evt.attributes.name,
    performers: evt.attributes.performers,
    venue: evt.attributes.venue,
    address: evt.attributes.address,
    date: evt.attributes.date,
    time: evt.attributes.time,
    description: evt.attributes.description,
  });
  const [showModal, setShowModal] = useState(false);
  const [imagePrev, setImagePrev] = useState(
    evt.attributes.image.data
      ? API_URL + evt.attributes.image.data.attributes.url
      : "/images/event-default.png"
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((el) => el === "");
    if (hasEmptyFields) {
      toast.error("Fill all fields");
    } else {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: values,
        }),
      });
      if (!res.ok) {
        toast.error("Somthing went wrong");
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.data.attributes.slug}`);
      }
    }
  };
  const imageUploaded = async ({ pic }) => {
    console.log(pic);
    const res = await fetch(`${API_URL}/api/events/${evt.id}?populate=*`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          image: pic,
        },
      }),
    });
    const data = await res.json();
    setImagePrev(API_URL + data.data.attributes.image.data.attributes.url);
    setShowModal(false);
  };
  return (
    <Layout title="Edit Events">
      <Link href="/events"></Link>Go Back
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Edit Event" className="btn" />
      </form>
      <h2>
        Event Image{" "}
        {imagePrev !== "/images/event-default.png"
          ? ""
          : " : its default image upload new one"}
      </h2>
      <Image src={imagePrev} width={170} height={100} alt={values.name} />
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evt = await res.json();
  return {
    props: {
      evt: evt.data,
    },
  };
}

export default EditEvents;
