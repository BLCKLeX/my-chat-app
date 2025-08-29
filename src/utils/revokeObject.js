export const cleanupFiles = (files = []) => {
  files.forEach((file) => {
    if (file?.url) {
      try {
        URL.revokeObjectURL(file.url)
      } catch {}
    }
  })
}


export const cleanupMessages = (messages =[])=> {
    messages.forEach(message => {
        cleanupFiles(message?.files)
    })
}