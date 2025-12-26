import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaVenusMars,
  FaRulerCombined,
  FaSyringe,
  FaStethoscope,
  FaFilter,
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import styles from "./Catalogo.module.css";

export default function Catalogo() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const [filtroEspecie, setFiltroEspecie] = useState("todos");
  const [filtroCidade, setFiltroCidade] = useState("todas");
  const [filtroSexo, setFiltroSexo] = useState("todos");
  const [filtroPorte, setFiltroPorte] = useState("todos");
  const [filtroVacinado, setFiltroVacinado] = useState("todos");
  const [filtroCastrado, setFiltroCastrado] = useState("todos");

  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setFiltrosAbertos(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatarIdade = (idade) => {
    if (!idade) return "";
    return idade === 1 ? "1 mês" : `${idade} meses`;
  };

  useEffect(() => {
    const q = query(
      collection(db, "animals"),
      where("status", "==", "aprovado")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = [];
      const cidadesSet = new Set();

      snapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({ id: doc.id, ...data });
        if (data.cidade) cidadesSet.add(data.cidade);
      });

      setAnimais(lista);
      setCidades(Array.from(cidadesSet).sort());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const animaisFiltrados = animais.filter((a) => {
    const vacinado = a.vacinado ? "true" : "false";
    const castrado = a.castrado ? "true" : "false";

    return (
      (filtroEspecie === "todos" || a.especie === filtroEspecie) &&
      (filtroCidade === "todas" || a.cidade === filtroCidade) &&
      (filtroSexo === "todos" || a.sexo === filtroSexo) &&
      (filtroPorte === "todos" || a.porte === filtroPorte) &&
      (filtroVacinado === "todos" || vacinado === filtroVacinado) &&
      (filtroCastrado === "todos" || castrado === filtroCastrado)
    );
  });

  return (
    <main className={styles.catalogoMain}>
      {isMobile && (
        <div className={styles.filtroToggle}>
          <button onClick={() => setFiltrosAbertos((prev) => !prev)}>
            <FaFilter />
            Filtros
          </button>
        </div>
      )}

      <AnimatePresence>
        {(!isMobile || filtrosAbertos) && (
          <motion.section
            className={styles.filtros}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <div className={styles.filtroGroup}>
              <label>
                <MdOutlinePets /> Espécie
              </label>
              <select
                value={filtroEspecie}
                onChange={(e) => setFiltroEspecie(e.target.value)}
              >
                <option value="todos">Todas</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Coelho">Coelho</option>
                <option value="Hamster">Hamster</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className={styles.filtroGroup}>
              <label>
                <FaMapMarkerAlt /> Cidade
              </label>
              <select
                value={filtroCidade}
                onChange={(e) => setFiltroCidade(e.target.value)}
              >
                <option value="todas">Todas</option>
                {cidades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filtroGroup}>
              <label>
                <FaVenusMars /> Sexo
              </label>
              <select
                value={filtroSexo}
                onChange={(e) => setFiltroSexo(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>

            <div className={styles.filtroGroup}>
              <label>
                <FaRulerCombined /> Porte
              </label>
              <select
                value={filtroPorte}
                onChange={(e) => setFiltroPorte(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            <div className={styles.filtroGroup}>
              <label>
                <FaSyringe /> Vacinado
              </label>
              <select
                value={filtroVacinado}
                onChange={(e) => setFiltroVacinado(e.target.value)}
              >
                <option value="todos">Tanto faz</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div className={styles.filtroGroup}>
              <label>
                <FaStethoscope /> Castrado
              </label>
              <select
                value={filtroCastrado}
                onChange={(e) => setFiltroCastrado(e.target.value)}
              >
                <option value="todos">Tanto faz</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {animaisFiltrados.map((animal) => (
            <motion.div
              key={animal.id}
              layout={!isMobile}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.imageBox}>
                <img src={animal.foto} alt={animal.nome} />
                <span className={styles.badgeSexo}>{animal.sexo}</span>
              </div>

              <div className={styles.details}>
                <h3>{animal.nome}</h3>
                <div className={styles.infoBreve}>
                  <span>{formatarIdade(animal.idade)}</span>
                  <span>•</span>
                  <span>Porte {animal.porte}</span>
                </div>
                <p className={styles.cidadeText}>
                  <FaMapMarkerAlt /> {animal.cidade}
                </p>
                <Link to={`/animal/${animal.id}`} className={styles.btnLink}>
                  Ver Detalhes
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && animaisFiltrados.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhum pet encontrado com esses filtros</p>
        </div>
      )}
    </main>
  );
}
