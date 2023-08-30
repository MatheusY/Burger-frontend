import styles from "./Header.module.css";
import HeaderOrder from "./HeaderOrder";

const header = () => {
  return (
    <header className={styles.header}>
      <h1>Coma bem</h1>
      <HeaderOrder />
    </header>
  );
};

export default header;
