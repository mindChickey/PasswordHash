
import { initInteract, domainInput, passwordInput } from "./interact"

async function getActiveTabSLD() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (tab && tab.url) {
    try {
      let url = new URL(tab.url)
      let hostname = url.hostname 
      let parts = hostname.split('.')
      
      if (parts.length >= 2) {
        return parts[parts.length - 2]
      } else {
        return ""
      }
    } catch (e) {
      return ""
    }
  }
}

async function initPopup(){
  initInteract()
  let domain = await getActiveTabSLD()
  if(domain){
    domainInput.value = domain
    passwordInput.focus()
  } else {
    domainInput.focus()
  }
}

initPopup()