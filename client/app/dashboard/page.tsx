"use client";

import { useState } from 'react'
import Link from "next/link"

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the booking logic
    console.log('Booking:', { selectedSpecialty, selectedDate, selectedTime })
    alert('Consultation booked successfully!')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-2xl font-bold text-green-600">GlobalHealth</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
            My Consultations
          </Link>
          <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
            Medicine Orders
          </Link>
          <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
            Profile
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Welcome back, User!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Book a Consultation</h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                    Select Specialty
                  </label>
                  <select
                    id="specialty"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Choose a specialty</option>
                    <option value="general">General Practitioner</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Select Time
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Choose a time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Book Consultation
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">Quick Actions</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-orange-600 hover:text-orange-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      View Upcoming Consultations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-orange-600 hover:text-orange-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Order Medicines
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-orange-600 hover:text-orange-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Health Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-800 mb-2">Your Health Summary</h2>
                <p className="text-gray-600 mb-4">Last check-up: 3 months ago</p>
                <Link href="#" className="text-green-600 hover:text-green-800 font-medium">
                  View Full Health Record →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200">
        <p className="text-xs text-gray-600">© 2023 GlobalHealth. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-orange-500" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-orange-500" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}