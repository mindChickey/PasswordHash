 
type OptionsT = {
  hasUpper: boolean,
  hasLower: boolean,
  hasNumber: boolean,
  len: number
}

let UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"
let NUMBER_CHARS = "0123456789"                   

async function deriveKey(password: string, salt: string, iterations: number, keyLength: number) {
  let enc = new TextEncoder()
  let passwordBuffer = enc.encode(password)
  let saltBuffer = enc.encode(salt)

  let importedKey = await crypto.subtle.importKey(
    'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])

  let algo = { name: 'PBKDF2', salt: saltBuffer, iterations: iterations, hash: 'SHA-256' }
  let derivedKeyBuffer = await crypto.subtle.deriveBits(algo, importedKey, keyLength)
  return new Uint8Array(derivedKeyBuffer)
}

function splitArray(arr: Uint8Array<ArrayBuffer>, lens: number[]){
  let arrs = []
  let index = 0
  for(let len of lens){
    let ar = arr.slice(index, index + len)
    arrs.push(ar)
    index += len
  }
  return arrs
}

function convertCharSet(arr: Uint8Array<ArrayBuffer>, charSet: string){
  let brr = Array.from(arr)
  let crr = brr.map((b)=> charSet[b % charSet.length])
  return crr.join("")
}

function convertPrefix(arrs: Uint8Array<ArrayBuffer>[], options: OptionsT) {
  let char0 = options.hasUpper ? convertCharSet(arrs[0], UPPERCASE_CHARS) : ""
  let char1 = options.hasLower ? convertCharSet(arrs[1], LOWERCASE_CHARS) : ""
  let char2 = options.hasNumber ? convertCharSet(arrs[2], NUMBER_CHARS) : ""
  return char0 + char1 + char2
}

function convertMain(arr: Uint8Array<ArrayBuffer>, options: OptionsT) {
  let chars0 = options.hasUpper ? UPPERCASE_CHARS : ""
  let chars1 = options.hasLower ? LOWERCASE_CHARS : ""
  let chars2 = options.hasNumber ? NUMBER_CHARS : ""
  let chars = chars0 + chars1 + chars2
  return convertCharSet(arr, chars)
}

export async function convert(text: string, options: OptionsT) {
  let arr = await deriveKey(text, "PasswordHash", 1000000, 256)
  let arrs = splitArray(arr, [1, 1, 1, options.len])

  let prefix = convertPrefix(arrs, options)
  let arr1 = arrs[3].slice(0, options.len - prefix.length)
  let str = convertMain(arr1, options)
  return prefix + str
}

export async function convertHandWrite(text: string, len: number){
  let arr = await deriveKey(text, "PasswordHash", 1000000, 256)
  let letterLen = Math.ceil(len / 3)
  let digitLen = len - 2 * letterLen
  let arrs = splitArray(arr, [letterLen, letterLen, digitLen])

  let upper_chars = UPPERCASE_CHARS.replace(/[OI]/g, '')
  let lower_chars = LOWERCASE_CHARS.replace(/[ol]/g, '')
  let number_chars = NUMBER_CHARS.replace(/[01]/g, '')
  let uppers = convertCharSet(arrs[0], upper_chars)
  let lowers = convertCharSet(arrs[1], lower_chars)
  let digits = convertCharSet(arrs[2], number_chars)

  return uppers + lowers + digits
}

/*
async function main(){
  let options = {hasUpper: true, hasLower: true, hasNumber: true, len: 15}
  for(let i = 0; i < 100; i++){
    console.log(await convert("text" + i, options))
  }
}
main()

async function testOptions(){
  let text = "testOptions"
  let options = {hasUpper: true, hasLower: false, hasNumber: true, len: 15}
  let str = await convert(text, options)
  console.log(str)
}

testOptions()
*/