import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import { API_URL } from "../config";
function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    const bodyForm = new FormData();
    e.preventDefault();
    console.log(evtId);
    bodyForm.append("files", image);
    // bodyForm.append("ref", "events");
    // bodyForm.append("refId", evtId);
    // bodyForm.append("fieldName", "image");
    console.log(bodyForm);
    const res = await fetch(`${API_URL}/api/upload/`, {
      method: "POST",
      body: bodyForm,
    });

    if (res.ok) {
      const result = await res.json();
      console.log(result[0]);
      imageUploaded({ pic: result[0] });
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}

export default ImageUpload;
