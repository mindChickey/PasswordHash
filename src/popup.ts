
import { convert } from "./hash"

let pass = document.getElementById("passwordInput") as HTMLInputElement
let button = document.getElementById("enter") as HTMLButtonElement
let phidden = document.getElementById("phidden") as HTMLDivElement
let show = document.getElementById("show") as HTMLInputElement
let tips = document.getElementById("tips") as HTMLDivElement
let clear = document.getElementById("clear") as HTMLButtonElement

let upper = document.getElementById("upper") as HTMLInputElement
let lower = document.getElementById("lower") as HTMLInputElement
let symbol = document.getElementById("symbol") as HTMLInputElement
let number = document.getElementById("number") as HTMLInputElement
let lenSelect = document.getElementById("len") as HTMLSelectElement

function makeLenOption(){
  for (let i = 4; i <= 20; i++) {
    const option = document.createElement("option")
    option.value = i.toString()
    option.textContent = i.toString()
    lenSelect.appendChild(option)
  }
  lenSelect.value = "16"

  lenSelect.onchange = () => {
    parseInt(lenSelect.value, 10);
  }
}

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

async function writeClipboard(text: string){
  let password = await convert(text, getOptions())
  await window.navigator.clipboard.writeText(password)

  showPHidden(text, password)
  show.onchange = (e) => { showPHidden(text, password) }

  tips.textContent = "copy success, please paste within 30 seconds"

  if(chrome.runtime){
    chrome.runtime.sendMessage({ kind: "clear" }, () => {});
  } else {
    clear.hidden = false
  }
}

button.onclick = () => {
  writeClipboard(pass.value)
}

pass.onkeyup = (e) => {
  if(e.key === "Enter"){
    writeClipboard(pass.value)
  } else {
    tips.textContent = ""
  }
}

clear.onclick = async () => {
  await window.navigator.clipboard.writeText("")
  tips.textContent = "clear success"
}

makeLenOption()
pass.focus()
