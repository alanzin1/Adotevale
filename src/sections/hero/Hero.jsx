import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg3} aria-hidden />
      <div className={styles.bg4} aria-hidden />

      <div className={styles.content}>
        <h1 className={styles.title}>
          NÃO PERCA MAIS TEMPO.
          <br />
          ADOÇÃO VALE A PENA!
        </h1>

        <div className={styles.buttons}>
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
            <Link to="/cadastro" className={styles.buttonOutline}>
              Quero doar
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
            <Link to="/catalogo" className={styles.button}>
              Quero adotar
            </Link>
          </motion.div>
        </div>
      </div>

      <div className={styles.divider}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={styles.dividerSvg}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28
              70.36-5.37,136.33-33.31,206.8-37.5
              C438.64,32.43,512.34,53.67,583,72.05
              c69.27,18,138.3,24.88,209.4,13.08
              36.15-6,69.85-17.84,104.45-29.34
              C989.49,25,1113-14.29,1200,52.47V0Z"
            className={`${styles.shape} ${styles.wave1}`}
          />
          <path
            d="M0,0V15.81C47,42,104,68,167,76
              256,87,342,58,421,34
              486,15,562,0,636,7
              702,13,768,40,838,61
              916,84,996,85,1200,40V0Z"
            className={`${styles.shape} ${styles.wave2}`}
          />
          <path
            d="M0,0V5.63C150,59,314,71,476,43
              606,20,720,5,856,18
              992,32,1096,11,1200,0V0Z"
            className={`${styles.shape} ${styles.wave3}`}
          />
        </svg>
      </div>
    </section>
  );
}
