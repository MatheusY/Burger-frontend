import styles from "./Header.module.css";
import HeaderCart from "./HeaderCart";

const header = () => {
  return (
    <header className={styles.header}>
      <h1>Coma bem</h1>
      <HeaderCart />
    </header>
  );
};

export default header;
