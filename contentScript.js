
let {convert} = require('./hash')

let defaultOptions = {hasUpper: true, hasLower: true, hasSymbol: true, hasNumber: true, len: 16}

async function forInput(element) {
  element.value = await convert(element.value, defaultOptions)
  element.dispatchEvent(new Event('input'))
  element.dispatchEvent(new Event('change'));
}

async function forEditable(element) {
  element.textContent = await convert(element.textContent, defaultOptions)
  element.dispatchEvent(new Event('input'))
}

function forTextBox(element) {
  if (element) {
    if (element.tagName === 'INPUT') {
      let type = ["text", "search", "password"]
      if(type.indexOf(element.type) != -1) forInput(element)
    } else if (element.tagName === 'TEXTAREA') {
      forInput(element)
    } else if (element.contentEditable === "true") {
      forEditable(element)
    }
  }
}

function clear(){
  var textArea = document.createElement("textarea")
  textArea.value = " "
  textArea.style.position = "fixed"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  var successful = document.execCommand('copy')
  var msg = successful ? 'success' : 'fail';
  console.log('clear ' + msg);
  textArea.remove()
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.kind === "convert"){
    forTextBox(document.activeElement)
  } else if(message.kind === "clear") {
    clear()
  }
})
