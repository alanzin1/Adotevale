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
    idade: "",
    porte: "",
    castrado: false,
    vacinado: false,
    cidade: "",
    descricao: "",
    whatsapp: "",
    confirmacao: false,
    termos: false,
  });
  const onlyNumbers = (value) => value.replace(/\D/g, "");

  const normalizeBRPhone = (value) => {
    let numbers = onlyNumbers(value);

    if (numbers.length === 10 && numbers[2] !== "9") {
      numbers = numbers.slice(0, 2) + "9" + numbers.slice(2);
    }

    return numbers.slice(0, 11);
  };

  const maskBRPhone = (numbers) => {
    if (numbers.length <= 2) return numbers;

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7
    )}`;
  };

  const isValidWhatsApp = (value) => {
    const numbers = onlyNumbers(value);
    return numbers.length === 11 && numbers[2] === "9";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "descricao" && value.length > 250) return;

    if (name === "whatsapp") {
      const normalized = normalizeBRPhone(value);
      setForm((prev) => ({
        ...prev,
        whatsapp: maskBRPhone(normalized),
      }));
      return;
    }
    if (name === "idade") {
      const digits = value.replace(/\D/g, "");

      setForm((prev) => ({
        ...prev,
        idade: digits === "" ? "" : Number(digits),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "castrado" || name === "vacinado"
          ? value === "true"
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
      setModalMessage("Você precisa aceitar os termos e a declaração");
      setIsModalOpen(true);
      return;
    }

    if (!foto) {
      setModalMessage("Por favor, envie uma foto do animal");
      setIsModalOpen(true);
      return;
    }
    if (!form.idade || form.idade < 1) {
      setModalMessage("Informe a idade em meses (mínimo 1)");
      setIsModalOpen(true);
      return;
    }

    if (!isValidWhatsApp(form.whatsapp)) {
      setModalMessage("Informe um número de WhatsApp válido com DDD");
      setIsModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      const url = await uploadImage(foto);

      const dadosParaEnviar = {
        ...form,
        descricao: form.descricao.slice(0, 200),
        whatsapp: `55${onlyNumbers(form.whatsapp)}`,
        foto: url,
        status: "pendente",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "animals"), dadosParaEnviar);

      setModalMessage(
        "Animal cadastrado com sucesso! Nossa equipe irá analisar seu anúncio e publicá-lo em breve."
      );
      setIsModalOpen(true);

      setForm({
        nome: "",
        especie: "",
        sexo: "",
        idade: "",
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
      setModalMessage("Ocorreu um erro ao enviar. Tente novamente.");
      setIsModalOpen(true);
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
              type="text"
              name="idade"
              inputMode="numeric"
              placeholder="Ex: 2"
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
              <option>Alto Santo</option>
              <option>Ererê</option>
              <option>Iracema</option>
              <option>Jaguaretama</option>
              <option>Jaguaribara</option>
              <option>Jaguaribe</option>
              <option>Limoeiro do Norte</option>
              <option>Morada Nova</option>
              <option>Palhano</option>
              <option>Pereiro</option>
              <option>Potiretama</option>
              <option>Quixeré</option>
              <option>Russas</option>
              <option>São João do Jaguaribe</option>
              <option>Tabuleiro do Norte</option>
            </select>
          </label>

          <label className={styles.fullWidth}>
            Descrição
            <textarea
              name="descricao"
              placeholder="Conte sobre o temperamento, comportamento, convivência..."
              value={form.descricao}
              onChange={handleChange}
              rows="3"
              maxLength={250}
              required
            />
            <span className={styles.charCount}>
              {form.descricao.length} / 250
            </span>
          </label>

          <label className={styles.fullWidth}>
            WhatsApp (para os interessados entrarem em contato)
            <input
              type="tel"
              name="whatsapp"
              placeholder="(88) 99999-9999"
              value={form.whatsapp}
              onChange={handleChange}
              required
              inputMode="numeric"
              autoComplete="tel"
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
