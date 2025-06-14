import React from 'react'

type Hardware = {
  hardware_id: string
  name: string
  price: number
  brand: string
  manufacturer_number: number
  year_of_purchase: Date | string
}

const ALL_FIELDS = ['hardware_id', 'name', 'price', 'brand', 'manufacturer_number', 'year_of_purchase',] as const

interface HardwareModalProps {
  hardware: Hardware
  onClose: () => void
}

export default function ScanHardwareModal({ hardware, onClose }: HardwareModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">Détails Hardware #{hardware.hardware_id}</h3>
        <ul className="space-y-2">
          {ALL_FIELDS.map((field) => (
            <li key={field}>
              <strong className="capitalize">{field}:</strong> {String(hardware[field])}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
