import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext"

export default function LandingPage() {
  const navigate = useNavigate();
  const {user} = useAuth();

  const handleConsultDoctorClick = () => {
    if(user){
      navigate('/dashboard')

    }else{
    navigate("/auth"); // Navigate to the auth page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-green-800">
                  Global Healthcare at Your Fingertips
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Consult doctors worldwide and order medicines online. Your health, our priority.
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={handleConsultDoctorClick}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-green-600 text-white hover:bg-green-700 h-11 px-8 py-2"
                >
                  Consult a Doctor
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-green-600 text-green-600 hover:bg-green-50 h-11 px-8 py-2">
                  Order Medicines
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">
                    Our Services
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                    Experience healthcare like never before with our comprehensive services.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 items-start lg:grid-cols-4 max-w-5xl">
                {[
                  {
                    title: "Online Consultations",
                    description:
                      "Connect with doctors globally for expert advice",
                  },
                  {
                    title: "Medicine Delivery",
                    description: "Order and receive medicines at your doorstep",
                  },
                  {
                    title: "24/7 Support",
                    description:
                      "Round-the-clock assistance for all your health needs",
                  },
                  {
                    title: "Global Network",
                    description:
                      "Access to a worldwide network of healthcare professionals",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2 border border-green-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                      <span className="text-2xl text-orange-500">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-700">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-800">
                  Start Your Health Journey Today
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users who have transformed their
                  healthcare experience with GlobalHealth.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-11 w-full rounded-md border border-green-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-orange-500 text-white hover:bg-orange-600 h-11 px-8 py-2"
                    type="submit"
                  >
                    Get Started
                  </button>
                </form>
                <p className="text-xs text-gray-600">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
