// Client-side validation shared by the local (non-network) form rebuilds.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const isEmail = (v) => EMAIL_RE.test(String(v).trim())
