import { useState } from "react";
import styles from "./Formulario.module.css";

export default function Formulario() {
  const [fotos, setFotos] = useState([]);

  const handleFotos = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("Você pode enviar no máximo 4 fotos.");
      return;
    }
    setFotos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cadastro enviado para análise!");
  };

  return (
    <main className={styles.pageForm}>
      <div className={styles.container}>
        <h1>Cadastro de Animal para Adoção</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Fotos do animal (máx. 4)
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFotos}
            />
          </label>

          <label>
            Nome do animal
            <input type="text" required />
          </label>

          <label>
            Espécie
            <select required>
              <option value="">Selecione</option>
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Coelho</option>
              <option>Hamsters</option>
              <option>Porquinhos-da-índia</option>
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

          <label>
            Descrição do animal
            <textarea
              rows="4"
              placeholder="Conte sobre o temperamento, convivência com crianças ou outros animais..."
              required
            />
          </label>

          <label>
            WhatsApp para contato
            <input type="tel" placeholder="Ex: (88) 99999-9999" required />
          </label>

          <label className={styles.checkbox}>
            <input type="checkbox" required />
            Declaro que as informações são verdadeiras e que não se trata de
            venda.
          </label>

          <label className={styles.checkbox}>
            <input type="checkbox" required />
            Li e concordo com os
            <a href="/termos" target="_blank" rel="noopener noreferrer">
              Termos de Uso
            </a>
            e a
            <a href="/privacidade" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>
            .
          </label>

          <button className={styles.buttonform} type="submit">
            Enviar para Análise
          </button>
        </form>
      </div>
    </main>
  );
}
