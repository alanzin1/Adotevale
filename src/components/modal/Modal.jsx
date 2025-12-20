import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
