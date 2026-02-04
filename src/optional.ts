
let stableModeRadio = document.getElementById("stableModeRadio") as HTMLInputElement
let handModeRadio = document.getElementById("handModeRadio") as HTMLInputElement
let digitModeRadio = document.getElementById("digitModeRadio") as HTMLInputElement
let hexModeRadio = document.getElementById("hexModeRadio") as HTMLInputElement

let lenInput = document.getElementById("lenInput") as HTMLInputElement

let showCheckBox = document.getElementById("showCheckBox") as HTMLInputElement
let autoCopyCheckBox = document.getElementById("autoCopyCheckBox") as HTMLInputElement

export enum Mode { Stable, Hand, Digit, Hex }

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
    return { hasUpper: true, hasLower: true, hasNumber: true }
  }
}

function getMode(){
  if(stableModeRadio.checked){
    return Mode.Stable
  } else if(handModeRadio.checked){
    return Mode.Hand
  } else if(digitModeRadio.checked){
    return Mode.Digit
  } else {
    return Mode.Hex
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
  setRadioChange(stableModeRadio, true, false, 15)
  setRadioChange(hexModeRadio, true, false, 16)
  stableModeRadio.checked = true
}