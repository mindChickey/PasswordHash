import { encode } from "./encode"
import { deriveKey } from "./deriveKey"

function getSecondLevelDomain() {
  const hostname = window.location.hostname
  const parts = hostname.split('.')
  if (parts.length >= 2) {
    return parts[parts.length - 2] 
  } else {
    return ""
  }
}

async function defaultConvert(domain: string, text: string) {
  let defaultOptions = { hasUpper: true, hasLower: true, hasNumber: true }
  let len = 15
  let key = await deriveKey(domain, text, len)
  return encode(key, len, defaultOptions)
}

async function forInput(element: HTMLInputElement | HTMLTextAreaElement) {
  let domain = getSecondLevelDomain()
  if(domain){
    element.value = await defaultConvert(domain, element.value)
    element.dispatchEvent(new Event('input'))
    element.dispatchEvent(new Event('change'))
  }
}

async function forEditable(element: HTMLElement) {
  let domain = getSecondLevelDomain()
  if(domain){
    element.textContent = await defaultConvert(domain, element.textContent)
    element.dispatchEvent(new Event('input'))
  }
}

function forTextBox(element: Element | null) {
  if (element instanceof HTMLInputElement){
    let type = ["text", "search", "password"]
    if(type.indexOf(element.type) != -1) forInput(element)
  } else if (element instanceof HTMLTextAreaElement) {
    forInput(element)
  } else if (element instanceof HTMLDivElement) {
    if (element.contentEditable === "true") {
      forEditable(element)
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.kind === "convert"){
    forTextBox(document.activeElement)
  }
})
