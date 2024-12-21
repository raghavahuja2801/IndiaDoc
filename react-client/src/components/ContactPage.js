import React, { useState } from "react";
import Navbar from "./PatientNavbar";
import Footer from "./Footer";

const ContactPage = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    isSuccess: true,
    message: "",
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to Formspree
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      const response = await fetch(
        `https://formspree.io/f/${process.env.REACT_APP_FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (response.ok) {
        // Show success notification
        setNotification({
          show: true,
          isSuccess: true,
          message: "Message sent successfully! We'll get back to you soon.",
        });

        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");

        // Hide notification after 5 seconds
        setTimeout(() => {
          setNotification({ show: false, isSuccess: true, message: "" });
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Show error notification
      setNotification({
        show: true,
        isSuccess: false,
        message: "Failed to send message. Please try again.",
      });

      // Hide error notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, isSuccess: false, message: "" });
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
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
                {/* Name Input */}
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

                {/* Email Input */}
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

                {/* Message Input */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
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
                {/* Location */}
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 text-orange-500">📍</span>
                  <span>World-Wide</span>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 text-orange-500">📞</span>
                  <span>Coming Soon</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 text-orange-500">📧</span>
                  <span>globalhealthplatform@gmail.com</span>
                </div>

                {/* Office Hours */}
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

          {/* Notification */}
          {notification.show && (
            <div
              className={`mt-8 ${
                notification.isSuccess
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              } px-4 py-3 rounded-lg shadow border`}
            >
              <p className="text-center">{notification.message}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
