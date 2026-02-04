
import { createElement, readContent, Select } from "jasser"

function Head() {
  return <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Light Pass</title>
    <meta name="keywords" content="password" />
    <meta name="description" content="password" />
    <link rel="icon" href="./icon.svg" type="image/svg" />
    <style>{readContent(__dirname, "./index.css")}</style>
  </head>
}

function Mode({id, title}:{id: string, title: string}){
  return <div>
    <input type="radio" name="mode" id={id} />
    <label for={id}>{title}</label>
  </div>
}

function ModeGroup() {
  return <div id="modeContainer">
    <Mode id="handModeRadio" title="Handwritten" />
    <Mode id="digitModeRadio" title="Digit" />
    <Mode id="stableModeRadio" title="Stable" />
  </div>
}

function LengthGroup(){
  return <div class="flex-row">
    <div>Length:</div>
    <input type="number" id="lenInput" min={3} max={30} value={15} />
  </div>
}

function PasswordGroup() {
  return <div>
    <div class="flex-row">
      <div>Domain:</div>
      <input type="input" id="domainInput" />
    </div>
    <div class="flex-row">
      <div>Password:</div>
      <input type="password" id="passwordInput" />
      <button id="enterButton">Enter</button>
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

function ResultCheckBox(){
  return <div>
    <Show />
    <AutoCopy />
  </div>
}

function Body({ jspath }: { jspath: string }) {
  return <body>
    <div class="container">
      <ModeGroup />
      <LengthGroup />
      <PasswordGroup />
      <ResultCheckBox />
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