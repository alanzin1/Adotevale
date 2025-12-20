import { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

import logoWhite from "/logo-white.webp";
import logoDark from "/logo-black.webp";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [black, setBlack] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

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
    const handleScroll = () => {
      setBlack(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function goToSection(sectionId) {
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/", {
      state: { scrollTo: sectionId },
    });
  }

  const menuLinks = [
    { type: "route", to: "/", text: "Home" },
    { type: "section", id: "about", text: "Sobre nós" },
    { type: "route", to: "/catalogo", text: "Adotar" },
    { type: "route", to: "/cadastro", text: "Doar" },
    { type: "section", id: "help", text: "Ajudar" },
  ];

  const isHeaderBlack = black || isMenuOpen;

  return (
    <header className={`${styles.header} ${isHeaderBlack ? styles.black : ""}`}>
      <Link to="/" className={styles.logo}>
        <img
          src={isHeaderBlack ? logoDark : logoWhite}
          alt="AdoteVale - Adoção de animais"
          className={styles.logoImage}
        />
      </Link>

      {!isMobile && (
        <nav
          className={`${styles.navDesktop} ${
            isHeaderBlack ? styles.navDesktopBlack : ""
          }`}
        >
          {menuLinks.map((link) =>
            link.type === "route" ? (
              <Link key={link.text} to={link.to}>
                {link.text}
              </Link>
            ) : (
              <button
                key={link.text}
                className={styles.navButton}
                onClick={() => goToSection(link.id)}
              >
                {link.text}
              </button>
            )
          )}
        </nav>
      )}

      {isMobile && (
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
            />
            <div
              className={`${styles.panel} ${styles.layer2} ${
                isMenuOpen ? styles.open : ""
              }`}
            >
              <nav className={styles.nav}>
                {menuLinks.map((link) =>
                  link.type === "route" ? (
                    <Link key={link.text} to={link.to} onClick={toggleMenu}>
                      {link.text}
                    </Link>
                  ) : (
                    <button
                      key={link.text}
                      className={styles.navButton}
                      onClick={() => goToSection(link.id)}
                    >
                      {link.text}
                    </button>
                  )
                )}
              </nav>
            </div>
          </aside>

          {isMenuOpen && (
            <div
              className={styles.overlay}
              onClick={toggleMenu}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </header>
  );
}
