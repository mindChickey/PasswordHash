
import { convert, convertHandWrite } from "./hash"
import { getCustomOptions, getOptional, initOptional, Mode, OptionalT, setShowCheckBoxChange } from "./optional"

let passwordInput = document.getElementById("passwordInput") as HTMLInputElement
let enterButton = document.getElementById("enterButton") as HTMLButtonElement
let phiddenDiv = document.getElementById("phiddenDiv") as HTMLDivElement
let tipsDiv = document.getElementById("tipsDiv") as HTMLDivElement

function hiddenChar(str: string){
  return Array.from(str).map((c) => '*').join('')
}

function showPHidden(show: boolean, text: string, password: string) {
  if(show){
    phiddenDiv.textContent = text + '\n' + password
  } else {
    let last = password[0] + hiddenChar(password.slice(1))
    phiddenDiv.textContent = hiddenChar(text) + '\n' + last
  }
}

async function convert1(optional: OptionalT, text: string){
  let len = optional.len
  if(optional.mode === Mode.Hand){
    return await convertHandWrite(text, len)
  } else {
    let customOptions = getCustomOptions()
    return await convert(text, customOptions, len)
  }
}

async function enter(text: string){
  let optional = getOptional()
  let password = await convert1(optional, text)

  let show = optional.show
  showPHidden(show, text, password)
  setShowCheckBoxChange(() => { showPHidden(show, text, password) })

  if(optional.autoCopy){
    await window.navigator.clipboard.writeText(password)
    tipsDiv.textContent = "write to clipboard success"
  }
}

function passwordKeyup(e: KeyboardEvent){
  if(e.key === "Enter"){
    enter(passwordInput.value)
  } else {
    tipsDiv.textContent = ""
  }
}

function main(){
  initOptional()
  enterButton.onclick = () => enter(passwordInput.value)
  passwordInput.onkeyup = passwordKeyup
  passwordInput.focus()
}

main()