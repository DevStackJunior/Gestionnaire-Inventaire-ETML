import React from 'react'

interface HardwareNotFoundModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function ShowNotFoundModal({
  onConfirm,
  onCancel,
}: HardwareNotFoundModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">Matériel introuvable</h3>
        <p className="mb-6">Voulez-vous le saisir manuellement ?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Oui, ajouter
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
