

export default function ScanAgainWarningModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 text-yellow-700">Scan non reconnu</h3>
        <p className="mb-6">Veuillez réessayer. Il est possible que le scan n’ait pas été effectué correctement.</p>
        <button
          onClick={onClose}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
