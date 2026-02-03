
let upperCheckBox = document.getElementById("upperCheckBox") as HTMLInputElement
let lowerCheckBox = document.getElementById("lowerCheckBox") as HTMLInputElement
let numberCheckBox = document.getElementById("numberCheckBox") as HTMLInputElement

let customModeRadio = document.getElementById("customModeRadio") as HTMLInputElement
let handModeRadio = document.getElementById("handModeRadio") as HTMLInputElement
let digitModeRadio = document.getElementById("digitModeRadio") as HTMLInputElement

let lenInput = document.getElementById("lenInput") as HTMLInputElement

let showCheckBox = document.getElementById("showCheckBox") as HTMLInputElement
let autoCopyCheckBox = document.getElementById("autoCopyCheckBox") as HTMLInputElement

export enum Mode { Custom, Hand, Digit }

export type OptionalT = {
  mode: Mode
  show: boolean
  autoCopy: boolean
  len: number
}

export function getCustomOptions(){
  if(digitModeRadio.checked){
    return { hasUpper: false, hasLower: false, hasNumber: true }
  } else {
    let hasUpper = upperCheckBox.checked
    let hasLower = lowerCheckBox.checked
    let hasNumber = numberCheckBox.checked
    return { hasUpper, hasLower, hasNumber }
  }
}

function getMode(){
  if(customModeRadio.checked){
    return Mode.Custom
  } else if(handModeRadio.checked){
    return Mode.Hand
  } else {
    return Mode.Digit
  }
}

export function getOptional(): OptionalT{
  return {
    mode: getMode(),
    show: showCheckBox.checked,
    autoCopy:  autoCopyCheckBox.checked,
    len: parseInt(lenInput.value, 10)
  }
}

export function setShowCheckBoxChange(change: () => void){
  showCheckBox.onchange = change
}

function setRadioChange(radio: HTMLInputElement, autoCopy: boolean, show: boolean, len: number){
  radio.onchange = () => {
    if(radio.checked){
      autoCopyCheckBox.checked = autoCopy
      showCheckBox.checked = show
      lenInput.value = len.toString()
    }
  }
}

export function initOptional(){
  setRadioChange(handModeRadio, false, true, 10)
  setRadioChange(digitModeRadio, false, true, 6)
  setRadioChange(customModeRadio, true, false, 15)
}