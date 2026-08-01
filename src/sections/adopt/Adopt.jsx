import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Adopt.module.css";
import { FaPaw } from "react-icons/fa6";

export default function Adopt() {
  const [animais, setAnimais] = useState([]);

  const formatarIdade = (idade) => {
    if (idade === "" || idade == null) return "";

    return idade === 1 ? "1 mês" : `${idade} meses`;
  };

  useEffect(() => {
    const q = query(
      collection(db, "animals"),
      where("status", "==", "aprovado"),
      limit(4),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setAnimais(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="adopt" className={styles.adopt}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h5 className={styles.span}>
            <FaPaw size={20} />
            <span>Encontre seu novo amigo</span>
          </h5>

          <h1 className={styles.title}>Animais disponíveis para adoção</h1>
        </div>

        <div className={styles.grid}>
          {animais.map((animal) => (
            <Link key={animal.id} to={`/animal/${animal.id}`}>
              <div className={styles.card}>
                <div className={styles.imageBox}>
                  <img src={animal.foto} alt={animal.nome} />
                  <span className={styles.badgeSexo}>{animal.sexo}</span>
                </div>

                <div className={styles.details}>
                  <h3>{animal.nome}</h3>
                  <div className={styles.infoBreve}>
                    <span>{formatarIdade(animal.idade)}</span>
                    <span>• Porte {animal.porte}</span>
                  </div>
                  <p className={styles.cidadeText}>
                    <FaMapMarkerAlt /> {animal.cidade}
                  </p>
                  <div className={styles.btnLink}>Ver Detalhes</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link to="/catalogo" className={styles.btnMore}>
            Veja todos os pets
          </Link>
        </div>
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
    </section>
  );
}
