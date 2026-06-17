import { headers } from 'next/headers'
import { auth } from '../auth'

/**
 * Recovers a paginated list of accounts utilizing Better Auth's core Admin plugin hooks.
 * This helper must be executed within a Next.js Server Environment.
 */
export const getUser = async (options = {}) => {
  try {
    const { limit = 20, offset = 0, search = '' } = options

    // Better Auth internal handlers check incoming session headers
    // to guarantee that the requesting identity has an 'admin' role.
    const response = await auth.api.listUsers({
      query: {
        limit: limit.toString(), // API expects query parameters formatted as strings
        offset: offset.toString(), //
        sortBy: 'createdAt', //
        sortDirection: 'desc', // Returns newest signups first
        searchValue: search || undefined // Optional filter string
      },
      headers: await headers() // Injects required secure session cookies seamlessly
    })

    // Better Auth returns an object containing { users: User[], total: number }
    if (response && response.users) {
      return response.users
    }

    return []
  } catch (error) {
    console.error('Better Auth admin user retrieval pipeline failed:', error)
    return []
  }
}
