'use server'

import { ServerMutation } from '../core/server'

export const createCompany = async newCompanyData => {
  return ServerMutation('/api/companies', newCompanyData)
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// export const createCompany = async data => {
//   const res = await fetch(`${baseUrl}/api/companies`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })

//   return res.json()
// }
