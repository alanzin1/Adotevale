import { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTrashAlt,
  FaHourglassHalf,
  FaSyringe,
  FaStethoscope,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import styles from "./Painel.module.css";

const AnimalCard = ({ animal, isAdminView, handleAprovar, handleExcluir }) => {
  const isCastrado = animal.castrado === true || animal.castrado === "true";
  const isVacinado = animal.vacinado === true || animal.vacinado === "true";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={animal.foto} alt={animal.nome} className={styles.foto} />
        <span className={`${styles.badge} ${styles[animal.status]}`}>
          {animal.status === "pendente" ? (
            <FaHourglassHalf />
          ) : (
            <FaCheckCircle />
          )}
          {animal.status}
        </span>
      </div>

      <div className={styles.info}>
        <div className={styles.headerCard}>
          <h3>{animal.nome}</h3>
          <span className={styles.idade}>{animal.idade} meses</span>
        </div>

        <p className={styles.subtitulo}>
          <MdOutlinePets /> <strong>{animal.especie}</strong> • {animal.sexo} •
          Porte {animal.porte}
        </p>

        <p className={styles.localizacao}>
          <FaMapMarkerAlt /> {animal.cidade}
        </p>

        <div className={styles.detalhes}>
          <span className={isCastrado ? styles.check : styles.uncheck}>
            <FaStethoscope /> {isCastrado ? "Castrado" : "Não castrado"}
          </span>
          <span className={isVacinado ? styles.check : styles.uncheck}>
            <FaSyringe /> {isVacinado ? "Vacinado" : "Não vacinado"}
          </span>
        </div>

        <p className={styles.descricao}>{animal.descricao}</p>

        <a
          href={`https://wa.me/${animal.whatsapp?.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className={styles.whatsapp}
        >
          <FaWhatsapp /> {animal.whatsapp}
        </a>

        <div className={styles.acoes}>
          {isAdminView && animal.status === "pendente" && (
            <button
              onClick={() => handleAprovar(animal.id)}
              className={styles.btnAprovar}
            >
              <FaCheckCircle /> Aprovar
            </button>
          )}
          <button
            onClick={() => handleExcluir(animal.id)}
            className={styles.btnExcluir}
          >
            <FaTrashAlt />{" "}
            {animal.status === "pendente" ? "Reprovar" : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Painel() {
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "animals"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setAnimais(lista);
      setCarregando(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert("Erro ao sair!");
    }
  };

  const handleAprovar = async (id) => {
    try {
      await updateDoc(doc(db, "animals", id), { status: "aprovado" });
    } catch (err) {
      alert("Erro ao aprovar: " + err.message);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este registro?")) {
      try {
        await deleteDoc(doc(db, "animals", id));
      } catch (err) {
        alert("Erro ao excluir: " + err.message);
      }
    }
  };

  const pendentes = animais.filter((a) => a.status === "pendente");
  const aprovados = animais.filter((a) => a.status === "aprovado");

  if (carregando)
    return (
      <div className={styles.loadingArea}>
        <MdOutlinePets className={styles.spin} />
        <p>Carregando painel...</p>
      </div>
    );

  return (
    <main className={styles.painelMain}>
      <header className={styles.painelHeader}>
        <div className={styles.headerTop}>
          <h1>Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className={styles.btnLogout}
            title="Sair do Sistema"
          >
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </header>

      <section className={styles.secao}>
        <h2 className={styles.tituloSecao}>
          <FaHourglassHalf /> Pendentes ({pendentes.length})
        </h2>
        <div className={styles.grid}>
          {pendentes.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isAdminView={true}
              handleAprovar={handleAprovar}
              handleExcluir={handleExcluir}
            />
          ))}
        </div>
      </section>

      <section className={styles.secao}>
        <h2 className={styles.tituloSecao}>
          <FaCheckCircle /> Anúncios Ativos ({aprovados.length})
        </h2>
        <div className={styles.grid}>
          {aprovados.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isAdminView={false}
              handleAprovar={handleAprovar}
              handleExcluir={handleExcluir}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
