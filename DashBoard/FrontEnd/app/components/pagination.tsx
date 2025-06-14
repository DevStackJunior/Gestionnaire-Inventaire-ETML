type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center items-center gap-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded border border-blue-500 px-4 py-2 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition"
        aria-label="Previous page"
      >
        ← Précédent
      </button>
      <span className="text-gray-700 font-medium">
        Page {currentPage} sur {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded border border-blue-500 px-4 py-2 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition"
        aria-label="Next page"
      >
        Suivant →
      </button>
    </div>
  )
}
