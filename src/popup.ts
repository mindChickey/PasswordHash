
import { convert, convertHandWrite } from "./hash"

let passwordInput = document.getElementById("passwordInput") as HTMLInputElement
let enterButton = document.getElementById("enterButton") as HTMLButtonElement
let phiddenDiv = document.getElementById("phiddenDiv") as HTMLDivElement
let showCheckBox = document.getElementById("showCheckBox") as HTMLInputElement
let tipsDiv = document.getElementById("tipsDiv") as HTMLDivElement
let autoCopyCheckBox = document.getElementById("autoCopyCheckBox") as HTMLInputElement

let upperCheckBox = document.getElementById("upperCheckBox") as HTMLInputElement
let lowerCheckBox = document.getElementById("lowerCheckBox") as HTMLInputElement
let numberCheckBox = document.getElementById("numberCheckBox") as HTMLInputElement
let lenInput = document.getElementById("lenInput") as HTMLInputElement

let modeContainer = document.getElementById("modeContainer") as HTMLDivElement
let customModeRadio = document.getElementById("customModeRadio") as HTMLInputElement
let handModeRadio = document.getElementById("handModeRadio") as HTMLInputElement
let digitModeRadio = document.getElementById("digitModeRadio") as HTMLInputElement

function getOptions(){
  let hasUpper = upperCheckBox.checked
  let hasLower = lowerCheckBox.checked
  let hasNumber = numberCheckBox.checked
  let len = parseInt(lenInput.value, 10);
  return {hasUpper, hasLower, hasNumber, len}
}

function hiddenChar(str: string){
  return Array.from(str).map((c) => '*').join('')
}

function showPHidden(text: string, password: string) {
  if(showCheckBox.checked){
    phiddenDiv.textContent = text + '\n' + password
  } else {
    let last = password[0] + hiddenChar(password.slice(1))
    phiddenDiv.textContent = hiddenChar(text) + '\n' + last
  }
}

async function convert1(text: string){
  if(customModeRadio.checked){
    return await convert(text, getOptions())
  } else if(handModeRadio.checked){
    return await convertHandWrite(text)
  } else {
    let options = {hasUpper: false, hasLower: false, hasNumber: true, len: 6}
    return await convert(text, options)
  }
}

async function enter(text: string){
  let password = await convert1(text)

  showPHidden(text, password)
  showCheckBox.onchange = (e) => { showPHidden(text, password) }

  if(autoCopyCheckBox.checked){
    await window.navigator.clipboard.writeText(password)
    tipsDiv.textContent = "write to clipboard success"
  }
}

enterButton.onclick = () => {
  enter(passwordInput.value)
}

passwordInput.onkeyup = (e) => {
  if(e.key === "Enter"){
    enter(passwordInput.value)
  } else {
    tipsDiv.textContent = ""
  }
}

function handleModeChange(value: string){
  if(value === 'custom_mode'){
    autoCopyCheckBox.checked = true
    showCheckBox.checked = false
  } else {
    autoCopyCheckBox.checked = false
    showCheckBox.checked = true
  }
}

modeContainer.onchange = (event: any) =>{
  if(!event.target) {
    return
  } else if (event.target.name === 'mode') {
    handleModeChange(event.target.value)
  }
}

passwordInput.focus()
