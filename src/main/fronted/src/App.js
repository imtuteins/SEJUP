import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from "./components/Login";
import Home from "./components/Home";
import Archivos from "./components/Archivos";
import ListadoClientes from './components/ListadoClientes';
import ListadoAbogados from './components/ListadoAbogados';
import AdminHome from './components/AdminHome';
import AbogadoHome from './components/AbogadoHome';
import ClienteHome from './components/ClienteHome';


function App() {
  return (
    <GoogleOAuthProvider clientId="1038265379119-mbtaqfbva0d629656op6oimgppjlcbfe.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/archivos" element={<Archivos />} />
          <Route path="/clientes" element={<ListadoClientes />} />
          <Route path="/abogados" element={<ListadoAbogados />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/abogado" element={<AbogadoHome />} />
          <Route path="/cliente" element={<ClienteHome />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
