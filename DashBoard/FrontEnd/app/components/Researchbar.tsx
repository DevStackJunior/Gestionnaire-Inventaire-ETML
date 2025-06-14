'use client'

import React, { useState } from 'react'

type ResearchBarProps = {
  selectedFields: string[]
  filters: Record<string, string>
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export default function ResearchBar({
  selectedFields,
  filters,
  setFilters,
}: ResearchBarProps) {
  // On stocke quel champ est ouvert (index) ou null si aucun
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleActive = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <tr className="bg-blue-50 sticky top-[38px] z-10 select-none">
      {selectedFields.map((field, idx) => (
        <th key={field} className="border border-gray-300 px-2 py-1 relative">
          {/* Icône cliquable */}
          <button
            aria-label={`Toggle search for ${field}`}
            onClick={() => toggleActive(idx)}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1 hover:text-blue-600 transition-colors"
            type="button"
          >
            {/* Simple icône loupe SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>

          {/* Champ input animé */}
          <input
            type="text"
            value={filters[field] || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
            placeholder={`Search ${field}`}
            className={`pl-6 w-full text-xs px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400
              transition-all duration-300 ease-in-out
              ${
                activeIndex === idx
                  ? 'opacity-100 max-h-10 visible'
                  : 'opacity-0 max-h-0 invisible pointer-events-none'
              }
            `}
          />
        </th>
      ))}
    </tr>
  )
}
