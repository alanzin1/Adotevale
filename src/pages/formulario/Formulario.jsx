import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../../services/firebase";
import { uploadImage } from "../../services/uploadImage";

import styles from "./Formulario.module.css";
import Modal from "../../components/modal/Modal";

export default function Formulario() {
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [form, setForm] = useState({
    nome: "",
    especie: "",
    sexo: "",
    idade: 1,
    porte: "",
    castrado: false,
    vacinado: false,
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
      [name]:
        type === "checkbox"
          ? checked
          : name === "castrado" || name === "vacinado"
          ? value === "true"
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFoto(file);
    setPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const removerFoto = () => {
    setFoto(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.confirmacao || !form.termos) {
      alert("Você precisa aceitar os termos e a declaração.");
      return;
    }

    if (!foto) {
      alert("Por favor, envie uma foto do animal.");
      return;
    }

    setLoading(true);

    try {
      // Upload da foto única
      const url = await uploadImage(foto);

      // Objeto organizado para o Firestore
      const dadosParaEnviar = {
        ...form,
        foto: url,
        status: "pendente",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "animals"), dadosParaEnviar);

      setModalMessage("Seu cadastro foi enviado com sucesso!");
      setIsModalOpen(true);

      // Reset de todos os campos
      setForm({
        nome: "",
        especie: "",
        sexo: "",
        idade: 1,
        porte: "",
        castrado: false,
        vacinado: false,
        cidade: "",
        descricao: "",
        whatsapp: "",
        confirmacao: false,
        termos: false,
      });
      setFoto(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.pageForm}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Cadastro de Animal <br /> para Adoção
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.fullWidth}>
            Foto do animal
            <input type="file" accept="image/*" onChange={handleFoto} />
          </label>

          {preview && (
            <div className={styles.previewContainer}>
              <div className={styles.previewWrapper}>
                <img
                  src={preview}
                  className={styles.previewImg}
                  alt="Preview"
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={removerFoto}
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>
          )}

          <label>
            Nome do animal
            <input
              name="nome"
              placeholder="Digite o nome"
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
            Idade (meses)
            <input
              type="number"
              name="idade"
              min="1"
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
              value={form.castrado.toString()}
              onChange={handleChange}
              required
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </label>

          <label>
            Vacinação em dia
            <select
              name="vacinado"
              value={form.vacinado.toString()}
              onChange={handleChange}
              required
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
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
              <option>Ererê</option>
              <option>Iracema</option>
              <option>Itaiçaba</option>
              <option>Jaguaretama</option>
              <option>Jaguaribara</option>
              <option>Jaguaribe</option>
              <option>Jaguaruana</option>
              <option>Limoeiro do Norte</option>
              <option>Palhano</option>
              <option>Pereiro</option>
              <option>Potiretama</option>
              <option>Quixeré</option>
              <option>Russas</option>
              <option>Tabuleiro do Norte</option>
            </select>
          </label>

          <label className={styles.fullWidth}>
            Descrição
            <textarea
              name="descricao"
              placeholder="Conte sobre o temperamento..."
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
              placeholder="(88) 99999-9999"
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
                <p>Declaro que as informações são verdadeiras e não é venda</p>
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
                  Li e aceito os <Link to="/termos">Termos</Link> e a{" "}
                  <Link to="/privacidade">Privacidade</Link>
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
