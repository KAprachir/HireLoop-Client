'use server'

import { ServerMutation } from '../core/server'

export const createCompany = async newCompanyData => {
  return ServerMutation('/api/companies', newCompanyData)
}

export const updateCompany = async (id, data) => {
  return ServerMutation(`/api/companies/${id}`, data, 'PATCH')
}
