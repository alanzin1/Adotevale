import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaSyringe,
  FaStethoscope,
} from "react-icons/fa";
import styles from "./AnimalDetails.module.css";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatarIdade = (idade) => {
    if (idade === "" || idade == null) return "";

    return idade === 1 ? "1 mês" : `${idade} meses`;
  };

  useEffect(() => {
    async function getAnimal() {
      try {
        const docRef = doc(db, "animals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAnimal({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Animal não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar animal:", error);
      } finally {
        setLoading(false);
      }
    }
    getAnimal();
  }, [id]);

  if (loading)
    return <div className={styles.loader}>Buscando informações...</div>;

  if (!animal)
    return (
      <div className={styles.error}>Animal não encontrado ou já adotado.</div>
    );

  const isVacinado = animal.vacinado === true || animal.vacinado === "true";
  const isCastrado = animal.castrado === true || animal.castrado === "true";

  return (
    <main className={styles.detailMain}>
      <div className={styles.container}>
        <motion.div
          className={styles.imageSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={animal.foto} alt={animal.nome} />
        </motion.div>

        <motion.div
          className={styles.infoSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className={styles.header}>
            <h1>{animal.nome}</h1>
            <span className={styles.badgeEspecie}>{animal.especie}</span>
          </div>

          <p className={styles.location}>
            <FaMapMarkerAlt /> {animal.cidade} - Ceará
          </p>

          <div className={styles.characteristics}>
            <div className={styles.charItem}>
              <strong>Sexo</strong>
              <span>{animal.sexo}</span>
            </div>
            <div className={styles.charItem}>
              <strong>Idade</strong>
              <span>{formatarIdade(animal.idade)}</span>
            </div>
            <div className={styles.charItem}>
              <strong>Porte</strong>
              <span>{animal.porte}</span>
            </div>
          </div>

          <div className={styles.health}>
            <p className={isVacinado ? styles.yes : styles.no}>
              <FaSyringe /> {isVacinado ? "Vacinado" : "Não vacinado"}
            </p>
            <p className={isCastrado ? styles.yes : styles.no}>
              <FaStethoscope /> {isCastrado ? "Castrado" : "Não castrado"}
            </p>
          </div>

          <div className={styles.description}>
            <h3>
              <FaInfoCircle /> Sobre mim
            </h3>
            <p>{animal.descricao}</p>
          </div>

          <div className={styles.contactCard}>
            <h3>Quer me adotar?</h3>
            <p>Entre em contato com o tutor responsável via WhatsApp:</p>

            <motion.a
              className={styles.btnWhatsapp}
              href={`https://wa.me/${animal.whatsapp}?text=${encodeURIComponent(
                `Olá! Vi o ${animal.nome} no AdoteVale e gostaria de saber mais.`
              )}`}
              target="_blank"
              rel="noreferrer"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaWhatsapp size={20} />
              Conversar agora
            </motion.a>
          </div>
        </motion.div>
      </div>
      <div className={styles.divider}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={styles.dividerSvg}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28 70.36-5.37,136.33-33.31,206.8-37.5 C438.64,32.43,512.34,53.67,583,72.05 c69.27,18,138.3,24.88,209.4,13.08 36.15-6,69.85-17.84,104.45-29.34 C989.49,25,1113-14.29,1200,52.47V0Z"
            className={`${styles.shape} ${styles.wave1}`}
          />
          <path
            d="M0,0V15.81C47,42,104,68,167,76 256,87,342,58,421,34 486,15,562,0,636,7 702,13,768,40,838,61 916,84,996,85,1200,40V0Z"
            className={`${styles.shape} ${styles.wave2}`}
          />
          <path
            d="M0,0V5.63C150,59,314,71,476,43 606,20,720,5,856,18 992,32,1096,11,1200,0V0Z"
            className={`${styles.shape} ${styles.wave3}`}
          />
        </svg>
      </div>
    </main>
  );
}
