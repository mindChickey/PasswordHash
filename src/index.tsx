
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

function LenSelect() {
  function makeItem(v: any, i: number) {
    let value = i + 4
    let title = value.toString()
    return { value, title }
  }
  let items = Array.from({ length: 17 }, makeItem)
  return <Select id="len" items={items} currentValue={16} />
}

function CheckBoxGroup() {
  return <div>
    <input type="checkbox" id="upper" name="upper" checked />
    <label for="upper">upper</label>

    <input type="checkbox" id="lower" name="lower" checked />
    <label for="lower">lower</label>

    <input type="checkbox" id="symbol" name="symbol" checked />
    <label for="symbol">symbol</label>

    <input type="checkbox" id="number" name="number" checked />
    <label for="number">number</label>

    <LenSelect />
  </div>
}

function ModeGroup() {
  return <div>
    <div>
      <input type="radio" name="mode" id="checkbox_mode" value="checkbox_mode" />
      <label for="checkbox_mode">checkbox</label>
      <CheckBoxGroup />
    </div>
    <div>
      <input type="radio" name="mode" id="hand_mode" value="hand_mode" />
      <label for="hand_mode">hand write</label>
    </div>
    <div>
      <input type="radio" name="mode" id="digit_mode" value="digit_mode" />
      <label for="digit_mode">6 digit</label>
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

function Body({ jscontent }: { jscontent: string }) {
  return <body>
    <InputGroup />
    <ModeGroup />
    <Show />
    <div id="tips"></div>
    <script defer>{jscontent}</script>
  </body>
}

export function IndexPage({ jscontent }: { jscontent: string }) {
  return <html>
    <Head />
    <Body jscontent={jscontent} />
  </html>
}