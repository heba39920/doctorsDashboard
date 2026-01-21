import { useState } from "react"
import { DoctorDetailsModal } from "../components/DoctorsComponents/DoctorDetailsModal"
import type { Doctor } from "../interfaces/interfaces"
import DoctorCard from "../components/DoctorsComponents/DoctorCard"

const dummyDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    specialization: "Cardiology",
    location: "New York, NY",
    experience: "15 years",
    joinDate: "2020-01-15",
    filesCount: 12
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael.chen@hospital.com",
    phone: "+1 (555) 234-5678",
    specialization: "Neurology",
    location: "Los Angeles, CA",
    experience: "10 years",
    joinDate: "2021-03-22",
    filesCount: 8
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@hospital.com",
    phone: "+1 (555) 345-6789",
    specialization: "Pediatrics",
    location: "Chicago, IL",
    experience: "8 years",
    joinDate: "2022-06-10",
    filesCount: 15
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    email: "james.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    specialization: "Orthopedics",
    location: "Houston, TX",
    experience: "20 years",
    joinDate: "2019-11-05",
    filesCount: 22
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@hospital.com",
    phone: "+1 (555) 567-8901",
    specialization: "Dermatology",
    location: "Phoenix, AZ",
    experience: "12 years",
    joinDate: "2020-08-18",
    filesCount: 9
  },
  {
    id: "6",
    name: "Dr. Robert Taylor",
    email: "robert.taylor@hospital.com",
    phone: "+1 (555) 678-9012",
    specialization: "Oncology",
    location: "Philadelphia, PA",
    experience: "18 years",
    joinDate: "2019-04-12",
    filesCount: 31
  }
]


const Dashboard = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDoctor(null)
  }

  return (
    <>
      <div className="min-h-screen bg-[var(--surface)] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[var(--textPrimary)] mb-2">
              Doctors Dashboard
            </h1>
            <p className="text-[var(--textSecondary)]">
              Manage and view all registered doctors
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--accent)]">
                <span className="text-sm text-[var(--textSecondary)]">Total Doctors:</span>
                <span className="ml-2 text-lg font-bold text-[var(--primary)]">
                  {dummyDoctors.length}
                </span>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--accent)]">
                <span className="text-sm text-[var(--textSecondary)]">Total Files:</span>
                <span className="ml-2 text-lg font-bold text-[var(--primary)]">
                  {dummyDoctors.reduce((sum, doc) => sum + doc.filesCount, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      </div>

      <DoctorDetailsModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Dashboard
