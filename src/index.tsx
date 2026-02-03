
import { createElement, readContent, Select } from "jasser"

function Head() {
  return <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>{readContent(__dirname, "./index.css")}</style>
  </head>
}

function InputGroup() {
  return <div>
    <input type="password" id="passwordInput" />
    <button id="enter">Enter</button>
  </div>
}

function CheckBoxGroup() {
  return <div id="checkboxs">
    <input type="checkbox" id="upper" name="upper" checked />
    <label for="upper">upper</label>

    <input type="checkbox" id="lower" name="lower" checked />
    <label for="lower">lower</label>

    <input type="checkbox" id="number" name="number" checked />
    <label for="number">number</label>

    <input type="number" id="len" min={1} max={30} value={15} />
  </div>
}

function ModeGroup() {
  return <div>
    <div>
      <input type="radio" name="mode" id="hand_mode" value="hand_mode" />
      <label for="hand_mode">Hand write</label>
    </div>
    <div>
      <input type="radio" name="mode" id="digit_mode" value="digit_mode" />
      <label for="digit_mode">6 digit</label>
    </div>
    <div>
      <input type="radio" name="mode" id="custom_mode" value="custom_mode" checked/>
      <label for="custom_mode">Custom</label>
      <CheckBoxGroup />
    </div>
  </div>
}

function Show() {
  return <div>
    <div id="phidden"></div>
    <input type="checkbox" id="show" name="show" />
    <label for="show">show</label>
  </div>
}

function AutoCopy(){
  return <div>
    <input type="checkbox" id="auto_copy" name="auto_copy" checked />
    <label for="auto_copy">auto copy</label>
  </div>
}

function Body({ jspath }: { jspath: string }) {
  return <body>
    <ModeGroup />
    <InputGroup />
    <Show />
    <AutoCopy />
    <div id="tips"></div>
    <script defer src={jspath}></script>
  </body>
}

export function IndexPage({ jspath }: { jspath: string }) {
  return <html>
    <Head />
    <Body jspath={jspath} />
  </html>
}