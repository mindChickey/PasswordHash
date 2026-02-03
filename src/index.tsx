
import { createElement, readContent, Select } from "jasser"

function Head() {
  return <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>{readContent(__dirname, "./index.css")}</style>
  </head>
}

function PasswordGroup() {
  return <div class="flex-row">
    <input type="password" id="passwordInput" />
    <button id="enterButton">Enter</button>
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
      <input type="radio" name="mode" id="stableModeRadio" value="stable_mode" checked/>
      <label for="stableModeRadio">Stable</label>
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
    <div class="container">
      <ModeGroup />
      <input type="number" id="lenInput" min={3} max={30} value={15} />
      <PasswordGroup />
      <Show />
      <AutoCopy />
      <div id="tipsDiv"></div>
    </div>
    <script defer src={jspath}></script>
  </body>
}

export function IndexPage({ jspath }: { jspath: string }) {
  return <html>
    <Head />
    <Body jspath={jspath} />
  </html>
}