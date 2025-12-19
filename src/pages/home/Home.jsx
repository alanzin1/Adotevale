import About from "../../sections/about/About";
import Adopt from "../../sections/adopt/Adopt";
import Help from "../../sections/help/Help";
import Hero from "../../sections/hero/Hero";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <Hero />
      <About />
      <Adopt />
      <Help />
    </main>
  );
}
