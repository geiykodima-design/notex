import { jsPDF } from 'jspdf'

export interface ExportOptions {
  format: 'pdf' | 'markdown' | 'txt'
  includeMetadata: boolean
}

export async function exportSummary(content: string, title: string, options: ExportOptions) {
  switch (options.format) {
    case 'pdf':
      return exportToPDF(content, title, options.includeMetadata)
    case 'markdown':
      return exportToMarkdown(content, title, options.includeMetadata)
    case 'txt':
      return exportToText(content, title, options.includeMetadata)
    default:
      throw new Error('Unsupported export format')
  }
}

function exportToPDF(content: string, title: string, includeMetadata: boolean): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin

  let yPosition = margin

  // Title
  doc.setFontSize(18)
  doc.setFont(undefined, 'bold')
  const titleLines = doc.splitTextToSize(title, contentWidth)
  titleLines.forEach((line: string) => {
    doc.text(line, margin, yPosition)
    yPosition += 10
  })

  yPosition += 5

  // Metadata
  if (includeMetadata) {
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.setTextColor(128, 128, 128)
    doc.text(`Generated on ${new Date().toLocaleString('uk-UA')}`, margin, yPosition)
    yPosition += 10
  }

  yPosition += 5
  doc.setTextColor(0, 0, 0)

  // Content
  doc.setFontSize(12)
  doc.setFont(undefined, 'normal')
  const contentLines = doc.splitTextToSize(content, contentWidth)

  contentLines.forEach((line: string) => {
    if (yPosition > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`)
}

function exportToMarkdown(content: string, title: string, includeMetadata: boolean): void {
  let markdown = `# ${title}\n\n`

  if (includeMetadata) {
    markdown += `> Generated on ${new Date().toLocaleString('uk-UA')}\n\n`
  }

  markdown += content

  downloadFile(markdown, `${title.replace(/\s+/g, '_')}.md`, 'text/markdown')
}

function exportToText(content: string, title: string, includeMetadata: boolean): void {
  let text = `${title}\n${"=".repeat(title.length)}\n\n`

  if (includeMetadata) {
    text += `Generated on ${new Date().toLocaleString('uk-UA')}\n\n`
  }

  text += content

  downloadFile(text, `${title.replace(/\s+/g, '_')}.txt`, 'text/plain')
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function exportFlashcards(flashcards: any[], title: string): Promise<void> {
  const json = {
    title,
    generatedAt: new Date().toISOString(),
    cards: flashcards.map((card) => ({
      question: card.question,
      answer: card.answer,
    })),
  }

  downloadFile(JSON.stringify(json, null, 2), `${title}_flashcards.json`, 'application/json')
}
