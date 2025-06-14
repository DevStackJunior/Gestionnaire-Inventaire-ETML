'use client'

import { useState, useEffect, useMemo } from 'react'
import ResearchBar from '@/app/components/Researchbar'

type User = {
  user_id: number
  Name: string
  Type: string
  surname: string
}

const ALL_FIELDS = ['user_id', 'Name', 'Type', 'surname'] as const
const PAGE_SIZE = 20

export default function UpdateUserForm() {
  const [user, setUser] = useState({
    user_id: '',
    Name: '',
    Type: '',
    surname: '',
  })

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'user_id',
    'Name',
    'Type',
    'surname',
  ])

  const [filters, setFilters] = useState<Record<string, string>>({})

  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...user,
      user_id: Number(user.user_id),
    }
    const res = await fetch('/api/mysql/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    console.log('Update response:', data)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/mysql/get')
        if (!response.ok) throw new Error('Failed to fetch user data')
        const data: User[] = await response.json()
        setUsers(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      selectedFields.every((field) => {
        const filterValue = filters[field]?.toLowerCase() || ''
        if (!filterValue) return true
        const userFieldValue = String(user[field as keyof User]).toLowerCase()
        return userFieldValue.includes(filterValue)
      })
    )
  }, [users, filters, selectedFields])

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const currentUsers = filteredUsers.slice(startIndex, startIndex + PAGE_SIZE)

  const goPrevious = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, selectedFields])

  if (loading) return <div className="text-center p-6">Loading...</div>
  if (error)
    return <div className="text-center p-6 text-red-600">Error: {error}</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <input
          name="user_id"
          placeholder="User ID"
          value={user.user_id}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          required
        />
        <input
          name="Name"
          placeholder="Name"
          value={user.Name}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="Type"
          placeholder="Type"
          value={user.Type}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="surname"
          placeholder="Surname"
          value={user.surname}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-700 transition"
        >
          Update User
        </button>
      </form>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Select fields to display:
        </h2>
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
          User Data (Page {currentPage} / {totalPages})
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
            {currentUsers.length > 0 ? (
              currentUsers.map((u) => (
                <tr
                  key={u.user_id}
                  className="hover:bg-blue-50 transition-colors cursor-default"
                >
                  {selectedFields.map((field) => (
                    <td
                      key={field}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {u[field as keyof User]}
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
                  No users to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <div className="mt-6 flex justify-center items-center gap-6">
        <button
          onClick={goPrevious}
          disabled={currentPage === 1}
          className="rounded border border-blue-500 px-4 py-2 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition"
          aria-label="Previous page"
        >
          ← Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="rounded border border-blue-500 px-4 py-2 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
