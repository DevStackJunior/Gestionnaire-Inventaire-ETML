'use client'

import { useState, useEffect, useMemo } from 'react'
import ResearchBar from '@/app/components/Researchbar'
import ScanHardwareModal from '@/app/components/ScanHardwareModal'
import ScanAgainWarningModal from '@/app/components/ScanHardwareFailure'
import AddHardwareModal from '@/app/components/AddHardwareModal'
import ShowNotFoundModal from '@/app/components/ShowNotFoundModal'
import Pagination from '@/app/components/pagination'


type Hardware = {
  hardware_id: string //QR CODE
  name: string
  price: number
  brand: string
  manufacturer_number: number
  year_of_purchase: string // Date format simplifié en string
}

const ALL_FIELDS = [
  'hardware_id', //QR CODE
  'name',
  'price',
  'brand',
  'manufacturer_number',
  'year_of_purchase',
] as const

type HardwareField = typeof ALL_FIELDS[number]

const PAGE_SIZE = 20

export default function UpdateHardwaresForm() {
  const [hardware, setHardware] = useState({
    hardware_id: '', //QR CODE
    name: '',
    price: '',
    brand: '',
    manufacturer_number: '',
    year_of_purchase: '',
  })

  const [hardwares, setHardwares] = useState<Hardware[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFields, setSelectedFields] = useState<HardwareField[]>([...ALL_FIELDS])

  const [selectedHardware, setSelectedHardware] = useState<Hardware | null>(null)
  const [lastScanData, setLastScanData] = useState<string>('')
  const [lastScanAttempts, setLastScanAttempts] = useState<string[]>([])
  
  // Modal States | Error Management Appearing 
  const [showAddModal, setShowAddModal] = useState(false)
  const [showNotFoundModal, setShowNotFoundModal] = useState(false)
  const [showScanWarningModal, setShowScanWarningModal] = useState(false)
  
  const [filters, setFilters] = useState<Record<string, string>>({})

  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHardware({ ...hardware, [e.target.name]: e.target.value })
  }

  const toggleField = (field: HardwareField) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    )
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...hardware,
      user_id: Number(hardware.hardware_id),
    }
    try {
      const res = await fetch('/api/secure-proxy/put', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      console.log('Update response:', data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    const fetchHardwareData = async () => {
      try {
        const response = await fetch('/api/secure-proxy/get')
        if (!response.ok)
          throw new Error(
            'Failed to fetch hardware data | READ (CRUD Request) Unavailable'
          )
        const json = await response.json()

        if (json.status !== 'success' || !Array.isArray(json.data)) {
          throw new Error('Erreur API: données invalides')
        }

        // Convertir year_of_purchase en string ISO (YYYY-MM-DD)
        const formattedData = json.data.map((h: any) => ({
          ...h,
          year_of_purchase: h.year_of_purchase
            ? new Date(h.year_of_purchase).toISOString().slice(0, 10)
            : '',
        }))

        setHardwares(formattedData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHardwareData()
  }, [])

  const filteredHardwares = useMemo(() => {
    return hardwares.filter((hardware) =>
      selectedFields.every((field) => {
        const filterValue = filters[field]?.toLowerCase() || ''
        if (!filterValue) return true
        const hardwareFieldValue = String(hardware[field] ?? '').toLowerCase()
        return hardwareFieldValue.includes(filterValue)
      })
    )
  }, [hardwares, filters, selectedFields])

  const totalPages = Math.ceil(filteredHardwares.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const currentHardwares = filteredHardwares.slice(startIndex, startIndex + PAGE_SIZE)

  const goPrevious = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, selectedFields])

  if (loading)
    return <div className="text-center p-6">Loading...</div>
  if (error)
    return (
      <div className="text-center p-6 text-red-600">
        Error: {error}
      </div>
    )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <input
          name="hardware_id"
          placeholder="hardwareID"
          value={hardware.hardware_id}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          required
        />
        <input
          name="name"
          placeholder="Name"
          value={hardware.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="brand"
          placeholder="Brand"
          value={hardware.brand}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="manufacturer_number"
          placeholder="Manufacturer Number"
          value={hardware.manufacturer_number}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-700 transition"
        >
          Update Hardware
        </button>
      </form>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Select fields to display:</h2>
        <div className="flex flex-wrap gap-6">
          {ALL_FIELDS.map((field) => (
            <label
              key={field}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => toggleField(field)}
                className="h-5 w-5 accent-blue-600"
              />
              <span className="capitalize">{field}</span>
            </label>
          ))}
        </div>
      </div>

      <section className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">
          hardwareData (Page {currentPage} / {totalPages})
        </h2>
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10">
            <tr>
              {selectedFields.map((field) => (
                <th
                  key={field}
                  className="border border-gray-300 px-4 py-2 text-left text-blue-900 font-semibold select-none"
                >
                  {field}
                </th>
              ))}
            </tr>
            <ResearchBar
              selectedFields={selectedFields}
              filters={filters}
              setFilters={setFilters}
            />
          </thead>
          <tbody>
            {currentHardwares.length > 0 ? (
              currentHardwares.map((h) => (
                <tr
                  key={h.hardware_id}
                  className="hover:bg-blue-50 transition-colors cursor-default"
                >
                  {selectedFields.map((field) => (
                    <td
                      key={field}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {String(h[field] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={selectedFields.length}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No hardwares to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {selectedHardware && (
        <ScanHardwareModal
          hardware={selectedHardware}
          onClose={() => setSelectedHardware(null)}
        />
      )}

      {showScanWarningModal && (
        <ScanAgainWarningModal onClose={() => setShowScanWarningModal(false)} />
      )}
      
      {/*Hardware not found*/}
      {showNotFoundModal && (
        <ShowNotFoundModal
          onConfirm={() => {
            setShowNotFoundModal(false)
            setShowAddModal(true)
          }}
          onCancel={() => setShowNotFoundModal(false)}
        />
      )}
      {showAddModal && (
        <AddHardwareModal
          scanData={lastScanData}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}
