import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import About from "../../sections/about/About";
import Adopt from "../../sections/adopt/Adopt";
import Hero from "../../sections/hero/Hero";
import styles from "./Home.module.css";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);

      setTimeout(() => {
        el?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [location]);

  return (
    <main className={styles.home}>
      <Hero />
      <About />
      <Adopt />
    </main>
  );
}
