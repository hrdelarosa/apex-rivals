export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
}

export function isHexColor(color: string | null | undefined): boolean {
  return (
    typeof color === 'string' &&
    /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color)
  )
}

export function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
