import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Coluna 1: Marca */}
        <div className={styles.brand}>
          <h3 className={styles.logo}>Adotevale</h3>
          <p>Conectando animais a lares cheios de amor e carinho</p>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Coluna 2: Links rápidos */}
        <div className={styles.links}>
          <h4>Links rápidos</h4>
          <a href="#hero">Início</a>
          <a href="#about">Sobre nós</a>
          <a href="#adotar">Quero adotar</a>
          <a href="#doar">Quero doar</a>
        </div>

        {/* Coluna 3: Contato */}
        <div className={styles.contact}>
          <h4>Contato</h4>
          <p>
            <FaWhatsapp size={20} />
            <a href="https://wa.me/5588999999999">(88) 99999-9999</a>
          </p>
          <p>
            <FaEnvelope size={20} />
            <a href="mailto:contato.adotevale@gmail.com">
              contato.adotevale@gmail.com
            </a>
          </p>
        </div>

        {/* Coluna 4: Termos */}
        <div className={styles.terms}>
          <h4>Termos</h4>
          <a href="/termos">Termos de Uso</a>
          <a href="/privacidade">Política de Privacidade</a>
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
