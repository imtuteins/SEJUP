import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from "./components/Login";
import Home from "./components/Home";
import Archivos from "./components/Archivos";

function App() {
  return (
    <GoogleOAuthProvider clientId="1038265379119-mbtaqfbva0d629656op6oimgppjlcbfe.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/archivos" element={<Archivos />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
