 
export type CustomOptionT = {
  hasUpper: boolean
  hasLower: boolean
  hasNumber: boolean
}

let UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"
let NUMBER_CHARS = "0123456789"                   

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

function encodePrefix(arrs: Uint8Array<ArrayBuffer>[], options: CustomOptionT) {
  let char0 = options.hasUpper ? convertCharSet(arrs[0], UPPERCASE_CHARS) : ""
  let char1 = options.hasLower ? convertCharSet(arrs[1], LOWERCASE_CHARS) : ""
  let char2 = options.hasNumber ? convertCharSet(arrs[2], NUMBER_CHARS) : ""
  return char0 + char1 + char2
}

function encodeMain(arr: Uint8Array<ArrayBuffer>, options: CustomOptionT) {
  let chars0 = options.hasUpper ? UPPERCASE_CHARS : ""
  let chars1 = options.hasLower ? LOWERCASE_CHARS : ""
  let chars2 = options.hasNumber ? NUMBER_CHARS : ""
  let chars = chars0 + chars1 + chars2
  return convertCharSet(arr, chars)
}

export function encode(key: Uint8Array<ArrayBuffer>, len: number, options: CustomOptionT) {
  let arrs = splitArray(key, [1, 1, 1])
  let prefix = encodePrefix(arrs, options)

  let str = encodeMain(key.subarray(0, len), options)
  if(len <= prefix.length){
    return str
  } else {
    let str1 = str.substring(prefix.length)
    return prefix + str1
  }
}

export function encodeHandWrite(key: Uint8Array<ArrayBuffer>, len: number){
  let letterLen = Math.ceil(len / 3)
  let digitLen = len - 2 * letterLen
  let arrs = splitArray(key, [letterLen, letterLen, digitLen])

  let upper_chars = UPPERCASE_CHARS.replace(/[OI]/g, '')
  let lower_chars = LOWERCASE_CHARS.replace(/[ol]/g, '')
  let number_chars = NUMBER_CHARS.replace(/[01]/g, '')
  let uppers = convertCharSet(arrs[0], upper_chars)
  let lowers = convertCharSet(arrs[1], lower_chars)
  let digits = convertCharSet(arrs[2], number_chars)

  return uppers + lowers + digits
}

export function encodeHex(key: Uint8Array<ArrayBuffer>, len: number){
  let hexOctets: string[] = []
  let lengthToProcess = len / 2
  for (let i = 0; i < lengthToProcess; i++) {
    hexOctets.push(key[i].toString(16).padStart(2, '0'))
  }
  return hexOctets.join('').slice(0, len)
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