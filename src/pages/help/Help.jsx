import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import styles from "./Help.module.css";
import dog from "/dog-comp.webp";
import qrcode from "/qrcode.jpeg";

const PIX_KEY =
  "00020126580014br.gov.bcb.pix013620a16157-7a05-412d-be1a-b5b7dc9959405204000053039865802BR5925Alan Victor Soares Vieira6009Sao Paulo610901227-20062240520daqr252596265291220963041D5E";

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
      <section id="ajuda" className={styles.help}>
        <div className={styles.container}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <h2 className={styles.title}>Ajude nosso site</h2>

            <p className={styles.text}>
              AdoteVale é um projeto comunitário e sem fins lucrativos, criado
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
            src={dog}
            alt="Ajude o Adotevale a continuar ajudando animais"
            className={styles.image}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [-3, 3] }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
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

              <h3>Apoie AdoteVale</h3>

              <p className={styles.modalText}>
                Se estiver no computador, escaneie o QR Code com o celular.
                <br />
                Se estiver no celular, use o Pix Copia e Cola.
              </p>

              <img
                src={qrcode}
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
