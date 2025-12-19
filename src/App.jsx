import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Termos from "./pages/termos/Termos";
import Privacidade from "./pages/privacidade/Privacidade";
import Header from "./sections/header/Header";
import Footer from "./sections/footer/Footer";
import Formulario from "./pages/formulario/Formulario";
import ScrollToTop from "./utils/ScrollToTop";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
