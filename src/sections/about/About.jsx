import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <h2 className={styles.title}>Sobre nós</h2>

          <p className={styles.text}>
            O Adotevale nasceu do amor pelos animais e do desejo de fazer a
            diferença no Vale do Jaguaribe, no Ceará. Nosso objetivo é conectar
            cães, gatos e outros animais a lares responsáveis e cheios de
            carinho.
          </p>
        </motion.div>

        <motion.img
          src="/about-heart.png"
          alt="Cachorro e gato representando amor e adoção"
          className={styles.image}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false }}
        />
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
