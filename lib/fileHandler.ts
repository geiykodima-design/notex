import { APP_CONFIG } from './config'

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > APP_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${APP_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    }
  }

  // Check file type
  if (!APP_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not supported. Only PDF, DOCX, and TXT files are allowed.',
    }
  }

  return { valid: true }
}

export async function parseFileContent(file: File): Promise<string> {
  if (file.type === 'text/plain') {
    return await file.text()
  }

  if (file.type === 'application/pdf') {
    // Placeholder - would use pdf-parse in production
    return `[PDF: ${file.name}] - Full PDF parsing will be implemented with pdf-parse library`
  }

  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // Placeholder - would use mammoth in production
    return `[DOCX: ${file.name}] - Full DOCX parsing will be implemented with mammoth.js library`
  }

  throw new Error('Unsupported file type')
}
