

async function deriveKey1(salt: string, password: string, iterations: number, keyLength: number) {
  let enc = new TextEncoder()
  let passwordBuffer = enc.encode(password)
  let saltBuffer = enc.encode(salt)

  let importedKey = await crypto.subtle.importKey(
    'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])

  let algo = { name: 'PBKDF2', salt: saltBuffer, iterations: iterations, hash: 'SHA-256' }
  let derivedKeyBuffer = await crypto.subtle.deriveBits(algo, importedKey, keyLength)
  return new Uint8Array(derivedKeyBuffer)
}

export async function deriveKey(domain: string, text: string, len: number) {
  let salt = `${domain}:${len}`
  return await deriveKey1(salt, text, 1000000, 256)
}