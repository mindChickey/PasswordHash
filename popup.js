
let {convert} = require('./hash')

let pass = document.getElementById("passwordInput")
let button = document.getElementById("enter")
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

async function writeClipboard(text){
  let password = await convert(text, getOptions())
  await window.navigator.clipboard.writeText(password)

  if(chrome.runtime){
    chrome.runtime.sendMessage({ kind: "clear" }, () => {});
    tips.textContent = "copy success, please paste within 30 seconds"
  } else {
    tips.textContent = "copy success, please clear clipboard later"
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