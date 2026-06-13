'use server'

import { ServerMutation } from '../core/server'

export const submitApplication = async applicationData => {
  return ServerMutation('/api/applications', applicationData)
}
