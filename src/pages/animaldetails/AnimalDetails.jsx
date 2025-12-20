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

  // Lógica de Saúde Blindada (converte para booleano real)
  const isVacinado = animal.vacinado === true || animal.vacinado === "true";
  const isCastrado = animal.castrado === true || animal.castrado === "true";

  return (
    <main className={styles.detailMain}>
      <div className={styles.container}>
        {/* Lado Esquerdo: Imagem (CORREÇÃO: usando 'foto') */}
        <motion.div
          className={styles.imageSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={animal.foto} alt={animal.nome} />
        </motion.div>

        {/* Lado Direito: Informações */}
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
              <span>{animal.idade} meses</span>
            </div>
            <div className={styles.charItem}>
              <strong>Porte</strong>
              <span>{animal.porte}</span>
            </div>
          </div>

          {/* CORREÇÃO: Lógica de saúde atualizada para booleanos */}
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
            <a
              href={`https://wa.me/${animal.whatsapp?.replace(
                /\D/g,
                ""
              )}?text=Olá! Vi o ${
                animal.nome
              } no Adotevale e gostaria de saber mais.`}
              target="_blank"
              rel="noreferrer"
              className={styles.btnWhatsapp}
            >
              <FaWhatsapp /> Conversar agora
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
