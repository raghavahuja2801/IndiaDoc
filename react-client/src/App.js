import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import LoginSignup from "./components/Auth";
import HomePage from "./components/Dashboard";
import HowItWorks from "./components/HowItWorks";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import Services from "./components/Services";
=======
import DoctorOnboarding from "./components/Doctor-Onboarding";
>>>>>>> Stashed changes
=======
import DoctorOnboarding from "./components/Doctor-Onboarding";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <Route path="/services" element={<Services />} />
=======
        <Route path="/doctor-onboard" element={<DoctorOnboarding />} />
>>>>>>> Stashed changes
=======
        <Route path="/doctor-onboard" element={<DoctorOnboarding />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
