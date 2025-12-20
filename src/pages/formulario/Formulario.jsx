import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../../services/firebase";
import { uploadImage } from "../../services/uploadImage";

import styles from "./Formulario.module.css";
import Modal from "../../components/modal/Modal";

export default function Formulario() {
  const [fotos, setFotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [form, setForm] = useState({
    nome: "",
    especie: "",
    sexo: "",
    idade: 1,
    porte: "",
    castrado: "",
    vacinado: "",
    cidade: "",
    descricao: "",
    whatsapp: "",
    confirmacao: false,
    termos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? value : value,
    }));
  };

  const handleFotos = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFotos([file]);
    setPreviews([URL.createObjectURL(file)]);

    e.target.value = "";
  };

  const removerFoto = () => {
    setFotos([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.confirmacao || !form.termos) {
      alert("Você precisa aceitar os termos");
      return;
    }

    if (fotos.length === 0) {
      alert("Envie ao menos uma foto");
      return;
    }

    setLoading(true);

    try {
      const urls = [];

      for (const foto of fotos) {
        const url = await uploadImage(foto);
        urls.push(url);
      }

      await addDoc(collection(db, "animals"), {
        nome: form.nome,
        especie: form.especie,
        sexo: form.sexo,
        idade: Number(form.idade),
        porte: form.porte,
        castrado: form.castrado,
        vacinado: form.vacinado,
        cidade: form.cidade,
        descricao: form.descricao,
        whatsapp: form.whatsapp,
        fotos: urls,
        ...form,
        status: "pendente",
        createdAt: serverTimestamp(),
      });

      setModalMessage("Seu cadastro foi enviado com sucesso!");
      setIsModalOpen(true);

      setForm({
        nome: "",
        especie: "",
        sexo: "",
        idade: 1,
        porte: "",
        castrado: "",
        vacinado: "",
        cidade: "",
        descricao: "",
        whatsapp: "",
        confirmacao: false,
        termos: false,
      });
      setFotos([]);
      setPreviews([]);
    } catch (err) {
      alert(err.message || "Erro ao enviar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.pageForm}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Cadastro de Animal
          <br /> para Adoção
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.fullWidth}>
            Foto do animal
            <input type="file" accept="image/*" onChange={handleFotos} />
          </label>

          <div className={styles.previewContainer}>
            {previews.map((src, index) => (
              <div key={index} className={styles.previewWrapper}>
                <img src={src} className={styles.previewImg} />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={removerFoto}
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}
          </div>

          <label>
            Nome do animal
            <input
              name="nome"
              placeholder="Digite o nome do animal"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Espécie
            <select
              name="especie"
              value={form.especie}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Coelho</option>
              <option>Hamster</option>
              <option>Outro</option>
            </select>
          </label>

          <label>
            Sexo
            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Macho</option>
              <option>Fêmea</option>
            </select>
          </label>

          <label>
            Idade aproximada (em meses)
            <input
              type="number"
              name="idade"
              min="1"
              step="1"
              value={form.idade}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Porte
            <select
              name="porte"
              value={form.porte}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
            </select>
          </label>

          <label>
            Castrado(a)
            <select
              name="castrado"
              value={form.castrado}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>

          <label>
            Vacinação em dia
            <select
              name="vacinado"
              value={form.vacinado}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>

          <label>
            Cidade
            <select
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Aracati</option>
              <option>Russas</option>
              <option>Morada Nova</option>
              <option>Limoeiro do Norte</option>
              <option>Jaguaribe</option>
              <option>Tabuleiro do Norte</option>
              <option>Quixeré</option>
              <option>Jaguaretama</option>
              <option>Alto Santo</option>
              <option>Pereiro</option>
              <option>Iracema</option>
              <option>Jaguaribara</option>
              <option>Palhano</option>
              <option>São João do Jaguaribe</option>
              <option>Ererê</option>
              <option>Potiretama</option>
            </select>
          </label>

          <label className={styles.fullWidth}>
            Descrição
            <textarea
              name="descricao"
              placeholder="Conte sobre o temperamento, convivência com crianças..."
              value={form.descricao}
              onChange={handleChange}
              rows="3"
              required
            />
          </label>

          <label className={styles.fullWidth}>
            WhatsApp
            <input
              name="whatsapp"
              placeholder="Ex: (88) 99999-9999"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
          </label>

          <div className={styles.fullWidth}>
            <div className={styles.checkbox}>
              <input
                id="confirmacao"
                type="checkbox"
                name="confirmacao"
                checked={form.confirmacao}
                onChange={handleChange}
              />
              <label htmlFor="confirmacao">
                <p>
                  Declaro que as informações são verdadeiras e não se trata de
                  venda
                </p>
              </label>
            </div>

            <div className={styles.checkbox}>
              <input
                id="termos"
                type="checkbox"
                name="termos"
                checked={form.termos}
                onChange={handleChange}
              />
              <label htmlFor="termos">
                <p>
                  Li e aceito os <Link to="/termos">Termos de Uso</Link> e a{" "}
                  <Link to="/privacidade">Política de Privacidade</Link>
                </p>
              </label>
            </div>
          </div>

          <button disabled={loading} className={styles.buttonform}>
            {loading ? "Enviando..." : "Enviar para Análise"}
          </button>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </main>
  );
}
