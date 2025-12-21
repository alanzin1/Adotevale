import { FaEnvelope, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img
            src="/logo-white.webp"
            alt="AdoteVale - Adoção de animais"
            className={styles.logo}
          />

          <p>Conectando animais a lares cheios de amor e carinho</p>

          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/adote_vale/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        <div className={styles.links}>
          <h4>Links rápidos</h4>
          <Link to="/">Início</Link>
          <Link to="/catalogo">Quero adotar</Link>
          <Link to="/cadastro">Quero doar</Link>
        </div>

        <div className={styles.contact}>
          <h4>Contato</h4>

          <p>
            <FaEnvelope size={20} />
            <a href="mailto:contato.adotevale@gmail.com">
              contato.adotevale@gmail.com
            </a>
          </p>
        </div>

        <div className={styles.terms}>
          <h4>Termos</h4>
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Adotevale. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
