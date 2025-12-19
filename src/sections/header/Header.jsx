import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [black, setBlack] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 80) {
        setBlack(true);
      } else {
        setBlack(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${black ? styles.black : ""}`}>
      <span className={`${styles.logo} ${black ? styles.logoblack : ""}`}>ADOTEVALE</span>
    </header>
  );
}
