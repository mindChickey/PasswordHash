
import { createElement, readContent, Select } from "jasser"

function Head() {
  return <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>{readContent(__dirname, "./index.css")}</style>
  </head>
}

function InputGroup(){
  return <div>
    <input type="password" id="passwordInput" />
    <button id="enter">Enter</button>
  </div>
}

function OptionsGroup(){
  return <div>
    <input type="checkbox" id="upper" name="upper" checked />
    <label for="upper">upper</label>

    <input type="checkbox" id="lower" name="lower" checked />
    <label for="lower">lower</label>

    <input type="checkbox" id="symbol" name="symbol" checked />
    <label for="symbol">symbol</label>

    <input type="checkbox" id="number" name="number" checked />
    <label for="number">number</label>
  </div>
}

function Show(){
  return <div>
    <div id="phidden"></div>
    <input type="checkbox" id="show" name="show" />
    <label for="show">show</label>
  </div>
}

function LenSelect(){
  let items = []
  for (let i = 4; i <= 20; i++) {
    let value = i.toString()
    let title = i.toString()
    items.push({value, title})
  }
  return <Select id="len" items={items} currentValue="16" />
}

function Body({jscontent}:{jscontent: string}) {
  return <body>
    <InputGroup />
    <OptionsGroup />
    <LenSelect />
    <Show />
    <div id="tips"></div>
    <script defer>{jscontent}</script>
  </body>
}

export function IndexPage({jscontent}:{jscontent: string}) {
  return <html>
    <Head />
    <Body jscontent={jscontent}/>
  </html>
}