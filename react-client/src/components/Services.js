import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Stethoscope, Pill, MessageCircle } from "lucide-react"; // Using only icons here
import Navbar from "./Navbar";
import Footer from "./Footer";

const ServicesPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const services = [
    {
      icon: <Stethoscope className="h-8 w-8 text-orange-500" />,
      title: "Online Doctor Consultation",
      description:
        "Connect with experienced doctors from the comfort of your home.",
      howTo:
        "Book an appointment, join the video call at the scheduled time, and discuss your health concerns with the doctor.",
    },
    {
      icon: <Pill className="h-8 w-8 text-orange-500" />,
      title: "Online Medicine Ordering",
      description:
        "Order prescribed medications and have them delivered to your doorstep.",
      howTo:
        "Upload your prescription, select the required medicines, make the payment, and wait for the delivery.",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-orange-500" />,
      title: "24/7 Chat Support",
      description:
        "Get instant answers to your health-related queries from our medical team.",
      howTo:
        "Open the chat feature in the app, type your question, and receive expert advice within minutes.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Services
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive healthcare solutions at your fingertips
            </p>
          </div>

          {/* Services Section */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                {/* Icon and Title */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 text-center">
                    {service.title}
                  </h2>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <p className="text-center text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* How to Use */}
                <div className="mt-4">
                  <h4 className="font-semibold text-green-700 text-center">
                    How to use:
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    {service.howTo}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/auth")} // Navigate to the login page
                    className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore All Services Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/auth")} // Optional: make Explore All Services also go to /auth
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600"
          >
            Explore All Services
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
