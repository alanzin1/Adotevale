import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Sobre nós</h2>

          <p className={styles.text}>
            O Adotevale nasceu do amor pelos animais e do desejo de fazer a
            diferença no Vale do Jaguaribe, no Ceará. Nosso objetivo é conectar
            cães, gatos e outros animais a lares responsáveis e cheios de carinho.
          </p>
        </div>

        <img
          src="/about-heart.png"
          alt="Cachorro e gato representando amor e adoção"
          className={styles.image}
        />
      </div>
    </section>
  );
}
