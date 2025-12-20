import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (carregando) return;

    setErro("");
    setCarregando(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/painel");
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        setErro("Muitas tentativas falhas. Tente mais tarde.");
      } else {
        setErro("E-mail ou senha incorretos.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className={styles.loginMain}>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <h2 className={styles.loginTitle}>Login Administrador</h2>

            {erro && <p className={styles.errorMsg}>{erro}</p>}

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                required
                disabled={carregando}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                disabled={carregando}
              />
            </div>

            <button type="submit" disabled={carregando}>
              {carregando ? "Autenticando..." : "Entrar no Painel"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
