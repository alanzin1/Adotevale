import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import styles from "./Help.module.css";

const PIX_KEY =
  "00020126580014BR.GOV.BCB.PIX0136SUA-CHAVE-PIX-AQUI5204000053039865802BR5920Adotvale Projeto6009Jaguaribe62070503***6304ABCD";

export default function Help() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyPix() {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }

  return (
    <>
      <section id="ajude" className={styles.help}>
        <div className={styles.container}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <h2 className={styles.title}>Ajude Nosso Site</h2>

            <p className={styles.text}>
              A Adotevale é um projeto comunitário e sem fins lucrativos, criado
              para ajudar os animais. No entanto, para continuar funcionando,
              precisa de apoio financeiro para cobrir custos como domínio,
              hospedagem e manutenção.
            </p>

            <p className={styles.text}>
              Sem esse apoio, o site corre o risco de sair do ar. Se você
              acredita na causa, considere fazer uma doação — sua ajuda é
              essencial para que o Adotevale continue.
            </p>

            <button className={styles.button} onClick={() => setOpen(true)}>
              Quero ajudar
            </button>
          </motion.div>

          <motion.img
            src="/help-donation.png"
            alt="Ajude o Adotevale a continuar ajudando animais"
            className={styles.image}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false }}
          />
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Fechar modal"
              >
                <FiX size={35} />
              </button>

              <h3>Ajude o Adotevale</h3>

              <p className={styles.modalText}>
                Se estiver no computador, escaneie o QR Code com o celular.
                <br />
                Se estiver no celular, use o Pix Copia e Cola.
              </p>

              <img
                src="/qrcode.webp"
                alt="QR Code Pix Adotevale"
                className={styles.qr}
              />

              <div className={styles.pixBox}>
                <code>{PIX_KEY}</code>
                <button onClick={copyPix}>
                  {copied ? "Copiado ✔" : "Copiar Pix"}
                </button>
              </div>

              <small className={styles.disclaimer}>
                O valor arrecadado é usado exclusivamente para manter o site
                (domínio, hospedagem e manutenção).
              </small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
