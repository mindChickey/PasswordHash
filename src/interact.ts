
import { convert, convertHandWrite } from "./hash"
import { getCustomOptions, getOptional, initOptional, Mode, OptionalT, setShowCheckBoxChange } from "./optional"

export let domainInput = document.getElementById("domainInput") as HTMLInputElement
export let passwordInput = document.getElementById("passwordInput") as HTMLInputElement
let enterButton = document.getElementById("enterButton") as HTMLButtonElement
let phiddenDiv = document.getElementById("phiddenDiv") as HTMLDivElement
let tipsDiv = document.getElementById("tipsDiv") as HTMLDivElement

function hiddenChar(str: string){
  return Array.from(str).map((c) => '*').join('')
}

function showPHidden(text: string, password: string) {
  let optional = getOptional()
  if(optional.show){
    phiddenDiv.textContent = text + '\n' + password
  } else {
    let last = password[0] + hiddenChar(password.slice(1))
    phiddenDiv.textContent = hiddenChar(text) + '\n' + last
  }
}

async function convert1(optional: OptionalT, domain: string, text: string){
  let len = optional.len
  if(optional.mode === Mode.Hand){
    return await convertHandWrite(domain, text, len)
  } else {
    let customOptions = getCustomOptions()
    return await convert(domain, text, len, customOptions)
  }
}

async function enter(){
  let domain = domainInput.value
  let text = passwordInput.value
  let optional = getOptional()
  let password = await convert1(optional, domain, text)

  let set_show = () => showPHidden(text, password)
  set_show()
  setShowCheckBoxChange(set_show)

  if(optional.autoCopy){
    await window.navigator.clipboard.writeText(password)
    tipsDiv.textContent = "write to clipboard success"
  }
}

function passwordKeyup(e: KeyboardEvent){
  if(e.key === "Enter"){
    enter()
  } else {
    tipsDiv.textContent = ""
  }
}

export function initInteract(){
  initOptional()
  enterButton.onclick = enter
  passwordInput.onkeyup = passwordKeyup
}