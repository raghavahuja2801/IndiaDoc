import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PatientAuth from "./components/PatientAuth";
import Dashboard from "./components/Dashboard";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import DoctorOnboarding from "./components/Doctor-Onboarding";
import About from "./components/About";
import ContactPage from "./components/ContactPage";
import DoctorAuth from "./components/DoctorAuth";
import MessagesPage from './components/messages-page';
import DoctorProfile from './components/DoctorProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<PatientAuth />} />
        <Route path="/doctor-auth" element={<DoctorAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctor-onboard" element={<DoctorOnboarding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<DoctorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
