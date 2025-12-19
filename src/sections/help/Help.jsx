import { useState } from "react";
import styles from "./Help.module.css";

const PIX_KEY =
  "00020126580014BR.GOV.BCB.PIX0136SUA-CHAVE-PIX-AQUI5204000053039865802BR5920Adotvale Projeto6009Jaguaribe62070503***6304ABCD";

export default function Help() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyPix() {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <section id="ajude" className={styles.help}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>Ajude Nosso Site</h2>

            <p className={styles.text}>
              A Adotvale é um projeto comunitário e sem fins lucrativos, criado
              para ajudar os animais. No entanto, para continuar funcionando,
              precisa de apoio financeiro para cobrir custos como domínio,
              hospedagem e manutenção.
            </p>

            <p className={styles.text}>
              Sem esse apoio, o site corre o risco de sair do ar. Se você acredita
              na causa, considere fazer uma doação — sua ajuda é essencial para
              que o Adotvale continue.
            </p>

            <button
              className={styles.button}
              onClick={() => setOpen(true)}
            >
              Quero ajudar
            </button>
          </div>

          <img
            src="/help-donation.png"
            alt="Ajude o Adotvale a continuar ajudando animais"
            className={styles.image}
          />
        </div>
      </section>

      {/* MODAL PIX */}
      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h3>Ajude o Adotevale</h3>

            <p className={styles.modalText}>
              Se estiver no computador, escaneie o QR Code com o celular.
              <br />
              Se estiver no celular, use o Pix Copia e Cola.
            </p>

            <img
              src="/qrcode.webp"
              alt="QR Code Pix Adotvale"
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
          </div>
        </div>
      )}
    </>
  );
}
