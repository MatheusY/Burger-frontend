import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({
  title,
  children,
  className,
  onClose,
}: {
  title: string;
  children: any;
  className?: string;
  onClose: () => void;
}) => {
  return (
    <div className={styles.background} onClick={onClose}>
      <div
        className={`${styles.panel} ${className}`}
        onClick={(event: any): void => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
          <button className={styles.close_button} onClick={onClose}>
            <FontAwesomeIcon icon="times" className={styles.close_icon} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
