// Error handling utilities

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof APIError) {
    return { message: error.message, statusCode: error.statusCode }
  }

  if (error instanceof Error) {
    return { message: error.message, statusCode: 500 }
  }

  return { message: 'Unknown error occurred', statusCode: 500 }
}

export const ErrorMessages = {
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  FILE_TOO_LARGE: 'File is too large',
  INVALID_FILE_TYPE: 'Invalid file type',
  API_ERROR: 'External API error',
}
