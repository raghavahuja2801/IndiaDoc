import { Link } from "react-router-dom";
import { Stethoscope, Globe, Pill, Video, Calendar, CreditCard } from "lucide-react";
import Navbar from "./PatientNavbar";
import Footer from "./Footer";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Globe className="h-12 w-12 text-green-600" />,
      title: "Choose Your Doctor",
      description: "Browse our global network of certified healthcare professionals and select the one that best fits your needs.",
    },
    {
      icon: <Calendar className="h-12 w-12 text-green-600" />,
      title: "Book an Appointment",
      description: "Select a convenient time slot for your virtual consultation using our easy-to-use booking system.",
    },
    {
      icon: <Video className="h-12 w-12 text-green-600" />,
      title: "Attend Virtual Consultation",
      description: "Connect with your doctor through our secure video platform for a thorough and private consultation.",
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-green-600" />,
      title: "Receive Diagnosis & Treatment Plan",
      description: "Get expert medical advice and a personalized treatment plan from your healthcare provider.",
    },
    {
      icon: <Pill className="h-12 w-12 text-green-600" />,
      title: "Order Medications",
      description: "If prescribed, easily order your medications through our platform for convenient home delivery.",
    },
    {
      icon: <CreditCard className="h-12 w-12 text-green-600" />,
      title: "Secure Payment",
      description: "Pay for your consultation and medications securely through our encrypted payment system.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">How It Works</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            GlobalHealth makes it easy to access quality healthcare from anywhere in the world. Follow these simple steps to get started:
          </p>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0">{step.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold text-green-700 mb-2">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Ready to Get Started?</h3>
            <Link
              to="/auth"
              className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </main>

    <Footer />
    </div>
  );
}
