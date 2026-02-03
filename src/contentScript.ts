
import { convert } from "./hash"

let defaultOptions = { hasUpper: true, hasLower: true, hasNumber: true }

function getSecondLevelDomain() {
  const hostname = window.location.hostname
  const parts = hostname.split('.')
  if (parts.length >= 2) {
    return parts[parts.length - 2] 
  } else {
    return ""
  }
}

async function forInput(element: HTMLInputElement | HTMLTextAreaElement) {
  let domain = getSecondLevelDomain()
  if(domain){
    let text0 = domain + element.value
    element.value = await convert(text0, defaultOptions, 15)
    element.dispatchEvent(new Event('input'))
    element.dispatchEvent(new Event('change'))
  }
}

async function forEditable(element: HTMLElement) {
  let domain = getSecondLevelDomain()
  if(domain){
    let text0 = domain + element.textContent
    element.textContent = await convert(text0, defaultOptions, 15)
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
