'use client'

import React from 'react'
import { Search, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { IfilterValues } from '@/types'
import { CLIENTS } from '@/lib/constants'

type filters = Omit<IfilterValues, 'pageParam'>

export function ChatFilter() {
  const router = useRouter()

  const handleFilterChange = (filters: filters) => {
    const params = new URLSearchParams(window.location.search)

    // Update the query params with the new filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Push the updated query string to the router
    router.push(`?${params.toString()}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    handleFilterChange({
      client: formData.get('client') as string,
      role: formData.get('role') as string,
      userId: formData.get('userId') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
    })

    form.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-4 space-y-4 flex items-center justify-between"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
        <div className="space-y-2">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter user ID"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="client"
            className="block text-sm font-medium text-gray-700"
          >
            Client
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              id="client"
              name="client"
              className="pl-10 py-1 w-full rounded-md border-gray-300 bg-inherit shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select client</option>
              {CLIENTS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="client"
            className="block text-sm font-medium text-gray-700"
          >
            User Role
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              id="role"
              name="role"
              className="pl-10 py-1 w-full rounded-md border-gray-300 bg-inherit shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Role</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply
        </button>
      </div>
    </form>
  )
}
