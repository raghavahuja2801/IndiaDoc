import React from "react";
// Import your Navbar and Footer components here
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Placeholder */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Revolutionizing healthcare access, one click at a time
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-16 max-w-4xl mx-auto">
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700">
                At our core, we believe that quality healthcare should be
                accessible to everyone, regardless of their location or
                circumstances. Our mission is to bridge the gap between patients
                and healthcare providers, leveraging technology to create a
                seamless, efficient, and user-friendly platform. We strive to
                empower individuals to take control of their health, providing
                them with the tools and resources they need to make informed
                decisions and receive timely care. Through innovation and
                compassion, we're committed to transforming the healthcare
                landscape, one virtual consultation at a time.
              </p>
            </div>
          </div>

          {/* Founders Section */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Founders
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Founder: Ozafa */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-orange-100">
                  <img
                    src="/ozafaimg.jpeg"
                    alt="Ozafa Yousuf Mahmood"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Ozafa Yousuf Mahmood
                </h3>
                <p className="text-gray-600 mb-4">
                  3rd year Computer Science student at SFU
                </p>
                <p className="text-gray-700">
                  Driven by a passion for technology and a desire to make a
                  meaningful impact, Ozafa envisioned a world where accessing
                  quality healthcare is as simple as a few taps on a screen.
                  Growing up, he witnessed firsthand the challenges people face
                  in getting timely medical assistance, especially in
                  underserved areas. This experience fueled his determination to
                  create a platform that bridges the gap between patients and
                  healthcare providers, making quality medical advice accessible
                  to all.
                </p>
              </div>
            </div>

            {/* Founder: Raghav */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-orange-100">
                  <img
                    src="/raghavimg.jpeg"
                    alt="Raghav Ahuja"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Raghav Ahuja
                </h3>
                <p className="text-gray-600 mb-4">
                  3rd Year Computer Science major with Minor in Economics
                </p>
                <p className="text-gray-700">
                  Hailing from India, Raghav brings a unique perspective to the
                  team, having experienced firsthand the challenges of accessing
                  reliable healthcare in a densely populated country. His
                  background in both computer science and economics gives him a
                  holistic view of the healthcare industry's technical and
                  financial aspects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Placeholder */}
      <Footer />
    </div>
  );
}
