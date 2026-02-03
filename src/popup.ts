
import { convert, convertHandWrite } from "./hash"

let passwordInput = document.getElementById("passwordInput") as HTMLInputElement
let enterButton = document.getElementById("enter") as HTMLButtonElement
let phidden = document.getElementById("phidden") as HTMLDivElement
let show = document.getElementById("show") as HTMLInputElement
let tips = document.getElementById("tips") as HTMLDivElement
let autoCopyCheckBox = document.getElementById("auto_copy") as HTMLInputElement

let upper = document.getElementById("upper") as HTMLInputElement
let lower = document.getElementById("lower") as HTMLInputElement
let number = document.getElementById("number") as HTMLInputElement
let lenInput = document.getElementById("len") as HTMLInputElement

let custom_mode = document.getElementById("custom_mode") as HTMLInputElement
let hand_mode = document.getElementById("hand_mode") as HTMLInputElement
let digit_mode = document.getElementById("digit_mode") as HTMLInputElement

function getOptions(){
  let hasUpper = upper.checked
  let hasLower = lower.checked
  let hasNumber = number.checked
  let len = parseInt(lenInput.value, 10);
  return {hasUpper, hasLower, hasNumber, len}
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
  if(custom_mode.checked){
    return await convert(text, getOptions())
  } else if(hand_mode.checked){
    return await convertHandWrite(text)
  } else {
    let options = {hasUpper: false, hasLower: false, hasNumber: true, len: 6}
    return await convert(text, options)
  }
}

async function enter(text: string){
  let password = await convert1(text)

  showPHidden(text, password)
  show.onchange = (e) => { showPHidden(text, password) }

  if(autoCopyCheckBox.checked){
    await window.navigator.clipboard.writeText(password)
    tips.textContent = "write to clipboard success"
  }
}

enterButton.onclick = () => {
  enter(passwordInput.value)
}

passwordInput.onkeyup = (e) => {
  if(e.key === "Enter"){
    enter(passwordInput.value)
  } else {
    tips.textContent = ""
  }
}

passwordInput.focus()
