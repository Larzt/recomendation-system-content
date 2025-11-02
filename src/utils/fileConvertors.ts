export function directoriesFilesToIFile(file: File): Promise<IFile> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve({
        name: file.webkitRelativePath ?? file.name,
        content: e.target?.result as string
      })
    }
    reader.readAsText(file)
  })
}

export function fileToIFile(file: File): Promise<IFile> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve({
        name: file.name,
        content: e.target?.result as string
      })
    }
    reader.readAsText(file)
  })
}


function parseJsonContent(content: string): Record<string, string> | null {
  try {
    const parsed = JSON.parse(content)
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as Record<string, string>
    }
  } catch {
    // No es JSON válido
  }
  return null
}

function parseTextLines(content: string): Record<string, string> {
  const record: Record<string, string> = {}
  const lines = content.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const separator = trimmed.includes(':') ? ':' : ','
    const [key, value] = trimmed.split(separator).map(s => s?.trim())

    if (key && value) record[key] = value
  }

  return record
}

function parseStringArray(content: string[]): Record<string, string> {
  const record: Record<string, string> = {}
  for (const line of content) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const separator = trimmed.includes(':') ? ':' : ','
    const [key, value] = trimmed.split(separator).map(s => s?.trim())

    if (key && value) record[key] = value
  }
  return record
}

export function parseIFileToRecord(file: IFile): Record<string, string> {
  const { content } = file

  if (typeof content === 'string') {
    const jsonResult = parseJsonContent(content)
    if (jsonResult) return jsonResult

    return parseTextLines(content)
  }

  if (Array.isArray(content)) {
    return parseStringArray(content)
  }

  return {}
}
