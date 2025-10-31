export function toIFile(file: File): Promise<IFile> {
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
