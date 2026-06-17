import { ServerMutation } from '../core/server'

/**
 * Sends an authenticated PATCH request to update a user's role or status.
 * @param {string} id - The MongoDB user document ObjectId string.
 * @param {Object} data - The payload fields to update (e.g., { role: 'recruiter', status: 'Suspended' }).
 */
export const updateUser = async (id, data) => {
  try {
    return await ServerMutation(`/api/users/${id}`, data, 'PATCH')
  } catch (error) {
    console.error(`Failed to update user profile matrix for ID ${id}:`, error)
    throw error // Propagates the error up to the UI component's catch block for toast notifications
  }
}
