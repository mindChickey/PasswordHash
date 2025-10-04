
import { convert, convertHandWrite } from "./hash"

let pass = document.getElementById("passwordInput") as HTMLInputElement
let button = document.getElementById("enter") as HTMLButtonElement
let phidden = document.getElementById("phidden") as HTMLDivElement
let show = document.getElementById("show") as HTMLInputElement
let tips = document.getElementById("tips") as HTMLDivElement

let upper = document.getElementById("upper") as HTMLInputElement
let lower = document.getElementById("lower") as HTMLInputElement
let symbol = document.getElementById("symbol") as HTMLInputElement
let number = document.getElementById("number") as HTMLInputElement
let lenSelect = document.getElementById("len") as HTMLSelectElement

let checkbox_mode = document.getElementById("checkbox_mode") as HTMLInputElement
let hand_mode = document.getElementById("hand_mode") as HTMLInputElement
let digit_mode = document.getElementById("digit_mode") as HTMLInputElement

function getOptions(){
  let hasUpper = upper.checked
  let hasLower = lower.checked
  let hasSymbol = symbol.checked
  let hasNumber = number.checked
  let len = parseInt(lenSelect.value, 10);
  return {hasUpper, hasLower, hasSymbol, hasNumber, len}
}

function hiddenChar(str: string){
  return Array.from(str).map((c) => '*').join('')
}

function showPHidden(text: string, password: string) {
  if(show.checked){
    phidden.textContent = text + '\n' + password
  } else {
    let last = password[0] + hiddenChar(password.slice(1))
    phidden.textContent = hiddenChar(text) + '\n' + last
  }
}

async function convert1(text: string){
  if(checkbox_mode.checked){
    return await convert(text, getOptions())
  } else if(hand_mode.checked){
    return await convertHandWrite(text)
  } else {
    let options = {hasUpper: false, hasLower: false, hasSymbol: false, hasNumber: true, len: 6}
    return await convert(text, options)
  }
}

async function enter(text: string){
  let password = await convert1(text)
  await window.navigator.clipboard.writeText(password)

  showPHidden(text, password)
  show.onchange = (e) => { showPHidden(text, password) }

  tips.textContent = "write to clipboard success"
}

button.onclick = () => {
  enter(pass.value)
}

pass.onkeyup = (e) => {
  if(e.key === "Enter"){
    enter(pass.value)
  } else {
    tips.textContent = ""
  }
}

pass.focus()
