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
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import styles from "./Catalogo.module.css";

export default function Catalogo() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados dos Filtros
  const [filtroEspecie, setFiltroEspecie] = useState("todos");
  const [filtroCidade, setFiltroCidade] = useState("todas");
  const [filtroSexo, setFiltroSexo] = useState("todos");
  const [filtroPorte, setFiltroPorte] = useState("todos");
  const [filtroVacinado, setFiltroVacinado] = useState("todos");
  const [filtroCastrado, setFiltroCastrado] = useState("todos");

  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "animals"),
      where("status", "==", "aprovado")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let lista = [];
      const listaCidades = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({ id: doc.id, ...data });
        if (data.cidade) listaCidades.add(data.cidade);
      });

      setAnimais(lista);
      setCidades(Array.from(listaCidades).sort());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // CORREÇÃO NA LÓGICA DE FILTRAGEM
  const animaisFiltrados = animais.filter((a) => {
    // Converte os valores do banco para string para comparar com o valor do <select>
    const castradoStatus = a.castrado ? "true" : "false";
    const vacinadoStatus = a.vacinado ? "true" : "false";

    return (
      (filtroEspecie === "todos" || a.especie === filtroEspecie) &&
      (filtroCidade === "todas" || a.cidade === filtroCidade) &&
      (filtroSexo === "todos" || a.sexo === filtroSexo) &&
      (filtroPorte === "todos" || a.porte === filtroPorte) &&
      (filtroVacinado === "todos" || vacinadoStatus === filtroVacinado) &&
      (filtroCastrado === "todos" || castradoStatus === filtroCastrado)
    );
  });

  return (
    <main className={styles.catalogoMain}>
      <section className={styles.filtros}>
        {/* Espécie */}
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

        {/* Cidade */}
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

        {/* Sexo */}
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

        {/* Porte */}
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

        {/* Vacinado - CORREÇÃO NOS VALUES */}
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

        {/* Castrado - CORREÇÃO NOS VALUES */}
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
      </section>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {animaisFiltrados.map((animal) => (
            <motion.div
              layout
              key={animal.id}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.imageBox}>
                {/* Garantindo que usa a chave 'foto' (singular) */}
                <img src={animal.foto} alt={animal.nome} />
                <span className={styles.badgeSexo}>{animal.sexo}</span>
              </div>
              <div className={styles.details}>
                <h3>{animal.nome}</h3>
                <div className={styles.infoBreve}>
                  <span>{animal.idade} meses</span>
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

      {animaisFiltrados.length === 0 && !loading && (
        <div className={styles.empty}>
          <p>Nenhum pet encontrado com esses filtros</p>
        </div>
      )}
    </main>
  );
}
