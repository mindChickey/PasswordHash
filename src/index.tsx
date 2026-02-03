
import { createElement, readContent, Select } from "jasser"

function Head() {
  return <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>{readContent(__dirname, "./index.css")}</style>
  </head>
}

function PasswordGroup() {
  return <div>
    <input type="password" id="passwordInput" />
    <button id="enterButton">Enter</button>
  </div>
}

function CheckBoxGroup() {
  return <div id="checkboxs">
    <input type="checkbox" id="upperCheckBox" name="upper" checked />
    <label for="upperCheckBox">upper</label>

    <input type="checkbox" id="lowerCheckBox" name="lower" checked />
    <label for="lowerCheckBox">lower</label>

    <input type="checkbox" id="numberCheckBox" name="number" checked />
    <label for="numberCheckBox">number</label>
  </div>
}

function ModeGroup() {
  return <div id="modeContainer">
    <div>
      <input type="radio" name="mode" id="handModeRadio" value="hand_mode" />
      <label for="handModeRadio">Hand write</label>
    </div>
    <div>
      <input type="radio" name="mode" id="digitModeRadio" value="digit_mode" />
      <label for="digitModeRadio">Digit</label>
    </div>
    <div>
      <input type="radio" name="mode" id="customModeRadio" value="custom_mode" checked/>
      <label for="customModeRadio">Custom</label>
      <CheckBoxGroup />
    </div>
  </div>
}

function Show() {
  return <div>
    <div id="phiddenDiv"></div>
    <input type="checkbox" id="showCheckBox" name="show" />
    <label for="showCheckBox">show</label>
  </div>
}

function AutoCopy(){
  return <div>
    <input type="checkbox" id="autoCopyCheckBox" name="auto_copy" checked />
    <label for="autoCopyCheckBox">auto copy</label>
  </div>
}

function Body({ jspath }: { jspath: string }) {
  return <body>
    <ModeGroup />
    <input type="number" id="lenInput" min={1} max={30} value={15} />
    <PasswordGroup />
    <Show />
    <AutoCopy />
    <div id="tipsDiv"></div>
    <script defer src={jspath}></script>
  </body>
}

export function IndexPage({ jspath }: { jspath: string }) {
  return <html>
    <Head />
    <Body jspath={jspath} />
  </html>
}