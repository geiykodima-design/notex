import { type NextApiRequest, type NextApiResponse } from 'next'
import { APIError, ErrorMessages } from './errors'

export async function validateAuth(req: NextApiRequest): Promise<string> {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new APIError(401, ErrorMessages.UNAUTHORIZED)
  }

  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    throw new APIError(401, ErrorMessages.UNAUTHORIZED)
  }

  return token
}

export function validateRequestMethod(req: NextApiRequest, allowedMethods: string[]): void {
  if (!req.method || !allowedMethods.includes(req.method)) {
    throw new APIError(405, `Method ${req.method} not allowed`)
  }
}

export function validateRequestBody<T>(body: unknown, requiredFields: (keyof T)[]): T {
  if (!body || typeof body !== 'object') {
    throw new APIError(400, ErrorMessages.BAD_REQUEST)
  }

  for (const field of requiredFields) {
    if (!(field in body)) {
      throw new APIError(400, `Missing required field: ${String(field)}`)
    }
  }

  return body as T
}
