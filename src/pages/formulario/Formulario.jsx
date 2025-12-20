import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

import styles from "./Formulario.module.css";

export default function Formulario() {
  const [fotos, setFotos] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFotos = (e) => {
    const files = Array.from(e.target.files);

    if (fotos.length + files.length > 4) {
      alert("Você pode enviar no máximo 4 fotos.");
      return;
    }

    const novosPreviews = files.map((file) => URL.createObjectURL(file));

    setFotos((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...novosPreviews]);

    e.target.value = "";
  };
  const removerFoto = (index) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cadastro enviado para análise!");
    console.log("Dados prontos para envio:", fotos);
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
            Fotos do animal (máx. 4)
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFotos}
            />
            <div className={styles.previewContainer}>
              {previews.map((src, index) => (
                <div key={index} className={styles.previewWrapper}>
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className={styles.previewImg}
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removerFoto(index)}
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ))}
            </div>
          </label>

          <label>
            Nome do animal
            <input type="text" placeholder="Nome do pet" required />
          </label>

          <label>
            Espécie
            <select required>
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
            <select required>
              <option value="">Selecione</option>
              <option>Macho</option>
              <option>Fêmea</option>
            </select>
          </label>

          <label>
            Idade aproximada
            <input type="text" placeholder="Ex: 2 anos" required />
          </label>

          <label>
            Porte
            <select required>
              <option value="">Selecione</option>
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
            </select>
          </label>

          <label>
            Castrado(a)
            <select required>
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>

          <label>
            Vacinação em dia
            <select required>
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>

          <label>
            Cidade
            <select required>
              <option value="">Selecione a cidade</option>
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
            Descrição do animal
            <textarea
              rows="3"
              placeholder="Conte sobre o temperamento, convivência com crianças..."
              required
            />
          </label>

          <label className={styles.fullWidth}>
            WhatsApp para contato de interessados
            <input type="tel" placeholder="Ex: (88) 99999-9999" required />
          </label>

          <div className={styles.fullWidth}>
            <div className={styles.checkbox}>
              <input id="confirmacao" type="checkbox" required />
              <label htmlFor="confirmacao">
                Declaro que as informações são verdadeiras e não se trata de
                venda
              </label>
            </div>

            <div className={styles.checkbox}>
              <input id="termos" type="checkbox" required />
              <label htmlFor="termos">
                <p>
                  Li e concordo com os <Link to="/termos">Termos de Uso</Link> e
                  com a <Link to="/privacidade">Política de Privacidade</Link>
                </p>
              </label>
            </div>
          </div>

          <button className={styles.buttonform} type="submit">
            Enviar para Análise
          </button>
        </form>
      </div>
    </main>
  );
}
