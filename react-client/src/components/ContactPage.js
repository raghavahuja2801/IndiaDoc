import React, { useState } from "react";
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer"; // Import Footer component

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send to backend)
    console.log("Form submitted:", { name, email, message });

    // Display a simple success message
    alert(
      "Message sent! We've received your message and will get back to you soon."
    );

    // Reset the form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              We're here to help. Reach out to us with any questions or
              concerns.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="4"
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 text-orange-500">📍</span>
                  <span>123 Healthcare Ave, Medical City, MC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 text-orange-500">📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 text-orange-500">📧</span>
                  <span>support@healthcareplatform.com</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Office Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
