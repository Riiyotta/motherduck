// Greedy word wrap for SVG <text> (approximate: monospace-ish char budget per line).
export function wrap(str, maxChars, maxLines = 3) {
  const words = String(str || '').split(/\s+/).filter(Boolean)
  const lines = []
  let cur = ''
  for (const w of words) {
    if (!cur) cur = w
    else if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w
    else {
      lines.push(cur)
      cur = w
    }
  }
  if (cur) lines.push(cur)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\W*\w*$/, '') + '…'
    return kept
  }
  return lines
}
export const titleFromLabel = (label) => String(label || '').replace(/^[^:]*:\s*/, '')
