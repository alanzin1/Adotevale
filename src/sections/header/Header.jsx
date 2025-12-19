import { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [black, setBlack] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setBlack(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinks = [
    { href: "#inicio", text: "Home" },
    { href: "#sobreNos", text: "Sobre nós" },
    { href: "#adocao", text: "Adoção" },
    { href: "#ajuda", text: "Ajuda" },
  ];

  // Se o menu estiver aberto, o header fica preto, independente do scroll
  const isHeaderBlack = black || isMenuOpen;

  return (
    <header className={`${styles.header} ${isHeaderBlack ? styles.black : ""}`}>
      <span
        className={`${styles.logo} ${isHeaderBlack ? styles.logoblack : ""}`}
      >
        ADOTEVALE
      </span>

      {!isMobile ? (
        <nav
          className={`${styles.navDesktop} ${
            isHeaderBlack ? styles.navDesktopBlack : ""
          }`}
        >
          {menuLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.text}
            </a>
          ))}
        </nav>
      ) : (
        <>
          <button
            className={`${styles.toggleBtn} ${
              isHeaderBlack ? styles.toggleBtnBlack : ""
            }`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>

          <aside className={styles.panelWrapper}>
            <div
              className={`${styles.panel} ${styles.layer1} ${
                isMenuOpen ? styles.open : ""
              }`}
            ></div>
            <div
              className={`${styles.panel} ${styles.layer2} ${
                isMenuOpen ? styles.open : ""
              }`}
            >
              <nav className={styles.nav}>
                {menuLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={toggleMenu}>
                    {link.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {isMenuOpen && (
            <div
              className={styles.overlay}
              onClick={toggleMenu}
              role="button"
              tabIndex={0}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </header>
  );
}
