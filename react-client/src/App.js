import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginSignup from "./components/Auth";
import HomePage from "./components/Dashboard";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import DoctorOnboarding from "./components/Doctor-Onboarding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctor-onboard" element={<DoctorOnboarding />} />
        <Route path="/doctor-onboard" element={<DoctorOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
