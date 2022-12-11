import React, { useEffect, useState } from "react";
import styles from "@/styles/Modal.module.css";
import { FaTimes } from "react-icons/fa";
import reactDom from "react-dom";
function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  });
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return reactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
