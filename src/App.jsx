import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Termos from "./pages/termos/Termos";
import Privacidade from "./pages/privacidade/Privacidade";
import Formulario from "./pages/formulario/Formulario";
import Header from "./sections/header/Header";
import Footer from "./sections/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Login from "./pages/login/Login";
import Painel from "./pages/painel/Painel";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/cadastro" element={<Formulario />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/painel"
          element={
            <PrivateRoute>
              <Painel />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
