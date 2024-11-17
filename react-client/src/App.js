import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import LoginSignup from "./components/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
