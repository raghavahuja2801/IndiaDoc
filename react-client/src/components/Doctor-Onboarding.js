import React, { useState } from 'react'
import { Link} from "react-router-dom";
import { Calendar, Clock } from 'lucide-react'
import Footer from './Footer'
import DoctorNavbar from './Doctor-Navbar';

export default function DoctorOnboarding() {
  const [selectedDays, setSelectedDays] = useState([])
  const [availableHours, setAvailableHours] = useState([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    license: '',
    bio: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleDaySelect = (day: Date) => {
    setSelectedDays(prevDays => {
      const isSelected = prevDays.some(d => d.toDateString() === day.toDateString())
      if (isSelected) {
        return prevDays.filter(d => d.toDateString() !== day.toDateString())
      } else {
        return [...prevDays, day]
      }
    })
  }

  const handleHourSelect = (hour: string) => {
    setAvailableHours(prevHours => {
      if (prevHours.includes(hour)) {
        return prevHours.filter(h => h !== hour)
      } else {
        return [...prevHours, hour]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log('Form submitted', { ...formData, selectedDays, availableHours })
    alert('Profile information submitted successfully!')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
        <DoctorNavbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">Professional Information</h2>
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
                <select
                  id="specialization"
                  name="specialization"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.specialization}
                  onChange={handleInputChange}
                >
                  <option value="">Select your specialization</option>
                  <option value="general">General Practitioner</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="license" className="block text-sm font-medium text-gray-700">Medical License Number</label>
                <input
                  type="text"
                  id="license"
                  name="license"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.license}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Upload Medical Degree</label>
                <input
                  type="file"
                  id="degree"
                  name="degree"
                  accept=".pdf,.jpg,.png"
                  required
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Professional Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Tell us about your professional background and expertise..."
                  value={formData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">Availability</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Available Days</label>
                <div className="inline-block rounded-md border border-gray-300 shadow-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                    const date = new Date()
                    date.setDate(date.getDate() - date.getDay() + index)
                    const isSelected = selectedDays.some(d => d.toDateString() === date.toDateString())
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDaySelect(date)}
                        className={`px-3 py-2 text-sm ${
                          isSelected
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-green-50'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Available Hours</label>
                <div className="grid grid-cols-4 gap-2">
                  {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => handleHourSelect(hour)}
                      className={`flex items-center justify-center px-3 py-2 border ${
                        availableHours.includes(hour)
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
                      } rounded-md`}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {hour}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Save Profile
            </button>
          </form>
        </div>
      </main>
     <Footer />
    </div>
  )
}