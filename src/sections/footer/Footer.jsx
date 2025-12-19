import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Coluna 1 */}
        <div className={styles.brand}>
          <h3 className={styles.logo}>Adotevale</h3>
          <p>
            Conectando animais a lares cheios de amor no Vale do Jaguaribe, Ceará.
          </p>
        </div>

        {/* Coluna 2 */}
        <div className={styles.links}>
          <h4>Links rápidos</h4>
          <a href="#hero">Início</a>
          <a href="#about">Sobre nós</a>
          <a href="#adotar">Quero adotar</a>
          <a href="#doar">Quero doar</a>
        </div>

        {/* Coluna 3 */}
        <div className={styles.contact}>
          <h4>Contato</h4>
          <p>📍 Vale do Jaguaribe – CE</p>
          <p>📱 WhatsApp: (88) 9xxxx-xxxx</p>
          <p>✉️ contato@adotvale.com</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Adotvale. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
