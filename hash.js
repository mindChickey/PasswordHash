
async function deriveKey(password, salt, iterations, keyLength) {
  let enc = new TextEncoder()
  let passwordBuffer = enc.encode(password)
  let saltBuffer = enc.encode(salt)

  let importedKey = await crypto.subtle.importKey(
      'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])

  let derivedKeyBuffer = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBuffer, iterations: iterations, hash: 'SHA-256' },
      importedKey, keyLength)

  return new Uint8Array(derivedKeyBuffer)
}

function getRegString(options){
  let regexString = '[^'
  if (options.hasUpper) regexString += 'A-Z'
  if (options.hasLower) regexString += 'a-z'
  if (options.hasNumber) regexString += '0-9'
  regexString += ']';
  return regexString
}

function getBase64Len(options){
  let sum = Number(options.hasUpper) + Number(options.hasLower) +
            Number(options.hasNumber) + Number(options.hasSymbol)
  return options.len - sum
}

function fixBase64(arr, options){
  let str0 = btoa(String.fromCharCode.apply(null, arr))
  let str1 = str0.replace(new RegExp(getRegString(options), 'g'), '')
  if(str1.length === 0){
    alert("empty")
    throw "empty"
  } else {
    let len = getBase64Len(options)
    let repeatCount = Math.ceil(len / str1.length)
    return str1.repeat(repeatCount).slice(0, len)
  }
}

function insert(str, index, value) {
  let index1 = index % (str.length + 1)
  return str.substr(0, index1) + value + str.substr(index1);
}

function insertChar(str, arr, options) {
  if (options.hasUpper) {
    let A = String.fromCharCode("A".charCodeAt(0) + arr[28] % 26)
    str = insert(str, arr[28], A)
  }
  if (options.hasLower) {
    let a = String.fromCharCode("a".charCodeAt(0) + arr[29] % 26)
    str = insert(str, arr[29], a)
  }
  if (options.hasNumber) {
    let num = String.fromCharCode("0".charCodeAt(0) + arr[30] % 10)
    str = insert(str, arr[30], num)
  }
  if (options.hasSymbol) {
    let sym = arr[31] % 2 ? '_' : '='
    str = str + sym
  }
  return str
}

export async function convert(text, options) {
  let arr = await deriveKey(text, "PasswordHash", 1000000, 256)
  let str = fixBase64(arr, options)
  return insertChar(str, arr, options)
}

/*
async function main(){
  let options = {hasUpper: true, hasLower: true, hasSymbol: true, hasNumber: true, len: 16}
  for(let i = 0; i < 100; i++){
    console.log(await convert("text" + i, options))
  }
}
main()

async function testOptions(){
  console.log(await convert("testOptions", {hasUpper: true, hasLower: true, hasSymbol: true, hasNumber: true, len: 16}))
  console.log(await convert("testOptions", {hasUpper: false, hasLower: true, hasSymbol: true, hasNumber: true, len: 16}))
  console.log(await convert("testOptions", {hasUpper: true, hasLower: false, hasSymbol: true, hasNumber: true, len: 16}))
  console.log(await convert("testOptions", {hasUpper: true, hasLower: true, hasSymbol: false, hasNumber: true, len: 16}))
  console.log(await convert("testOptions", {hasUpper: true, hasLower: true, hasSymbol: true, hasNumber: false, len: 16}))
  console.log(await convert("testOptions", {hasUpper: true, hasLower: true, hasSymbol: true, hasNumber: true, len: 8}))
  console.log(await convert("testOptions", {hasUpper: false, hasLower: false, hasSymbol: false, hasNumber: true, len: 6}))
}

testOptions()
*/