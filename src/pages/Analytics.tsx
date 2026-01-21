import { BarChart3, Users, FileText, TrendingUp, Award, MapPin, Calendar } from "lucide-react"
import type { Doctor } from "../interfaces/interfaces"

// Using the same dummy data structure for analytics
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

const Analytics = () => {
  // Calculate statistics
  const totalDoctors = dummyDoctors.length
  const totalFiles = dummyDoctors.reduce((sum, doc) => sum + doc.filesCount, 0)
  const avgFilesPerDoctor = Math.round(totalFiles / totalDoctors)
  
  // Group by specialization
  const specializationCount: Record<string, number> = {}
  dummyDoctors.forEach(doc => {
    specializationCount[doc.specialization] = (specializationCount[doc.specialization] || 0) + 1
  })
  
  // Group by location
  const locationCount: Record<string, number> = {}
  dummyDoctors.forEach(doc => {
    locationCount[doc.location] = (locationCount[doc.location] || 0) + 1
  })
  
  // Calculate experience distribution
  const experienceGroups = {
    "0-10 years": dummyDoctors.filter(d => parseInt(d.experience) <= 10).length,
    "11-15 years": dummyDoctors.filter(d => parseInt(d.experience) > 10 && parseInt(d.experience) <= 15).length,
    "16+ years": dummyDoctors.filter(d => parseInt(d.experience) > 15).length,
  }
  
  // Get top doctors by files
  const topDoctorsByFiles = [...dummyDoctors]
    .sort((a, b) => b.filesCount - a.filesCount)
    .slice(0, 5)
  
  // Calculate max files for bar chart scaling
  const maxFiles = Math.max(...dummyDoctors.map(d => d.filesCount))

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-[var(--textPrimary)]">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-[var(--textSecondary)]">
            Comprehensive insights and statistics about your doctors
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Users className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">Total Doctors</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{totalDoctors}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <FileText className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">Total Files</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{totalFiles}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <FileText className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">Avg Files/Doctor</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{avgFilesPerDoctor}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Award className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">Specializations</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">
              {Object.keys(specializationCount).length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Files Distribution Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6">
              Files Distribution by Doctor
            </h2>
            <div className="space-y-4">
              {topDoctorsByFiles.map((doctor) => (
                <div key={doctor.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--textPrimary)] truncate flex-1">
                      {doctor.name}
                    </span>
                    <span className="text-[var(--textSecondary)] ml-2">
                      {doctor.filesCount} files
                    </span>
                  </div>
                  <div className="w-full bg-[var(--surface)] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[var(--primary)] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(doctor.filesCount / maxFiles) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialization Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--primary)]" />
              Specialization Distribution
            </h2>
            <div className="space-y-4">
              {Object.entries(specializationCount)
                .sort(([, a], [, b]) => b - a)
                .map(([specialization, count]) => (
                  <div key={specialization} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                    <span className="font-medium text-[var(--textPrimary)]">
                      {specialization}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-[var(--accent)] rounded-full h-2">
                        <div
                          className="bg-[var(--primary)] h-2 rounded-full"
                          style={{ width: `${(count / totalDoctors) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[var(--primary)] w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Experience Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--primary)]" />
              Experience Distribution
            </h2>
            <div className="space-y-4">
              {Object.entries(experienceGroups).map(([group, count]) => (
                <div key={group} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--textPrimary)]">{group}</span>
                    <span className="text-[var(--textSecondary)]">{count} doctors</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] rounded-full h-3">
                    <div
                      className="bg-[var(--secondary)] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(count / totalDoctors) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
              Location Distribution
            </h2>
            <div className="space-y-3">
              {Object.entries(locationCount)
                .sort(([, a], [, b]) => b - a)
                .map(([location, count]) => (
                  <div
                    key={location}
                    className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg hover:bg-[var(--accent)] transition-colors"
                  >
                    <span className="font-medium text-[var(--textPrimary)]">{location}</span>
                    <span className="px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm font-semibold">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
          <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6">
            Top Performers (by Files)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--accent)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    Doctor Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    Specialization
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    Location
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    Files
                  </th>
                </tr>
              </thead>
              <tbody>
                {topDoctorsByFiles.map((doctor, index) => (
                  <tr
                    key={doctor.id}
                    className="border-b border-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--primary)] font-bold text-sm">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-[var(--textPrimary)]">
                      {doctor.name}
                    </td>
                    <td className="py-3 px-4 text-[var(--textSecondary)]">
                      {doctor.specialization}
                    </td>
                    <td className="py-3 px-4 text-[var(--textSecondary)]">
                      {doctor.location}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm font-semibold">
                        <FileText className="w-4 h-4" />
                        {doctor.filesCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
