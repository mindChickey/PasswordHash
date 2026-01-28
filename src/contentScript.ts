
import { convert } from "./hash"

let defaultOptions = {hasUpper: true, hasLower: true, hasNumber: true, len: 15}

async function forInput(element: HTMLInputElement | HTMLTextAreaElement) {
  element.value = await convert(element.value, defaultOptions)
  element.dispatchEvent(new Event('input'))
  element.dispatchEvent(new Event('change'));
}

async function forEditable(element: HTMLElement) {
  element.textContent = await convert(element.textContent, defaultOptions)
  element.dispatchEvent(new Event('input'))
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
