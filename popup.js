
let {convert} = require('./hash')

let pass = document.getElementById("passwordInput")
let button = document.getElementById("enter")
let phidden = document.getElementById("phidden")
let tips = document.getElementById("tips")
let clear = document.getElementById("clear")

let upper = document.getElementById("upper")
let lower = document.getElementById("lower")
let symbol = document.getElementById("symbol")
let number = document.getElementById("number")
let passLen = document.getElementById("len")

function getOptions(){
  let hasUpper = upper.checked
  let hasLower = lower.checked
  let hasSymbol = symbol.checked
  let hasNumber = number.checked
  let len = passLen.value
  return {hasUpper, hasLower, hasSymbol, hasNumber, len}
}

function getPHidden(password) {
  let last = Array.from(password.slice(1)).map((c) => '*').join('')
  return password[0] + last
}

async function writeClipboard(text){
  let password = await convert(text, getOptions())
  await window.navigator.clipboard.writeText(password)

  phidden.textContent = getPHidden(password)
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

pass.focus()
